# zen-unity

This is a Unity URP 3D - WebGL project.

## Cloning the repo to pull updates

```bash
git clone https://github.com/ZenSoftware/zen.git
cd zen

# Rename the remote named origin to zen
git remote remove origin
git remote add zen https://github.com/ZenSoftware/zen.git

# Fetch add checkout the unity branch
git fetch zen unity
git checkout unity

# Create a new branch from the unity branch named main
git checkout -b main

# Create a new GitHub repo and link your remote to it named origin
git remote add origin https://github.com/<YOUR_REPO>

# Push the newly created main branch to your GitHub repo and set its upstream to origin
git push -u origin main
```

---

```bash
# Now you can pull updates via
git pull zen unity
```
## Setting up your system to compile

Within Unity Hub, add the directory `apps/zen-unity` to open the project within the Unity Editor. All of the dependencies described by `apps/zen-unity/Packages/manifest.json` will be downloaded and installed.

[UniVRM](https://github.com/vrm-c/UniVRM) and its dependencies are being utilized for the VRM loader, which is just an extension of the [glTF standard](https://www.youtube.com/watch?v=tonSNnEj-ow). There are some issues with the initial setup of projects with UniVRM installed. I have [filed an issue](https://github.com/vrm-c/UniVRM/issues/2185) in their project's GitHub repo about it.

Please find the file `apps/zen-unity/Assets/Art/VRM/Mico.vrm` within the Unity Editor's project explorer. It is the only `.vrm` file currently in the project. Select the `Materials` tab after selecting the `.vrm` file. Ensure that the `Render Pipeline` setting is set to `Universal Render Pipeline`. For further details, refer to the UniVRM issue: [Render pipeline setting incorrectly detects if URP is installed](https://github.com/vrm-c/UniVRM/issues/2185).

The Unity project must be open within Unity's Editor at least once for the command `pnpm dev:unity` to be able to compile the Unity app successfully and copy the Unity WebGL assets to `apps/portal/src/assets/unity`.

The NodeJS script running the compilation is expecting the `Unity.exe` to exist within the system environment paths. Please ensure that you have added it to the list of your environment paths. For my system running Windows 11, I am required to add `C:\Program Files\Unity\Hub\Editor\2023.2.18f1\Editor` to my environment paths. Notice that the editor installed on your system should match this Unity project's version. The current version of the Unity project being utilized can be found at `apps/zen-unity/ProjectSettings/ProjectVersion.txt`.

Once the project has been open within Unity's Editor at least once, and the VRM issues with respect to URP projects has been addressed, close the Unity Editor and run the command `pnpm dev:unity`. This will compile the project and copy the compiled assets to the necessary directories to run the game as a WebGL app. Note that the Unity project cannot be open within the Unity Editor when compiling the project. Please ensure that the Unity Editor is closed before running the NodeJS script that compiles the project.

Otherwise, that should be all you should need to get the project up and running as a web app on your system. Run `pnpm start` after the Unity app has finished compiling. You will find the Unity web player as an Angular standalone component under the `Unity` page.
