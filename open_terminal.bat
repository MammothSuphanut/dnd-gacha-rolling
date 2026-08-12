@echo off
cd /d "D:\dnd-gacha-rolling"
cloudflared tunnel --url http://localhost:5173
pause