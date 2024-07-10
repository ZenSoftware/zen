/// https://forum.unity.com/threads/webgl-mouse-input-is-just-completely-broken.1498880/#post-9657140

using System.Diagnostics;
using System.IO;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;

public class FixMouseBugOnWebPostProcessScript : IPostprocessBuildWithReport
{
    public int callbackOrder => 0;

    public void OnPostprocessBuild(BuildReport report)
    {
        if (report.summary.platform == BuildTarget.WebGL)
        {
            string outputPath = report.summary.outputPath;
            ModifyFilesInDirectory(outputPath);
        }
    }

    void ModifyFilesInDirectory(string directoryPath)
    {
        // Search for gzipped JavaScript files first
        var gzippedFiles = Directory.GetFiles(directoryPath, "*.framework.js.gz", SearchOption.AllDirectories);
        if (gzippedFiles.Length > 0)
        {
            ModifyAndCompressFile(gzippedFiles[0], true);
        }
        else
        {
            // If no gzipped files, search for plain JavaScript files
            var jsFiles = Directory.GetFiles(directoryPath, "*.framework.js", SearchOption.AllDirectories);
            ModifyAndCompressFile(jsFiles[0], false);
        }
    }

    void ModifyAndCompressFile(string filePath, bool isGzipped)
    {
        string tempFilePath = filePath;
        if (isGzipped)
        {
            tempFilePath = Path.ChangeExtension(filePath, ".tmp.js");
            // Decompress the file
            ProcessStartInfo decompress = new ProcessStartInfo("gzip", $"-d -k -c \"{filePath}\" > \"{tempFilePath}\"");
            decompress.UseShellExecute = false;
            Process.Start(decompress).WaitForExit();
        }

        // Modify the content
        string content = File.ReadAllText(tempFilePath);
        content = content.Replace("requestPointerLock()", "requestPointerLock({unadjustedMovement: true}).catch(function(error) {console.log(error);})");
        File.WriteAllText(tempFilePath, content);

        if (isGzipped)
        {
            // Compress the file again and cleanup
            File.Delete(filePath); // Delete the original gz file as gzip won't overwrite
            ProcessStartInfo compress = new ProcessStartInfo("gzip", $"-c \"{tempFilePath}\" > \"{filePath}\"");
            compress.UseShellExecute = false;
            Process.Start(compress).WaitForExit();

            File.Delete(tempFilePath); // Delete the temporary decompressed file
        }
    }
}
