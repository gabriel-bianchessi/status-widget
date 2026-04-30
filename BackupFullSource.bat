set mydate=%date:~6,4%%date:~3,2%%date:~0,2%

"C:\Program Files\7-Zip\7z.exe" a -t7z %mydate%_Full.7z .\ -mx0 -xr!bin -xr!obj -xr!node_modules -xr!.history -xr!.git -xr!.angular -xr!packages -xr!dist -xr!dist-release