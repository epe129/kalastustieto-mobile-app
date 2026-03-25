# script that turns on XAMPP server
# pip install pywin32
# need to check the two box in the XAMPP control panel when running as administration to run Apache and MySQL as services for this to work
import sys
import ctypes
import win32serviceutil
import subprocess

# opens XAMPP control panel 
subprocess.Popen(['C:/xampp/xampp-control.exe'])

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if not is_admin():
    print("Not admin — relaunching with elevation...")
    ctypes.windll.shell32.ShellExecuteW(
        None, "runas", sys.executable, __file__, None, 1
    )
    sys.exit()
win32serviceutil.StartService('Apache2.4')
win32serviceutil.StartService('mysql')
