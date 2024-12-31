Clear-Host
Write-Host "========================================"
Write-Host "       选择要执行的脚本"
Write-Host "========================================"
Write-Host "1. 运行 前端React Npm run dev"
Write-Host "2. 运行 后端Koa Npm run dev"
Write-Host "3. 执行 暂无,请勿执行"
Write-Host "4. 退出"
Write-Host "========================================"
$choice = Read-Host "请输入选项 (1-4)"

switch ($choice) {
    "1" { Start-Process -FilePath "./Powershell/runFrontEndProject.bat" }
    "2" { Start-Process -FilePath "script2.bat" }
    "3" { Start-Process -FilePath "script3.bat" }
    "4" { Write-Host "退出程序..."; exit }
    default { Write-Host "无效选项，请重试..." }
}
