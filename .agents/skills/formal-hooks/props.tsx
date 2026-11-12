// formal-hooks: properties of the four published hooks, checked against the real src/hooks
// modules under React 19 in Chromium. Run: .agents/skills/verify-zidmui/scripts/formal.sh hooks
import { useCustomEventListener, triggerCustomEvent } from '../../../src/hooks/use-custom-event-listener';
import { useDebounceState } from '../../../src/hooks/use-debounce-state';
import { usePaginatedData } from '../../../src/hooks/use-paginated-data';
import { useToggle } from '../../../src/hooks/use-toggle';
import { renderHook, settle, show, type Property } from '../verify-zidmui/formal/lib';

type ToggleOp = 'toggle' | 'on' | 'off' | 'set:true' | 'set:false';
const TOGGLE_OPS: ToggleOp[] = ['toggle', 'on', 'off', 'set:true', 'set:false'];
const refToggle = (v: boolean, op: ToggleOp) =>
  op === 'toggle' ? !v : op === 'on' || op === 'set:true' ? true : false;

// Every sequence of ops of length 0..n.
const sequences = <T,>(alphabet: T[], n: number): T[][] => {
  const out: T[][] = [[]];
  let frontier: T[][] = [[]];
  for (let i = 0; i < n; i++) {
    frontier = frontier.flatMap(s => alphabet.map(a => [...s, a]));
    out.push(...frontier);
  }
  return out;
};

export const properties: Property[] = [
  {
    module: 'hooks/use-toggle',
    name: 'after any sequence of toggle/on/off/setValue (length <= 4, default false/true/omitted) value equals the reference state machine',
    run: async t => {
      for (const initial of [undefined, false, true] as const) {
        for (const seq of sequences(TOGGLE_OPS, 4)) {
          const h = await renderHook(() => useToggle(initial), {});
          let want = initial ?? false;
          for (const op of seq) {
            await h.act(() => {
              const r = h.result.current;
              if (op === 'toggle') r.toggle();
              else if (op === 'on') r.on();
              else if (op === 'off') r.off();
              else r.setValue(op === 'set:true');
            });
            want = refToggle(want, op);
          }
          const got = h.result.current.value;
          t.check(got === want, () => `default=${show(initial)} ops=${seq.join(',')} -> value ${got}, want ${want}`);
          await h.unmount();
        }
      }
    },
  },
  {
    module: 'hooks/use-toggle',
    name: 'setValue keeps the same identity across re-renders (safe in effect deps); preventEventDefault calls preventDefault and tolerates no event',
    run: async t => {
      const h = await renderHook(() => useToggle(false), {});
      const first = h.result.current.setValue;
      for (const op of ['toggle', 'on', 'off', 'toggle'] as const) {
        await h.act(() => h.result.current[op]());
        t.check(h.result.current.setValue === first, () => `setValue identity changed after ${op}`);
      }
      let prevented = 0;
      h.result.current.preventEventDefault({ preventDefault: () => prevented++ } as unknown as React.SyntheticEvent);
      t.check(prevented === 1, () => `preventDefault called ${prevented} times`);
      let threw = false;
      try {
        h.result.current.preventEventDefault();
        h.result.current.preventEventDefault({} as React.SyntheticEvent);
      } catch {
        threw = true;
      }
      t.check(!threw, () => 'preventEventDefault threw on a missing event or a missing preventDefault');
      await h.unmount();
    },
  },
  {
    module: 'hooks/use-paginated-data',
    name: 'for every list length 0..23, perPage (omitted,1,3,5,10) and page 1..pagesCount+1: the page is the exact slice, pagesCount = ceil(len/limit), and the pages partition the list in order',
    run: async t => {
      for (let len = 0; len <= 23; len++) {
        const data = Array.from({ length: len }, (_, i) => i);
        for (const perPage of [undefined, 1, 3, 5, 10]) {
          const limit = perPage ?? 10;
          const h = await renderHook(usePaginatedData<number>, { data, perPage });
          const pages = Math.ceil(len / limit);
          t.check(h.result.current.pagesCount === pages && h.result.current.limit === limit && h.result.current.page === 1,
            () => `len=${len} perPage=${show(perPage)} -> pagesCount ${h.result.current.pagesCount}, limit ${h.result.current.limit}, page ${h.result.current.page}; want ${pages}, ${limit}, 1`);
          const seen: number[] = [];
          for (let page = 1; page <= pages + 1; page++) {
            await h.act(() => h.result.current.onPageChange(page));
            const got = h.result.current.data;
            const want = data.slice((page - 1) * limit, page * limit);
            t.check(show(got) === show(want), () => `len=${len} perPage=${show(perPage)} page=${page} -> ${show(got)}, want ${show(want)}`);
            if (page <= pages) seen.push(...got);
          }
          t.check(show(seen) === show(data), () => `len=${len} perPage=${show(perPage)}: pages joined ${show(seen)} != data`);
          await h.unmount();
        }
      }
    },
  },
  {
    module: 'hooks/use-paginated-data',
    name: 'onLimitChange always returns to page 1 (falsy limit falls back to 5), and onPageChange with no page or 0 goes to page 1, so the view never points past a shrunk list',
    run: async t => {
      const data = Array.from({ length: 37 }, (_, i) => i);
      for (const startPage of [1, 2, 4]) {
        for (const newLimit of [undefined, 0, 1, 5, 7, 50]) {
          const h = await renderHook(usePaginatedData<number>, { data, perPage: 10 });
          await h.act(() => h.result.current.onPageChange(startPage));
          await h.act(() => h.result.current.onLimitChange(newLimit));
          const want = newLimit || 5;
          const r = h.result.current;
          t.check(r.page === 1 && r.limit === want && show(r.data) === show(data.slice(0, want)),
            () => `page ${startPage} then onLimitChange(${show(newLimit)}) -> page ${r.page}, limit ${r.limit}; want page 1, limit ${want}`);
          for (const p of [undefined, 0]) {
            await h.act(() => h.result.current.onPageChange(3));
            await h.act(() => h.result.current.onPageChange(p));
            t.check(h.result.current.page === 1, () => `onPageChange(${show(p)}) -> page ${h.result.current.page}, want 1`);
          }
          await h.unmount();
        }
      }
    },
  },
  {
    module: 'hooks/use-debounce-state',
    name: 'the raw value follows every set at once; the debounced value stays at the last settled value during a burst and becomes the burst\'s last value once the delay passes',
    run: async t => {
      // The default 400 ms delay. Sets are 20 ms apart; the "not yet" check is only counted when the
      // clock proves less than the delay passed since the last set, so a slow machine cannot fake a pass or a fail.
      const delay = 400;
      for (const burst of [['a'], ['a', 'b'], ['a', 'b', 'c', 'a'], ['x', 'x']]) {
        const h = await renderHook(() => useDebounceState<string>('init'), {});
        t.check(h.result.current[0] === 'init' && h.result.current[2] === 'init', () => `initial -> ${show(h.result.current)}`);
        let lastSet = 0;
        for (const v of burst) {
          await h.act(() => h.result.current[1](v));
          lastSet = performance.now();
          t.check(h.result.current[2] === v, () => `burst ${show(burst)}: raw after set(${v}) is ${show(h.result.current[2])}`);
          await settle(20);
        }
        const debouncedNow = h.result.current[0];
        if (performance.now() - lastSet < delay)
          t.check(debouncedNow === 'init', () => `burst ${show(burst)}: debounced moved to ${show(debouncedNow)} ${Math.round(performance.now() - lastSet)} ms after the last set (delay ${delay})`);
        await settle(delay * 2);
        const last = burst[burst.length - 1];
        t.check(h.result.current[0] === last, () => `burst ${show(burst)}: debounced ${show(h.result.current[0])} after the delay, want ${last}`);
        await h.unmount();
      }
    },
  },
  {
    module: 'hooks/use-custom-event-listener',
    name: 'useCustomEventListener delivers each event (with its detail) exactly once while mounted, stops at unmount, and a listener swapped on re-render replaces the old one instead of adding to it',
    run: async t => {
      const got: string[] = [];
      const a = (e: CustomEvent) => got.push(`a:${e.detail}`);
      const b = (e: CustomEvent) => got.push(`b:${e.detail}`);
      const h = await renderHook(({ l, n }: { l: (e: CustomEvent) => void; n: string }) => useCustomEventListener(n, l), { l: a, n: 'fv-1' });
      triggerCustomEvent('fv-1', 1);
      await h.rerender({ l: a, n: 'fv-1' });
      triggerCustomEvent('fv-1', 2);
      await h.rerender({ l: b, n: 'fv-1' });
      triggerCustomEvent('fv-1', 3);
      await h.rerender({ l: b, n: 'fv-2' });
      triggerCustomEvent('fv-1', 4);
      triggerCustomEvent('fv-2', 5);
      await h.unmount();
      triggerCustomEvent('fv-2', 6);
      const want = ['a:1', 'a:2', 'b:3', 'b:5'];
      t.check(show(got) === show(want), () => `deliveries ${show(got)}, want ${show(want)}`);
    },
  },
];
