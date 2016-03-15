@echo off
cls

SET TASKSLIST=taskslist.txt
SET TASKNAME=Grab_Packt_Books

schtasks.exe /query > %TASKSLIST%
findstr /B /I %TASKNAME% %TASKSLIST% >nul

IF %errorlevel%==0  GOTO :delete
GOTO :create
 
:delete
	echo Removing scheduled task %TASKNAME%
	schtasks.exe /DELETE /TN "%TASKNAME%" /F >nul
 
:create
	echo Creating scheduled task %TASKNAME%
	schtasks.exe /Create /SC DAILY /TN "%TASKNAME%" /TR "C:\Users\%UserName%\Documents\GitHub\grab_packt\run.bat"
	del "%TASKSLIST%" >nul
