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

Invoke-Call -ScriptBlock { npm run prod:apps } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx ng build api --prod } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp handlebars:copy } -ErrorAction Stop
Invoke-Call -ScriptBlock { docker build -f deploy/api/Dockerfile -t zen-api . } -ErrorAction Stop
Invoke-Call -ScriptBlock { azcopy cp 'dist/apps/portal/*' 'https://zenhot.blob.core.windows.net/$web' --recursive } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp increment-version } -ErrorAction Stop
Invoke-Call -ScriptBlock { az cdn endpoint purge -g zen --profile-name 'portal' -n 'ossportal' --content-paths '/' } -ErrorAction Stop
Invoke-Call -ScriptBlock { az acr login --name zenacr } -ErrorAction Stop
Invoke-Call -ScriptBlock { npx gulp deploy:api } -ErrorAction Stop

Invoke-Call -ScriptBlock { kubectl get pods } -ErrorAction Stop

[system.media.systemsounds]::Beep.play()