@echo off
chcp 65001 >nul
:menu
cls
cls
echo ========================================
echo         选择要执行的脚本
echo ========================================
echo.
echo 1. 运行 前端React Npm run dev
echo 2. 运行 后端Koa Npm run dev
echo 3. 执行 暂无,请勿执行
echo 4. 退出
echo ========================================
echo.

set /p choice=请输入选项 (1-4): 

if "%choice%"=="1" goto script1
if "%choice%"=="2" goto script2
if "%choice%"=="3" goto script3
if "%choice%"=="4" goto exit
echo 无效选项，请重试...
pause
goto menu

:script1
start cmd /k "cd ./Powershell && runFrontEndProject.bat"
goto menu
goto menu

:script2
call script2.bat
pause
goto menu

:script3
call script3.bat
pause
goto menu

:exit
echo 退出程序...
exit
