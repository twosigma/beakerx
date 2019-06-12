@echo off
(
  REM Uninstall BeakerX notebook extension
  "%PREFIX%\Scripts\beakerx_tabledisplay.exe" "install"
) >>"%PREFIX%\.messages.txt" 2>&1