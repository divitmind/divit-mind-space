param (
    [Parameter(Mandatory=$true)]
    [string]$BranchName
)

# 1. Clean state
Write-Host "--- Switching to main and pulling latest changes ---" -ForegroundColor Cyan
git checkout main
git pull

# 2. Create branch (replacing spaces with hyphens)
$CleanBranchName = $BranchName -replace ' ', '-'
Write-Host "--- Creating branch: $CleanBranchName ---" -ForegroundColor Cyan
git checkout -b $CleanBranchName

# 3. Install dependencies
Write-Host "--- Installing dependencies ---" -ForegroundColor Cyan
pnpm install

# 4. Start development environment
Write-Host "--- Starting development environment (Next.js + Sanity) ---" -ForegroundColor Cyan
Write-Host "Website: http://localhost:3000" -ForegroundColor Green
Write-Host "Studio:  http://localhost:3000/studio" -ForegroundColor Green
pnpm dev
