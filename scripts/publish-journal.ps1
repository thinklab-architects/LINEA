
# Script to publish Journal articles
# It commits changes in content/journal and pushes to GitHub

Write-Host "Starting Journal Publication..." -ForegroundColor Cyan

# 1. Sync with remote
Write-Host "Syncing with GitHub..."
git pull origin main

# 2. Add Journal Changes
Write-Host "Staging files..."
git add content/journal/*
git add public/images/journal/*
git add src/data/journal-data.json 

# Note: We also add the generated data/images if they were built locally, 
# but the GitHub Action will rebuild them anyway. 
# It's safer to just commit the source content.
git reset src/data/journal-data.json
git reset public/images/journal/*

# Re-add only source content
git add content/journal

# 3. Commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$message = "Journal Update: $timestamp"
Write-Host "Committing: $message"
git commit -m "$message"

# 4. Push
Write-Host "Pushing to GitHub..."
git push origin main

if ($?) {
    Write-Host "Successfully published! The website will update in a few minutes." -ForegroundColor Green
} else {
    Write-Host "Error publishing. Please check git status." -ForegroundColor Red
    Pause
}

Write-Host "Press any key to close..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
