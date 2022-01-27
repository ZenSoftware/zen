function Invoke-Call {
  param (
    [scriptblock]$ScriptBlock,
    [string]$ErrorAction = $ErrorActionPreference
  )
  & @ScriptBlock
  if (($lastexitcode -ne 0) -and $ErrorAction -eq "Stop") {
    [system.media.systemsounds]::Hand.play()
    exit $lastexitcode
  }
}

Invoke-Call -ScriptBlock { npx gulp clean } -ErrorAction Stop
Invoke-Call -ScriptBlock { npm run prod:apps } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx nx build api --prod } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp handlebars:copy } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp create-deploy-package } -ErrorAction Stop
Invoke-Call -ScriptBlock { docker build -f deploy/api/Dockerfile -t zen-api . } -ErrorAction Stop
Invoke-Call -ScriptBlock { azcopy cp 'dist/apps/portal/*' 'https://hot.blob.core.windows.net/$web' --recursive } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp increment-version } -ErrorAction Stop
Invoke-Call -ScriptBlock { az cdn endpoint purge -g zen --profile-name 'portal' -n 'portal' --content-paths '/' } -ErrorAction Stop
Invoke-Call -ScriptBlock { az acr login --name zenacr } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp deploy:api } -ErrorAction Stop

Invoke-Call -ScriptBlock { kubectl get pods } -ErrorAction Stop

[system.media.systemsounds]::Beep.play()