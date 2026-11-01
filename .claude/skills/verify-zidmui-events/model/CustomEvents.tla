---------------------------- MODULE CustomEvents ----------------------------
(* on / off / once / triggerCustomEvent from
   src/hooks/use-custom-event-listener.ts, for one event name on `document`.
   One step here is one step in the code: each helper call is one action,
   and a dispatch runs the cloned listener list one listener at a time,
   as the DOM does. *)
EXTENDS Naturals, Sequences

CONSTANTS Listeners,   \* listener functions a consumer passes in
          MaxOnce,     \* bound on once() calls
          MaxTriggers, \* bound on triggerCustomEvent() calls
          OnceRemoves  \* what once's wrapper removes after it runs:
                       \*   "listener" = the code today, off(eventName, listener)
                       \*   "wrapper"  = the wrapper removes itself

VARIABLES reg,       \* document's listener list, in registration order
          snap,      \* the list cloned when a dispatch starts; <<>> when idle
          i,         \* next index into snap
          wantPlain, \* listeners added with on() and not yet off()'d
          onceCalls, \* [l |-> number of once(eventName, l) calls]
          onceRuns,  \* [l |-> times l ran through a once() wrapper]
          triggers,  \* triggerCustomEvent() calls so far
          nextW      \* id of the next once() wrapper

vars == <<reg, snap, i, wantPlain, onceCalls, onceRuns, triggers, nextW>>

\* on(name, l) registers l itself; once(name, l) registers a new anonymous
\* wrapper `() => { listener?.(); off(name, listener) }` on every call.
Plain(l)   == [kind |-> "plain", l |-> l, w |-> 0]
Wrap(l, k) == [kind |-> "wrap",  l |-> l, w |-> k]

InReg(h)  == \E j \in 1..Len(reg) : reg[j] = h
Add(h)    == IF InReg(h) THEN reg ELSE Append(reg, h) \* addEventListener drops a duplicate
Remove(h) == SelectSeq(reg, LAMBDA x : x # h)         \* removeEventListener; no-op if absent
Idle      == snap = <<>>

Init == /\ reg = <<>> /\ snap = <<>> /\ i = 1 /\ wantPlain = {}
        /\ onceCalls = [l \in Listeners |-> 0]
        /\ onceRuns  = [l \in Listeners |-> 0]
        /\ triggers = 0 /\ nextW = 1

On(l)  == /\ Idle /\ reg' = Add(Plain(l)) /\ wantPlain' = wantPlain \cup {l}
          /\ UNCHANGED <<snap, i, onceCalls, onceRuns, triggers, nextW>>

Off(l) == /\ Idle /\ reg' = Remove(Plain(l)) /\ wantPlain' = wantPlain \ {l}
          /\ UNCHANGED <<snap, i, onceCalls, onceRuns, triggers, nextW>>

Once(l) == /\ Idle /\ nextW <= MaxOnce
           /\ reg' = Add(Wrap(l, nextW)) /\ nextW' = nextW + 1
           /\ onceCalls' = [onceCalls EXCEPT ![l] = @ + 1]
           /\ UNCHANGED <<snap, i, wantPlain, onceRuns, triggers>>

\* triggerCustomEvent: dispatchEvent clones the list, then runs it in order.
Trigger == /\ Idle /\ triggers < MaxTriggers
           /\ triggers' = triggers + 1 /\ snap' = reg /\ i' = 1
           /\ UNCHANGED <<reg, wantPlain, onceCalls, onceRuns, nextW>>

\* Run snap[i]. A listener removed earlier in this dispatch is skipped.
Dispatch ==
  /\ ~Idle
  /\ LET h == snap[i] IN
       IF InReg(h) /\ h.kind = "wrap"
       THEN /\ onceRuns' = [onceRuns EXCEPT ![h.l] = @ + 1]
            /\ reg' = IF OnceRemoves = "listener" THEN Remove(Plain(h.l)) ELSE Remove(h)
       ELSE UNCHANGED <<reg, onceRuns>>
  /\ IF i = Len(snap) THEN snap' = <<>> /\ i' = 1 ELSE snap' = snap /\ i' = i + 1
  /\ UNCHANGED <<wantPlain, onceCalls, triggers, nextW>>

Next == \/ \E l \in Listeners : On(l) \/ Off(l) \/ Once(l)
        \/ Trigger
        \/ Dispatch

Spec == Init /\ [][Next]_vars

TypeOK == /\ i \in Nat /\ triggers \in 0..MaxTriggers /\ nextW \in 1..(MaxOnce + 1)
          /\ onceRuns \in [Listeners -> Nat] /\ onceCalls \in [Listeners -> Nat]

\* Each once(name, l) call runs l at most one time.
AtMostOnce == \A l \in Listeners : onceRuns[l] <= onceCalls[l]

\* once(name, l) never unsubscribes a separate on(name, l).
OnceKeepsOn == Idle => \A l \in wantPlain : InReg(Plain(l))
=============================================================================
