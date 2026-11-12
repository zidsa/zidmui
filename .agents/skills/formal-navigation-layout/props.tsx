// formal-navigation-layout: properties of AppListItem, AppPagination, AppTabs, StackRow and StackColumn,
// checked against the real src/components modules under React 19 and MUI in Chromium, over every
// value of each finite prop domain. Run: .agents/skills/verify-zidmui/scripts/formal.sh navigation-layout
// One property carries expect: 'violated' (a recorded FINDING, see SKILL.md).
import { useState } from 'react';

import { AppListItem } from '../../../src/components/app-list-item';
import { AppPagination } from '../../../src/components/app-pagination';
import { AppTabs } from '../../../src/components/app-tabs';
import { StackColumn } from '../../../src/components/stack-column';
import { StackRow } from '../../../src/components/stack-row';
import { click, mount, product, show, withMounted, type Property } from '../verify-zidmui/formal/lib';

// Props are passed only when set: an explicit undefined overrides the component's default through its
// {...props} spread, which is React spread semantics, not a contract of these components.
const defined = (o: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as never;

export const properties: Property[] = [
  {
    module: 'components/app-pagination',
    name: 'pagination: for every count 1..7 and page 1..count, first/previous are disabled iff page is 1, next/last iff page is count, the current page is marked, and each nav button reports the page it names',
    run: async t => {
      const cases: { count: number; page: number }[] = [];
      for (let count = 1; count <= 7; count++) for (let page = 1; page <= count; page++) cases.push({ count, page });
      for (const c of cases) {
        for (const [label, target] of [
          ['Go to first page', 1],
          ['Go to previous page', c.page - 1],
          ['Go to next page', c.page + 1],
          ['Go to last page', c.count],
        ] as const) {
          const seen: number[] = [];
          const got = await withMounted(<AppPagination count={c.count} page={c.page} onChange={(_e, p) => seen.push(p)} />, async el => {
            const btn = el.querySelector(`button[aria-label="${label}"]`) as HTMLButtonElement | null;
            const current = el.querySelector('[aria-current="page"]')?.textContent ?? null;
            const disabled = btn?.disabled ?? null;
            if (btn) await click(btn);
            return { exists: !!btn, disabled, current, seen };
          });
          const atStart = label.includes('first') || label.includes('previous');
          const dis = atStart ? c.page === 1 : c.page === c.count;
          const want = { exists: true, disabled: dis, current: String(c.page), seen: dis ? [] : [target] };
          t.check(show(got) === show(want), () => `${show(c)} ${label}: got ${show(got)}, want ${show(want)}`);
        }
      }
    },
  },
  {
    module: 'components/app-tabs',
    name: 'tabs: exactly the tab whose value equals value is selected; clicking tab i reports value i and selects it; labels, icons and chips render in order',
    run: async t => {
      for (const c of product({ n: [1, 2, 4], start: [0, 1, 3], clickIdx: [0, 1, 3], chip: [false, true], icon: [false, true] })) {
        if (c.start >= c.n || c.clickIdx >= c.n) continue;
        const seen: number[] = [];
        const tabs = Array.from({ length: c.n }, (_v, i) => ({
          key: `k${i}`,
          value: i,
          label: `Tab${i}`,
          chip: c.chip ? { label: String(i * 10) } : undefined,
          icon: c.icon ? <svg data-testid={`ic${i}`} /> : undefined,
        }));
        const Ctl = () => {
          const [v, setV] = useState(c.start);
          return <AppTabs value={v} tabs={tabs} onChange={(_e, x) => (seen.push(x), setV(x))} />;
        };
        const got = await withMounted(<Ctl />, async el => {
          const tabEls = () => [...el.querySelectorAll('[role="tab"]')];
          const before = tabEls().map(x => x.getAttribute('aria-selected') === 'true');
          await click(tabEls()[c.clickIdx]);
          return {
            texts: tabEls().map(x => x.textContent),
            icons: tabEls().map(x => !!x.querySelector('svg[data-testid]')),
            before,
            after: tabEls().map(x => x.getAttribute('aria-selected') === 'true'),
            seen,
          };
        });
        const sel = (k: number) => Array.from({ length: c.n }, (_v, i) => i === k);
        const want = {
          texts: tabs.map((x, i) => `Tab${i}${c.chip ? i * 10 : ''}`),
          icons: tabs.map(() => c.icon),
          before: sel(c.start),
          after: sel(c.clickIdx),
          seen: c.clickIdx === c.start ? [] : [c.clickIdx],
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-list-item',
    name: 'list item: the icon, label, description, content, tooltip icon, suffix and children each render iff given, in that reading order',
    run: async t => {
      for (const c of product({
        icon: [false, true],
        label: [undefined, 'Name', 'node'],
        description: [undefined, 'Desc', 'node'],
        content: [undefined, 'Body'],
        suffix: [false, true],
        tooltip: [undefined, 'Hint'],
      })) {
        const node = (s: string) => <span>{s}</span>;
        const got = await withMounted(
          <ul>
            <AppListItem
              icon={c.icon ? <i data-testid="ic" /> : undefined}
              textLabel={c.label === 'node' ? node('NodeLabel') : c.label}
              textDescription={c.description === 'node' ? node('NodeDesc') : c.description}
              textContent={c.content}
              labelSuffix={c.suffix ? <b>SFX</b> : undefined}
              tooltip={c.tooltip}
            >
              <em>kid</em>
            </AppListItem>
          </ul>,
          el => ({
            icon: !!el.querySelector('[data-testid="ic"]'),
            text: el.textContent,
            tooltipIcon: !!el.querySelector('.MuiListItemText-primary svg'),
          }),
        );
        const label = c.label === 'node' ? 'NodeLabel' : (c.label ?? '');
        const desc = c.description === 'node' ? 'NodeDesc' : (c.description ?? '');
        const want = {
          icon: c.icon,
          text: `${label}${c.suffix ? 'SFX' : ''}${desc}${c.content ?? ''}kid`,
          tooltipIcon: !!c.tooltip,
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-list-item',
    name: "FINDING list-item-mutates-props: rendering leaves the caller's textLabelProps object unchanged, so a shared props object never carries one item's description into another",
    expect: 'violated',
    run: async t => {
      for (const description of ['Desc', <span key="d">NodeDesc</span>]) {
        const shared = {};
        const m = await mount(
          <ul>
            <AppListItem textLabel="A" textDescription={description} textLabelProps={shared} />
            <AppListItem textLabel="B" textLabelProps={shared} />
          </ul>,
        );
        const items = [...m.el.querySelectorAll('li')].map(li => li.textContent);
        t.check(Object.keys(shared).length === 0 && items[1] === 'B', () => `description ${typeof description}: shared props became ${Object.keys(shared)}, item B reads ${show(items[1])}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'components/stack-row',
    name: 'stack row: flex row, items centred, the theme gap (8px) and no child margins by default; caller props override each',
    run: async t => {
      for (const c of product({ direction: [undefined, 'column'], alignItems: [undefined, 'flex-start'], gap: [undefined, 2] })) {
        const got = await withMounted(
          <StackRow data-testid="s" {...defined({ direction: c.direction, alignItems: c.alignItems, gap: c.gap })}>
            <span>a</span>
            <span>b</span>
          </StackRow>,
          el => {
            const s = el.querySelector('[data-testid="s"]') as HTMLElement;
            const cs = getComputedStyle(s);
            return { dir: cs.flexDirection, align: cs.alignItems, gap: cs.columnGap, margin: getComputedStyle(s.children[1]).marginLeft };
          },
        );
        const want = { dir: c.direction ?? 'row', align: c.alignItems ?? 'center', gap: c.gap ? '16px' : '8px', margin: '0px' };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/stack-column',
    name: 'stack column: flex column, the theme gap (8px) and no child margins by default; caller props override each',
    run: async t => {
      for (const c of product({ direction: [undefined, 'row'], gap: [undefined, 2] })) {
        const got = await withMounted(
          <StackColumn data-testid="s" {...defined({ direction: c.direction, gap: c.gap })}>
            <span>a</span>
            <span>b</span>
          </StackColumn>,
          el => {
            const s = el.querySelector('[data-testid="s"]') as HTMLElement;
            const cs = getComputedStyle(s);
            return { dir: cs.flexDirection, gap: cs.rowGap, margin: getComputedStyle(s.children[1]).marginTop };
          },
        );
        const want = { dir: c.direction ?? 'column', gap: c.gap ? '16px' : '8px', margin: '0px' };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
];
