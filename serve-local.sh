#!/bin/sh
IP=$(hostname -I 2>/dev/null | awk '{print $1}')
PORT=3000

echo ""
echo "  WeldRef is running"
echo "  Local:   http://localhost:$PORT"
echo "  Network: http://$IP:$PORT"
echo ""

if command -v qrencode >/dev/null 2>&1; then
  qrencode -t UTF8 "http://$IP:$PORT"
fi

npx serve . --listen "$PORT" --no-clipboard
