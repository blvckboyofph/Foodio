@echo off 
cd "C:\mongodb\bin"
start mongod.exe
timeout 4
start mongosh.exe
exit

