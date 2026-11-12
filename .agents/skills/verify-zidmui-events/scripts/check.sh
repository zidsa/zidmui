#!/usr/bin/env bash
# Model-check model/CustomEvents.tla with TLC, then run the real-code witness.
# Usage: check.sh [model|witness]   (default: both). Exit 0 only if everything passes.
# Output: .verify-zidmui/formal/<timestamp>/{tlc-<Invariant>.txt,witness.txt}; TLC's scratch files stay there too.
set -uo pipefail

SKILL="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(git -C "$SKILL" rev-parse --show-toplevel)"
OUT="$REPO/.verify-zidmui/formal/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$OUT"
rc=0

if [ "${1:-all}" != witness ]; then
  # Run in OUT so TLC's states/ and trace files never land in the repo.
  cp "$SKILL/model/CustomEvents.tla" "$SKILL/model/CustomEvents.cfg" "$OUT/"
  (cd "$OUT" && sany CustomEvents.tla >sany.txt 2>&1) || { echo "SANY parse error:"; cat "$OUT/sany.txt"; exit 2; }
  # TLC stops at the first violation, so check each property in its own run.
  for inv in AtMostOnce OnceKeepsOn; do
    sed "s/^INVARIANTS .*/INVARIANTS TypeOK $inv/" "$OUT/CustomEvents.cfg" >"$OUT/$inv.cfg"
    (cd "$OUT" && tlc -workers auto -cleanup -config "$inv.cfg" CustomEvents.tla >"tlc-$inv.txt" 2>&1)
    t=$?
    if [ $t = 0 ]; then echo "model:   PASS $inv ($(grep -o '[0-9,]* distinct states found' "$OUT/tlc-$inv.txt"))"
    else echo "model:   FAIL $(grep -m1 -o 'Invariant [A-Za-z]* is violated' "$OUT/tlc-$inv.txt" || echo "$inv: tlc exit $t, see tlc-$inv.txt") (trace: $OUT/tlc-$inv.txt)"; rc=1; fi
  done
fi

if [ "${1:-all}" != model ]; then
  node "$SKILL/scripts/once-witness.mjs" >"$OUT/witness.txt" 2>&1
  w=$?
  sed 's/^/witness: /' "$OUT/witness.txt"
  [ $w = 0 ] || rc=1
fi

echo "output:  $OUT"
exit $rc
