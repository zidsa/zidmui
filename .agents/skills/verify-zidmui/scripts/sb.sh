#!/usr/bin/env bash
# Launch, check and tear down a verification Storybook for zidmui.
# Usage: sb.sh launch|doctor|cleanup   (port: ZIDMUI_SB_PORT, default 6116)
set -euo pipefail

REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
PORT="${ZIDMUI_SB_PORT:-6116}"
ROOT="$REPO/.verify-zidmui"
RUN="$ROOT/run/$PORT"
EVIDENCE="$ROOT/evidence"
URL="http://127.0.0.1:$PORT"
# Global pnpm 10.0.0 rejects this repo's settings-only pnpm-workspace.yaml; use the pinned one.
PNPM=(npx -y "pnpm@$(node -p "require('$REPO/package.json').packageManager.split('@')[1]")")
DRIVE="$(cd "$(dirname "$0")" && pwd)/drive.mjs"

pid_alive() { [ -f "$RUN/pid" ] && kill -0 "$(cat "$RUN/pid")" 2>/dev/null; }

# PID that listens on $PORT, or empty. lsof works on Linux and macOS (ss and setsid are Linux-only).
listener_pid() { lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -1; }
port_busy() { lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; }
# Start "$@" as its own process-group leader, so cleanup can find every child.
spawn() { if command -v setsid >/dev/null; then exec setsid "$@"; else exec perl -e 'setpgrp(0,0); exec @ARGV or die "exec: $!"' "$@"; fi; }

story_count() {
  curl -sf "$URL/index.json" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(Object.values(JSON.parse(s).entries).filter(e=>e.type==="story").length))'
}

launch() {
  if pid_alive; then echo "already running: pid $(cat "$RUN/pid") on $URL (run cleanup first)"; exit 1; fi
  if port_busy; then
    echo "port $PORT is taken by someone else; pick another with ZIDMUI_SB_PORT"; exit 1
  fi
  mkdir -p "$RUN" "$EVIDENCE"
  cd "$REPO"
  [ -d node_modules ] || "${PNPM[@]}" install --frozen-lockfile
  (spawn "${PNPM[@]}" exec storybook dev -p "$PORT" --ci --no-open --host 127.0.0.1 </dev/null >"$RUN/storybook.log" 2>&1) &
  echo $! >"$RUN/pid"
  echo "launched pid $(cat "$RUN/pid"), log $RUN/storybook.log"
  for _ in $(seq 1 120); do
    grep -q 'for preview' "$RUN/storybook.log" && [ "$(story_count 2>/dev/null || echo 0)" -gt 0 ] && break
    pid_alive || { echo "storybook exited:"; tail -20 "$RUN/storybook.log"; exit 1; }
    sleep 2
  done
  # Ready means a story actually renders (first load triggers Vite dep optimisation).
  node "$DRIVE" --port "$PORT" --story react-app-button--primary >/dev/null
  echo "ready: $URL ($(story_count) stories)"
}

doctor() {
  local ok=1
  if pid_alive; then echo "ok   pid $(cat "$RUN/pid") alive"; else echo "FAIL no live instance started by this skill on port $PORT"; ok=0; fi
  local lp; lp="$(listener_pid)"
  if [ -n "$lp" ] && pid_alive && [ "$(ps -o pgid= -p "$lp" | tr -d ' ')" = "$(cat "$RUN/pid")" ]; then
    echo "ok   port $PORT owned by our process group (listener pid $lp)"
  else echo "FAIL port $PORT listener pid '${lp:-none}' is not ours"; ok=0; fi
  local n; n="$(story_count 2>/dev/null || echo 0)"
  if [ "$n" -gt 0 ]; then echo "ok   $URL/index.json lists $n stories"; else echo "FAIL index.json unreachable or empty"; ok=0; fi
  if [ "$ok" = 1 ] && node "$DRIVE" --port "$PORT" --story react-app-button--primary >/dev/null; then
    echo "ok   react-app-button--primary renders"
  else echo "FAIL story render check"; ok=0; fi
  echo "info serving working tree at $(git -C "$REPO" rev-parse --short HEAD)$(git -C "$REPO" diff --quiet || echo ' (+uncommitted changes)')"
  [ "$ok" = 1 ]
}

cleanup() {
  if [ -f "$RUN/pid" ]; then
    local pgid; pgid="$(cat "$RUN/pid")"
    local pids; pids="$(ps -o pid= -g "$pgid" | tr '\n' ' ' || true)"
    [ -n "${pids// /}" ] && kill $pids 2>/dev/null || true
    for _ in $(seq 1 20); do ps -o pid= -g "$pgid" >/dev/null || break; sleep 0.5; done
    [ -f "$RUN/storybook.log" ] && mkdir -p "$EVIDENCE" && mv "$RUN/storybook.log" "$EVIDENCE/storybook-$PORT-$(date +%Y%m%dT%H%M%S).log"
    rm -f "$RUN/pid"
    rmdir "$RUN" 2>/dev/null || true
  fi
  if port_busy; then echo "WARN port $PORT still in use (not by a pid this skill recorded)"; exit 1; fi
  echo "cleaned port $PORT; evidence kept in $EVIDENCE"
}

case "${1:-}" in
  launch) launch ;;
  doctor) doctor ;;
  cleanup) cleanup ;;
  *) echo "usage: $0 launch|doctor|cleanup" >&2; exit 2 ;;
esac
