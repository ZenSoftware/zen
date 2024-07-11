using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

public class Builder
{
    static void BuildWebGL(BuildPlayerOptions buildPlayerOptions)
    {
        var outputPath = GetOutputPath();
        FileUtil.DeleteFileOrDirectory(outputPath);
        FileUtil.DeleteFileOrDirectory("ServerData/WebGL");

        // Build web player
        buildPlayerOptions.locationPathName = outputPath;
        buildPlayerOptions.scenes = (from scene in EditorBuildSettings.scenes where scene.enabled select scene.path).ToArray();
        buildPlayerOptions.target = BuildTarget.WebGL;
        BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);

        if (report.summary.result == BuildResult.Succeeded)
            Debug.Log("Build succeeded: " + report.summary.totalSize + " bytes");
        else if (report.summary.result == BuildResult.Failed)
            Debug.Log("Build player failed");
    }

    /// <summary>
    /// Constructs the output path presuming the Unity project resides within an Nx `apps` folder.
    /// Nx monorepos usually place built items within the `dist` folder at the root.
    /// </summary>
    /// <returns>The string that is the output path for build artifacts</returns>
    private static string GetOutputPath()
    {
        var unityProjectPath = Directory.GetCurrentDirectory();
        var appsDir = Path.DirectorySeparatorChar + "apps" + Path.DirectorySeparatorChar;
        var pathIndex = unityProjectPath.LastIndexOf(appsDir);
        var rootPath = unityProjectPath.Substring(0, pathIndex);
        var projectName = unityProjectPath.Substring(pathIndex + 6);
        var endIndex = projectName.IndexOf(Path.DirectorySeparatorChar);
        if (endIndex > 0)
            projectName = projectName.Substring(0, projectName.IndexOf(Path.DirectorySeparatorChar));
        var outputPath = Path.Combine(rootPath, "dist", "apps", projectName);
        return outputPath;
    }

    [MenuItem("Build/Build WebGL Development")]
    public static void BuildWebGLDevelopment()
    {
        var playerSettings = new BuildPlayerOptions();
        playerSettings.options = BuildOptions.Development;
        BuildWebGL(playerSettings);
    }

    [MenuItem("Build/Build WebGL Production")]
    public static void BuildWebGLProduction()
    {
        var playerSettings = new BuildPlayerOptions();
        playerSettings.options = BuildOptions.None;
        BuildWebGL(playerSettings);
    }
}
