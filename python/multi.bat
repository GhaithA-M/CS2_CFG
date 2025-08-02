@echo off
setlocal enabledelayedexpansion

echo ========================================
echo CS2 CFG Multi-Processor
echo ========================================
echo.

:: Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python and try again.
    pause
    exit /b 1
)

:: Check if commands.py exists
if not exist "commands.py" (
    echo ERROR: commands.py not found in current directory
    echo Please run this batch file from the python folder.
    pause
    exit /b 1
)

:: Check if cfg folder exists
if not exist "cfg" (
    echo ERROR: cfg folder not found
    echo Please create a 'cfg' folder and place your .cfg files in it.
    pause
    exit /b 1
)

:: Create output folder if it doesn't exist
if not exist "output" mkdir output

echo Processing .cfg files...
echo.

:: Counter for processed files
set /a processed=0
set /a total=0

:: Count total .cfg files
for %%f in (cfg\*.cfg) do set /a total+=1

if %total%==0 (
    echo No .cfg files found in the cfg folder.
    echo Please place your .cfg files in the cfg folder and try again.
    pause
    exit /b 1
)

echo Found %total% .cfg file(s) to process:
echo.

:: Process each .cfg file
for %%f in (cfg\*.cfg) do (
    set /a processed+=1
    
    :: Get filename without extension
    for %%n in ("%%~nf") do set "filename=%%~nn"
    
    :: Create output filename
    set "output_file=output\!filename!.json"
    
    echo [!processed!/%total%] Processing: %%~nxf
    echo    Output: !output_file!
    
    :: Run the Python script
    python commands.py "%%f" "!output_file!"
    
    if errorlevel 1 (
        echo    ERROR: Failed to process %%~nxf
        echo.
    ) else (
        echo    SUCCESS: Generated !output_file!
        echo.
    )
)

echo ========================================
echo Processing Complete!
echo ========================================
echo.
echo Processed %processed% file(s) out of %total%
echo Output files are in the 'output' folder
echo.

:: Show summary of generated files
if exist "output\*.json" (
    echo Generated files:
    for %%f in (output\*.json) do (
        echo   - %%~nxf
    )
    echo.
)

echo Press any key to exit...
:: No pausing so cmd.exe closes itself when done
:: pause >nul


echo.
echo Done!
