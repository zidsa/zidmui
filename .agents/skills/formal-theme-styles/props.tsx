// formal-theme-styles: properties of the MUI theme (src/theme) and the CSS design system (src/css),
// checked in Chromium against the real modules and the raw CSS sources Vite serves.
// Run: .agents/skills/verify-zidmui/scripts/formal.sh theme-styles
import { palette } from '../../../src/theme/palette';
import { paletteDark } from '../../../src/theme/palette.dark';
import { themeParcel } from '../../../src/theme/theme';
import { themeParcelDark } from '../../../src/theme/theme.dark';
import { show, type Property } from '../verify-zidmui/formal/lib';

// vite/client types import.meta.glob (tsconfig "types": ["vite/client"]).
const sheets = import.meta.glob('../../../src/css/**/*.css', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const rel = (p: string) => p.replace(/^.*src\/css\//, '');
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
// Custom properties declared inside each top-level block whose selector matches sel.
const declared = (css: string, sel: RegExp) => {
  const out = new Set<string>();
  for (const m of stripComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!sel.test(m[1].trim())) continue;
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:/g)) out.add(d[1]);
  }
  return out;
};
// Parse sheet by sheet: index.css is @import lines only, and joined text would glue them onto the
// next sheet's first selector.
const union = (sel: RegExp) => new Set(Object.values(sheets).flatMap(css => [...declared(css, sel)]));
const rootTokens = union(/^:root$/);
const darkTokens = union(/^\[data-theme="dark"\]$/);
const anyTokens = union(/.*/);
// The formal page renders inside Storybook's iframe without the design-system CSS, so load it here.
const ensureCss = () => {
  if (document.getElementById('formal-zid-css')) return;
  const style = document.createElement('style');
  style.id = 'formal-zid-css';
  style.textContent = Object.entries(sheets)
    .filter(([p]) => rel(p) !== 'index.css')
    .map(([, css]) => css)
    .join('\n');
  document.head.appendChild(style);
};

const keyPaths = (o: unknown, prefix = ''): string[] =>
  o && typeof o === 'object' && !Array.isArray(o)
    ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
        typeof v === 'function' ? [] : v && typeof v === 'object' ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`],
      )
    : [];

const cssValue = async (token: string, dark: boolean) => {
  const el = document.createElement('div');
  if (dark) el.setAttribute('data-theme', 'dark');
  document.body.appendChild(el);
  el.style.color = `var(${token})`;
  const v = getComputedStyle(el).color;
  el.remove();
  return v;
};
const rgb = (color: string) => {
  const el = document.createElement('div');
  el.style.color = color;
  document.body.appendChild(el);
  const v = getComputedStyle(el).color;
  el.remove();
  return v;
};

export const properties: Property[] = [
  {
    module: 'theme',
    name: 'the light and dark source palettes define the same token paths, so no palette lookup is undefined in one mode',
    run: async t => {
      // The source palettes, not the built themes: createTheme adds MUI's own mode-specific defaults.
      const light = new Set(keyPaths(palette));
      const dark = new Set(keyPaths(paletteDark));
      const onlyLight = [...light].filter(k => !dark.has(k));
      const onlyDark = [...dark].filter(k => !light.has(k));
      t.check(light.size > 50, () => `palette has only ${light.size} paths`);
      for (const k of onlyLight) t.check(false, () => `${k} is light-only`);
      for (const k of onlyDark) t.check(false, () => `${k} is dark-only`);
      t.check(themeParcel.palette.mode === 'light' && themeParcelDark.palette.mode === 'dark', () => 'modes');
    },
  },
  {
    module: 'theme',
    name: 'both themes carry 25 shadows (MUI elevations 0..24), the same shape and the same typography',
    run: async t => {
      const got = {
        shadows: [themeParcel.shadows.length, themeParcelDark.shadows.length],
        shape: show(themeParcel.shape) === show(themeParcelDark.shape),
        typography: show(themeParcel.typography) === show(themeParcelDark.typography),
      };
      t.check(show(got) === show({ shadows: [25, 25], shape: true, typography: true }), () => show(got));
    },
  },
  {
    module: 'styles',
    name: 'every var(--zid-*) used in any stylesheet is declared somewhere in src/css',
    run: async t => {
      for (const [path, css] of Object.entries(sheets)) {
        for (const m of stripComments(css).matchAll(/var\(\s*(--zid-[\w-]+)/g)) {
          t.check(anyTokens.has(m[1]), () => `${rel(path)} uses ${m[1]}, declared nowhere`);
        }
      }
    },
  },
  {
    module: 'styles',
    name: 'the dark theme only overrides tokens :root declares, so light mode never falls back for a dark-only token',
    run: async t => {
      t.check(darkTokens.size > 10, () => `only ${darkTokens.size} dark tokens parsed`);
      for (const k of darkTokens) t.check(rootTokens.has(k), () => `${k} is set under [data-theme="dark"] but not in :root`);
    },
  },
  {
    module: 'styles',
    name: 'index.css imports every stylesheet in src/css exactly once, tokens before utilities before components',
    run: async t => {
      const index = Object.entries(sheets).find(([p]) => rel(p) === 'index.css')![1];
      const imports = [...stripComments(index).matchAll(/@import\s+['"]\.\/([^'"]+)['"]/g)].map(m => m[1]);
      const files = Object.keys(sheets).map(rel).filter(p => p !== 'index.css').sort();
      t.check(show([...imports].sort()) === show(files), () => `imports ${show(imports)}, files ${show(files)}`);
      t.check(new Set(imports).size === imports.length, () => `duplicate import in ${show(imports)}`);
      const rank = (p: string) => (p.startsWith('components/') ? 2 : p === 'utilities.css' ? 1 : 0);
      const ranks = imports.map(rank);
      t.check(show(ranks) === show([...ranks].sort()), () => `order ${show(imports)}`);
    },
  },
  {
    module: 'styles',
    name: 'the CSS primary and text tokens resolve to the MUI palette colours in both modes',
    run: async t => {
      const pairs: [string, (p: typeof themeParcel.palette) => string][] = [
        ['--zid-primary-main', p => p.primary.main],
        ['--zid-primary-dark', p => p.primary.dark],
        ['--zid-primary-light', p => p.primary.light],
        ['--zid-text-primary', p => p.text.primary],
        ['--zid-text-secondary', p => p.text.secondary],
        ['--zid-text-disabled', p => p.text.disabled],
      ];
      ensureCss();
      for (const dark of [false, true]) {
        const palette = (dark ? themeParcelDark : themeParcel).palette;
        for (const [token, pick] of pairs) {
          const css = await cssValue(token, dark);
          const mui = rgb(pick(palette));
          t.check(css === mui, () => `${dark ? 'dark' : 'light'} ${token}: css ${css}, mui ${mui}`);
        }
      }
    },
  },
  {
    module: 'styles',
    name: 'FINDING css-dark-secondary-drift: the CSS secondary tokens resolve to the MUI palette secondary colours in both modes (the dark override repeats the light values)',
    expect: 'violated',
    run: async t => {
      ensureCss();
      for (const dark of [false, true]) {
        const p = (dark ? themeParcelDark : themeParcel).palette;
        for (const [token, mui] of [
          ['--zid-secondary-main', p.secondary.main],
          ['--zid-secondary-dark', p.secondary.dark],
          ['--zid-secondary-light', p.secondary.light],
        ] as const) {
          const css = await cssValue(token, dark);
          t.check(css === rgb(mui), () => `${dark ? 'dark' : 'light'} ${token}: css ${css}, mui ${rgb(mui)}`);
        }
      }
    },
  },
];
