// formal-icons: properties of every icon file in src/icons (21 categories), checked by importing and
// rendering each real module in Chromium through Vite's import.meta.glob, so a new icon is covered the
// moment it lands. Run: .agents/skills/verify-zidmui/scripts/formal.sh icons
import pkg from '../../../package.json';
import { mount, show, type Property } from '../verify-zidmui/formal/lib';

// vite/client types import.meta.glob (tsconfig "types": ["vite/client"]).
const modules = import.meta.glob('../../../src/icons/*/*.tsx', { eager: true }) as Record<string, Record<string, unknown>>;
const entries = Object.entries(modules).map(([path, mod]) => {
  const [, category, file] = path.match(/src\/icons\/([^/]+)\/([^/]+)\.tsx$/)!;
  return { path, category, file, mod };
});
// 'arrow-down-box-line' -> 'IconArrowDownBoxLine'; '24-hours-line' -> 'Icon24HoursLine'; 'saudi_riyal' ->
// 'IconSaudiRiyal' (the one snake_case file name; the export is still PascalCase).
const expectedName = (file: string) => 'Icon' + file.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

export const properties: Property[] = [
  {
    module: 'icons',
    name: 'every icon file exports exactly one component, named Icon<PascalCase file name>',
    run: async t => {
      t.check(entries.length > 1000, () => `glob found only ${entries.length} icon files`);
      for (const e of entries) {
        const names = Object.keys(e.mod);
        t.check(show(names) === show([expectedName(e.file)]), () => `${e.category}/${e.file}: exports ${show(names)}, want ${expectedName(e.file)}`);
      }
    },
  },
  {
    module: 'icons',
    name: 'every icon renders one svg with at least one shape, over a 24x24 viewBox (currency glyphs keep their own artboard)',
    run: async t => {
      for (const e of entries) {
        const Icon = Object.values(e.mod)[0] as React.FC;
        const m = await mount(<Icon />);
        const svgs = m.el.querySelectorAll(':scope > svg');
        const root = svgs[0];
        const got = {
          roots: svgs.length,
          viewBox: root?.getAttribute('viewBox') ?? null,
          shapes: root?.querySelectorAll('path, circle, rect, polygon, ellipse, line, polyline').length ?? 0,
        };
        const boxOk = e.category === 'currencies' ? /^0 0 [\d.]+ [\d.]+$/.test(got.viewBox ?? '') : got.viewBox === '0 0 24 24';
        t.check(got.roots === 1 && boxOk && got.shapes > 0, () => `${e.category}/${e.file}: ${show(got)}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'icons',
    name: 'FINDING icon-classname-drops-mui-classes: every icon keeps MuiSvgIcon-root and honours fontSize and color (createSvgIcon hoists the inner svg className over them)',
    expect: 'violated',
    run: async t => {
      for (const e of entries) {
        const Icon = Object.values(e.mod)[0] as React.FC<{ fontSize?: string; color?: string }>;
        const m = await mount(<Icon fontSize="small" color="primary" />);
        const cls = m.el.querySelector(':scope > svg')?.classList;
        const ok = !!cls && ['MuiSvgIcon-root', 'MuiSvgIcon-fontSizeSmall', 'MuiSvgIcon-colorPrimary'].every(c => cls.contains(c));
        t.check(ok, () => `${e.category}/${e.file}: class="${cls ? [...cls].join(' ') : ''}"`);
        await m.unmount();
      }
    },
  },
  {
    module: 'icons',
    name: 'package.json exports ./icons/<category>/* for exactly the categories in src/icons, each to the built es, cjs and types paths',
    run: async t => {
      const categories = [...new Set(entries.map(e => e.category))].sort();
      const exported = Object.keys(pkg.exports as unknown as Record<string, unknown>)
        .map(k => k.match(/^\.\/icons\/([^/]+)\/\*$/)?.[1])
        .filter((x): x is string => !!x)
        .sort();
      t.check(show(exported) === show(categories), () => `exports ${show(exported)}, src/icons has ${show(categories)}`);
      for (const c of categories) {
        const target = (pkg.exports as unknown as Record<string, Record<string, string>>)[`./icons/${c}/*`];
        const want = {
          require: `./dist/react/cjs/icons/${c}/*.js`,
          types: `./dist/react/types/icons/${c}/*.d.ts`,
          import: `./dist/react/es/icons/${c}/*.js`,
        };
        t.check(show(target) === show(want), () => `${c}: ${show(target)}`);
      }
    },
  },
];
