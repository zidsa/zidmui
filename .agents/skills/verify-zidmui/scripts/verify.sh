#!/usr/bin/env bash
# Verify one zidmui feature group the way a consumer's user meets it, in a real browser:
#   1. smoke: every story of the group renders in light and dark with no console error;
#   2. flows: every .agents/skills/verify-<group>/flows/*.json journey passes (drive.mjs --flow).
# Usage: verify.sh <group|all>
#   groups: data-display feedback-overlays hooks icons inputs-forms navigation-layout theme-styles
# Starts an isolated Storybook (sb.sh) when ours is not running, and stops it afterwards.
# Exit 0 = all passed, 1 = a story or a flow failed, 3 = tool or environment error.
set -uo pipefail
S="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$S" rev-parse --show-toplevel)"
SK="$REPO/.agents/skills"
GROUPS_ALL="data-display feedback-overlays hooks icons inputs-forms navigation-layout theme-styles"
group=${1:-}
case " $GROUPS_ALL all " in *" $group "*) ;; *) echo "usage: $0 <${GROUPS_ALL// /|}|all>" >&2; exit 2 ;; esac
[ "$group" = all ] && groups=$GROUPS_ALL || groups=$group
export ZIDMUI_SB_PORT=${ZIDMUI_SB_PORT:-6116}
OUT="$REPO/.verify-zidmui/verify/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$OUT"
started=0
if ! "$S/sb.sh" doctor >/dev/null 2>&1; then
  "$S/sb.sh" launch >"$OUT/launch.txt" 2>&1 || { echo "TOOL storybook did not start, see $OUT/launch.txt"; exit 3; }
  started=1
fi
trap '[ $started = 1 ] && "$S/sb.sh" cleanup >/dev/null 2>&1' EXIT
rc=0
fail() { [ "$1" = 3 ] && rc=3 || { [ $rc = 0 ] && rc=1; }; }
if [ "$group" = all ]; then
  node "$S/coverage.mjs" | tee "$OUT/coverage.txt"
  r=${PIPESTATUS[0]}; [ $r = 0 ] && echo "ok   coverage" || { echo "FAIL coverage (exit $r)"; fail $r; }
fi
for g in $groups; do
  d="$SK/verify-$g"
  [ -f "$d/stories.txt" ] || { echo "TOOL $d/stories.txt missing"; rc=3; continue; }
  # shellcheck disable=SC2046
  node "$S/smoke.mjs" "$OUT/$g/smoke" $(grep -v '^#' "$d/stories.txt") >"$OUT/$g-smoke.txt" 2>&1
  r=$?; tail -1 "$OUT/$g-smoke.txt"; grep '^FAIL' "$OUT/$g-smoke.txt"
  [ $r = 0 ] && echo "ok   $g smoke" || { echo "FAIL $g smoke (exit $r)"; fail $r; }
  for f in "$d"/flows/*.json; do
    [ -e "$f" ] || continue
    n=$(basename "$f" .json)
    node "$S/drive.mjs" --flow "$f" --out "$OUT/$g/flows/$n" --strict-console 1 >"$OUT/$g-flow-$n.txt" 2>&1
    r=$?
    if [ $r = 0 ]; then echo "ok   $g/$n"; else echo "FAIL $g/$n: $(tail -1 "$OUT/$g-flow-$n.txt")"; fail $r; fi
  done
done
echo "output: $OUT"
exit $rc
