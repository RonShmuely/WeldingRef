@echo off

:: Pull latest changes from GitHub
git -C "C:\Users\ronsh\desktop\weldingref" pull

:: Start Apache (XAMPP)
start "" "C:\xampp\apache_start.bat"

:: Open GitHub repo in Chrome
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "https://github.com/RonShmuely/weldingref"

:: Open project folder in Explorer
start "" explorer "C:\Users\ronsh\desktop\weldingref"

:: Open PowerShell with Claude Code
start "" powershell -NoExit -Command "cd 'C:\Users\ronsh\desktop\weldingref'; claude --dangerously-skip-permissions"
