#!/usr/bin/env bash
# Formal checks for zidmui: run formal-<group> property suites (and their mutants) in a real browser.
# Usage: formal.sh <group|all> [--mutants]
#   groups: data-display feedback-overlays hooks icons inputs-forms navigation-layout theme-styles
# Starts an isolated Storybook (sb.sh) when none of ours is running on ZIDMUI_SB_PORT, and stops it after.
# Exit 0 = every recorded outcome holds (FINDINGs included) and, with --mutants, every mutant is caught.
# Exit 1 = an outcome changed or a mutant survived. Exit 3 = tool or environment error.
set -uo pipefail
S="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$S" rev-parse --show-toplevel)"
SK="$REPO/.agents/skills"
GROUPS_ALL="data-display feedback-overlays hooks icons inputs-forms navigation-layout theme-styles"
group=${1:-}; mutants=${2:-}
case " $GROUPS_ALL all " in *" $group "*) ;; *) echo "usage: $0 <${GROUPS_ALL// /|}|all> [--mutants]" >&2; exit 2 ;; esac
[ "$group" = all ] && groups=$GROUPS_ALL || groups=$group
export ZIDMUI_SB_PORT=${ZIDMUI_SB_PORT:-6116}
OUT="$REPO/.verify-zidmui/formal/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$OUT"

started=0
if ! "$S/sb.sh" doctor >/dev/null 2>&1; then
  "$S/sb.sh" launch >"$OUT/launch.txt" 2>&1 || { echo "TOOL storybook did not start, see $OUT/launch.txt"; exit 3; }
  started=1
fi
applied=""
cleanup() {
  [ -n "$applied" ] && git -C "$REPO" apply -R "$applied" && echo "reverted $applied"
  [ $started = 1 ] && "$S/sb.sh" cleanup >/dev/null 2>&1
}
trap cleanup EXIT

rc=0
for g in $groups; do
  node "$S/formal-run.mjs" "$g" --out "$OUT/$g.json" | tee "$OUT/$g.txt"
  r=${PIPESTATUS[0]}
  if [ "$r" = 0 ]; then echo "ok   $g"; else echo "FAIL $g (exit $r)"; [ "$r" = 3 ] && rc=3 || { [ $rc = 0 ] && rc=1; }; fi
  # The events helpers also have a TLA+ model; the hooks group runs it too.
  # The recorded FINDINGs are exactly these four lines (trace paths and step details stripped), with exit 1.
  if [ "$g" = hooks ]; then
    if ! command -v tlc >/dev/null || ! command -v sany >/dev/null; then
      echo "TOOL hooks/events: tlc and sany must be on PATH"; rc=3
    else
      "$SK/verify-zidmui-events/scripts/check.sh" | tee "$OUT/events-check.txt"
      e=${PIPESTATUS[0]}
      got=$(sed -nE -e 's/^(model:   .*) \(trace: .*\)$/\1/p' -e '/^witness: (PASS|FAIL)/p' "$OUT/events-check.txt")
      want='model:   FAIL Invariant AtMostOnce is violated
model:   FAIL Invariant OnceKeepsOn is violated
witness: FAIL AtMostOnce: expected 1, got 3
witness: FAIL OnceKeepsOn: expected 3, got 1'
      if [ "$e" = 2 ]; then echo "TOOL hooks/events: model checker error (exit 2), see $OUT/events-check.txt"; rc=3
      elif [ "$e" = 1 ] && [ "$got" = "$want" ]; then
        echo "ok   hooks/events (recorded FINDINGs AtMostOnce, OnceKeepsOn reproduced exactly)"
      else echo "FAIL hooks/events changed (exit $e), see $OUT/events-check.txt"; [ $rc = 0 ] && rc=1; fi
    fi
  fi
  [ "$mutants" = --mutants ] || continue
  for p in "$SK/formal-$g"/mutants/*.patch; do
    [ -e "$p" ] || continue
    m=$(basename "$p" .patch)
    if ! git -C "$REPO" apply --check "$p" 2>/dev/null; then echo "FAIL MUTANT DRIFT $g/$m: patch no longer applies"; [ $rc = 0 ] && rc=1; continue; fi
    git -C "$REPO" apply "$p" && applied=$p
    sleep 1 # let Vite's watcher invalidate the module
    node "$S/formal-run.mjs" "$g" >"$OUT/mutant-$g-$m.txt" 2>&1
    r=$?
    git -C "$REPO" apply -R "$p" && applied=""
    sleep 1
    if [ "$r" = 1 ]; then echo "ok   mutant-$g-$m caught ($(grep -c '^FAIL' "$OUT/mutant-$g-$m.txt") property changed)"
    else echo "FAIL mutant-$g-$m survived (exit $r), see $OUT/mutant-$g-$m.txt"; [ $rc = 0 ] && rc=1; fi
  done
done
echo "output: $OUT"
exit $rc
