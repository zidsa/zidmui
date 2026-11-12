// Browser-side harness for the formal-* property suites. Storybook's Vite server serves and
// transforms this file and the suites, so they run against the real src/ modules, real React 19
// and real MUI in Chromium. scripts/formal-run.mjs imports a suite and calls runSuite().
import { act, type ReactElement, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';

import { themeParcel } from '../../../../src/theme/theme';
import { themeParcelDark } from '../../../../src/theme/theme.dark';

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

export type Outcome = 'holds' | 'violated';
export type Property = {
  module: string; // inventory module, e.g. components/app-button
  name: string; // the promise, in one sentence
  expect?: Outcome; // recorded outcome; 'violated' = a known FINDING
  run: (t: Tally) => void | Promise<void>;
};
export type Tally = {
  check: (ok: boolean, counterexample: () => string) => void;
};
export type PropertyResult = {
  module: string;
  name: string;
  cases: number;
  outcome: Outcome;
  expected: Outcome;
  counterexamples: string[];
  error?: string;
};

// Cartesian product of named finite domains: product({a:[1,2], b:['x']}) -> [{a:1,b:'x'},{a:2,b:'x'}].
export const product = <T extends Record<string, readonly unknown[]>>(domains: T) => {
  let rows: Record<string, unknown>[] = [{}];
  for (const [k, vs] of Object.entries(domains)) rows = rows.flatMap(r => vs.map(v => ({ ...r, [k]: v })));
  return rows as { [K in keyof T]: T[K][number] }[];
};

export const show = (v: unknown) => JSON.stringify(v, (_k, x) => (x === undefined ? '<undefined>' : x));

export type Mounted = { el: HTMLElement; rerender: (node: ReactNode) => Promise<void>; unmount: () => Promise<void> };

const roots = new Set<Root>();

export const mount = async (node: ReactNode, opts: { theme?: 'light' | 'dark'; dir?: 'ltr' | 'rtl' } = {}): Promise<Mounted> => {
  const el = document.createElement('div');
  if (opts.dir) el.setAttribute('dir', opts.dir);
  document.body.append(el);
  const root = createRoot(el);
  roots.add(root);
  const theme = opts.theme === 'dark' ? themeParcelDark : themeParcel;
  const wrap = (n: ReactNode) => <ThemeProvider theme={theme}>{n}</ThemeProvider>;
  await act(async () => root.render(wrap(node)));
  return {
    el,
    rerender: async n => act(async () => root.render(wrap(n))),
    unmount: async () => {
      await act(async () => root.unmount());
      roots.delete(root);
      el.remove();
    },
  };
};

// Render once, read, unmount. Most properties only need the DOM of one render.
export const withMounted = async <R,>(node: ReactElement, read: (el: HTMLElement) => R | Promise<R>, opts?: Parameters<typeof mount>[1]) => {
  const m = await mount(node, opts);
  try {
    return await read(m.el);
  } finally {
    await m.unmount();
  }
};

export const renderHook = async <P, R>(hook: (props: P) => R, initial: P) => {
  const result = { current: undefined as unknown as R };
  const Harness = ({ p }: { p: P }) => {
    result.current = hook(p);
    return null;
  };
  const m = await mount(<Harness p={initial} />);
  return {
    result,
    rerender: (p: P) => m.rerender(<Harness p={p} />),
    act: (fn: () => void) => act(async () => fn()),
    unmount: m.unmount,
  };
};

export const click = async (el: Element | null | undefined) => {
  if (!el) throw new Error('click: element not found');
  await act(async () => (el as HTMLElement).click());
};

export const settle = (ms: number) => act(async () => new Promise(r => setTimeout(r, ms)));

const MAX_COUNTEREXAMPLES = 3;

export const runSuite = async (properties: Property[]): Promise<PropertyResult[]> => {
  const results: PropertyResult[] = [];
  for (const p of properties) {
    let cases = 0;
    const counterexamples: string[] = [];
    let violations = 0;
    let error: string | undefined;
    try {
      await p.run({
        check: (ok, ce) => {
          cases++;
          if (!ok) {
            violations++;
            if (counterexamples.length < MAX_COUNTEREXAMPLES) counterexamples.push(ce());
          }
        },
      });
    } catch (e) {
      error = e instanceof Error ? `${e.message}` : String(e);
    }
    for (const r of [...roots]) {
      await act(async () => r.unmount());
      roots.delete(r);
    }
    document.body.replaceChildren();
    const outcome: Outcome = violations || error || cases === 0 ? 'violated' : 'holds';
    results.push({ module: p.module, name: p.name, cases, outcome, expected: p.expect ?? 'holds', counterexamples, error: error ?? (cases === 0 ? 'no cases checked' : undefined) });
  }
  return results;
};
