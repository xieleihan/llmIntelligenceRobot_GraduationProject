@echo off
chcp 65001 >nul
:menu
cls
echo ========================================
echo        选择要执行的脚本(V1.0.0)
echo ========================================
echo 当前时间: %date% %time%
echo 作者: 南秋SouthAki
echo Warning: 请勿修改脚本
echo.
echo ==============功能区======================
echo 1. 运行 前端React Npm run dev
echo 2. 运行 后端Koa Npm run dev
echo 3. 执行 前后端Node modules安装
echo 4. 运行 VSCode打开Front-End
echo 5. 退出
echo ========================================
echo.

set /p choice=请输入选项 (1-5): 

if "%choice%"=="1" goto script1
if "%choice%"=="2" goto script2
if "%choice%"=="3" goto script3
if "%choice%"=="4" goto script4
if "%choice%"=="5" goto exit
echo 无效选项，请重试...
pause
goto menu

:script1
start cmd /k "cd ./Powershell && runFrontEndProject.bat"
goto menu

:script2
start cmd /k "cd ./Powershell && runBackEndProject.bat"
goto menu

:script3
start cmd /k "cd ./Powershell && npmInstall.bat"
pause
goto menu

:script4
start cmd /k "cd ./Front-End && code ."
pause
goto menu

:exit
echo 退出程序...
exit
