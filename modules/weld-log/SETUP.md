# Weld Log — Setup Guide

## 1. Download PocketBase
https://pocketbase.io/docs/ → download binary for your OS
Extract to a folder, e.g. C:\weldlog\

## 2. Run PocketBase
  cd C:\weldlog
  ./pocketbase serve
Admin UI: http://127.0.0.1:8090/_/

## 3. Create the Collection
Admin UI → New Collection:

  Name: entries
  Fields:
    date         Plain text, required
    category     Plain text, required   (w200i | w50ri | bobcat)
    machine      Plain text
    part         Plain text
    description  Plain text, required
    electrode    Plain text
    amperage     Plain text
    welder       Plain text
    notes        Plain text
    images       File, multiple, max 10, accept: image/*

  API Rules: set list/view/create/update/delete all to "" (empty = public)

## 4. Build & Deploy Frontend
  cd modules/weld-log
  npm install
  npm run build
Copy contents of dist/ into PocketBase's pb_public/ folder.
Open http://127.0.0.1:8090 — the app loads.

## 5. Cloudflare Tunnel (access from anywhere)
Download cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

Quick start (generates a temporary public URL):
  cloudflared tunnel --url http://localhost:8090

For a permanent URL (same every time):
https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/

## 6. Auto-start on Windows
Use NSSM (https://nssm.cc/) to run PocketBase as a Windows service
that starts automatically with the PC.
