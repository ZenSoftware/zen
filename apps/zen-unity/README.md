# zen-unity

This is a Unity URP 3D - WebGL project.

### Setting up the repo to enable pulling updates

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
# You are now able to pull updates via
git pull zen unity
```

### Setup the API server

The following will get your system setup to be able to run the GraphQL API server.

```bash
# Make a copy of the .env file
cp .env.example .env

# Install the node_modules folder
pnpm i

# Start the PostgreSQL server
docker-compose up -d

# Run the initial Prisma migration
pnpm prisma:migrate
```

## Setting up your system to compile

Within Unity Hub, add the directory `apps/zen-unity` to open the project within the Unity Editor. All of the dependencies described by `apps/zen-unity/Packages/manifest.json` and `apps/zen-unity/Assets/packages.config` will be installed.

The Unity project must be open within the Unity Editor at least once for the command `pnpm dev:unity` to be able to compile the Unity app successfully.

The NodeJS script that performs the compilation is expecting the `Unity` executable to exist within your system environment paths. Please ensure that you have added the Unity Editor's path to your environment paths. For my system running Windows 11, I added `C:\Program Files\Unity\Hub\Editor\6000.0.8f1\Editor` to my environment paths. Notice that the editor installed on your system should match the Unity project's version. The current version of the Unity project can be found at `apps/zen-unity/ProjectSettings/ProjectVersion.txt`.

Once the project has been open within the Unity Editor at least once, close the Unity Editor and run the command `pnpm dev:unity`. This will compile the project and copy the compiled assets to `apps/portal/src/assets/unity`. Note that the Unity project cannot be open within the Unity Editor when compiling the project. Please ensure that it is closed before compiling.

Run the command `pnpm start` after the Unity app has finished compiling. You will find the Unity web player under the `Unity` page.
