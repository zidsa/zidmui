// formal-data-display: properties of the data-display components, checked against the real
// src/components modules under React 19 and MUI in Chromium, over every value of each finite
// prop domain. Run: .agents/skills/verify-zidmui/scripts/formal.sh data-display [--mutants]
import { act } from 'react';

import { AppAccordion } from '../../../src/components/app-accordion';
import { AppCard } from '../../../src/components/app-card';
import { AppEmptyState } from '../../../src/components/app-empty-state';
import { AppIconBox } from '../../../src/components/app-icon-box';
import { AppIconWithTooltip } from '../../../src/components/app-icon-with-tooltip';
import { AppOverflownTextWithTooltip } from '../../../src/components/app-overflown-text-with-tooltip';
import { AppStatus } from '../../../src/components/app-status';
import { AppTypography } from '../../../src/components/app-typography';
import { IconInformationLine } from '../../../src/icons/system/information-line';
import { mount, product, settle, show, withMounted, type Property } from '../verify-zidmui/formal/lib';

const THEMES = ['light', 'dark'] as const;
const COLORS = ['primary', 'success', 'error', 'warning', 'info', 'neutral'] as const;

// Hover the way a pointer does: React's onMouseEnter and MUI's Tooltip both listen to mouseover.
const hover = async (el: Element) => {
  await act(async () => {
    el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }));
  });
  await settle(650); // AppTooltip enterDelay is 500 ms
};
const tooltipText = () => document.querySelector('[role="tooltip"]')?.textContent ?? null;

export const properties: Property[] = [
  {
    module: 'components/app-accordion',
    name: 'controlled accordion: aria-expanded equals isOpen, the summary button is disabled iff disable, the children are in the DOM iff (open or unmountOnExit=false) and details are not loading, and the expand icon is hidden iff the summary loads',
    run: async t => {
      for (const c of product({
        isOpen: [true, false],
        disable: [true, false],
        unmountOnExit: [true, false],
        isSummaryLoading: [true, false],
        isDetailsLoading: [true, false],
        color: COLORS,
        theme: THEMES,
      })) {
        const got = await withMounted(
          <AppAccordion
            title="T"
            isOpen={c.isOpen}
            disable={c.disable}
            unmountOnExit={c.unmountOnExit}
            isSummaryLoading={c.isSummaryLoading}
            isDetailsLoading={c.isDetailsLoading}
            color={c.color}
          >
            <span data-testid="body">BODY</span>
          </AppAccordion>,
          el => {
            const summary = el.querySelector('[aria-expanded]');
            return {
              expanded: summary?.getAttribute('aria-expanded'),
              disabled: (summary as HTMLButtonElement | null)?.disabled === true,
              body: !!el.querySelector('[data-testid="body"]'),
              icon: !!el.querySelector('.MuiAccordionSummary-expandIconWrapper svg'),
              color: el.querySelector('[data-color]')?.getAttribute('data-color'),
            };
          },
          { theme: c.theme },
        );
        const want = {
          expanded: String(c.isOpen),
          disabled: c.disable,
          body: (c.isOpen || !c.unmountOnExit) && !c.isDetailsLoading,
          icon: !c.isSummaryLoading,
          color: c.color,
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-accordion',
    name: 'uncontrolled accordion: clicking the summary flips aria-expanded and calls onToggle with the new state, unless disabled',
    run: async t => {
      for (const c of product({ disable: [false, true], clicks: [1, 2, 3] })) {
        const calls: boolean[] = [];
        const m = await mount(
          <AppAccordion title="T" disable={c.disable} onToggle={(_e, x) => calls.push(x)}>
            body
          </AppAccordion>,
        );
        const summary = m.el.querySelector('[aria-expanded]') as HTMLElement;
        for (let i = 0; i < c.clicks; i++) await act(async () => summary.click());
        const open = c.disable ? false : c.clicks % 2 === 1;
        const wantCalls = c.disable ? [] : Array.from({ length: c.clicks }, (_v, i) => i % 2 === 0);
        const got = { expanded: summary.getAttribute('aria-expanded'), calls };
        const want = { expanded: String(open), calls: wantCalls };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-card',
    name: 'card actions render iff at least one non-null action is given and the card is not loading; title and description render iff given',
    run: async t => {
      const ACTIONS = {
        none: undefined,
        null: null,
        empty: [],
        allNull: [null, null],
        one: <button key="a">A</button>,
        two: [<button key="a">A</button>, <button key="b">B</button>],
        mixed: [null, <button key="b">B</button>],
      } as const;
      for (const c of product({
        actions: Object.keys(ACTIONS) as (keyof typeof ACTIONS)[],
        loading: [false, true],
        title: [undefined, 'Title'],
        description: [undefined, 'Desc'],
        color: COLORS,
      })) {
        const got = await withMounted(
          <AppCard
            actions={ACTIONS[c.actions] as never}
            loading={c.loading}
            title={c.title}
            description={c.description}
            color={c.color}
          >
            content
          </AppCard>,
          el => ({
            buttons: el.querySelectorAll('button').length,
            title: el.textContent?.includes('Title') ?? false,
            description: el.textContent?.includes('Desc') ?? false,
            content: el.textContent?.includes('content') ?? false,
          }),
        );
        const n = { none: 0, null: 0, empty: 0, allNull: 0, one: 1, two: 2, mixed: 1 }[c.actions];
        const want = { buttons: c.loading ? 0 : n, title: !!c.title, description: !!c.description, content: true };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-empty-state',
    name: 'empty state: title is h4 at size standard and h6 at size small, an icon gets the error colour only for variant error, an image wins over an icon, and each text renders iff given',
    run: async t => {
      for (const c of product({
        size: ['standard', 'small', undefined],
        variant: ['default', 'error', 'warning', 'success', undefined],
        icon: [false, true],
        image: [false, true],
        title: [undefined, 'Nothing here'],
        description: [undefined, 'Add one'],
        theme: THEMES,
      })) {
        const got = await withMounted(
          <AppEmptyState
            size={c.size as never}
            variant={c.variant as never}
            icon={c.icon ? <IconInformationLine data-testid="icon" /> : undefined}
            imageUrl={c.image ? 'data:image/gif;base64,R0lGODlhAQABAAAAACw=' : undefined}
            title={c.title}
            description={c.description}
          />,
          el => {
            const icon = el.querySelector('[data-testid="icon"]');
            return {
              titleVariant: c.title
                ? [...(el.querySelector('h4,h6')?.classList ?? [])].find(x => /^MuiTypography-h\d$/.test(x)) ?? null
                : null,
              image: !!el.querySelector('img'),
              icon: !!icon,
              iconError: icon?.classList.contains('MuiSvgIcon-colorError') ?? false,
              description: el.textContent?.includes('Add one') ?? false,
            };
          },
          { theme: c.theme },
        );
        const size = c.size ?? 'small';
        const want = {
          titleVariant: c.title ? (size === 'standard' ? 'MuiTypography-h4' : 'MuiTypography-h6') : null,
          image: c.image,
          icon: !c.image && c.icon,
          iconError: !c.image && c.icon && c.variant === 'error',
          description: !!c.description,
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-icon-box',
    name: 'icon box: size large/medium/small renders 48/40/24 px square (default large), and every background differs from the default background except default itself',
    run: async t => {
      const BGS = ['default', 'primary', 'blue', 'red', 'green', 'yellow', 'orange', 'secondary', 'white'] as const;
      for (const theme of THEMES) {
        const bg: Record<string, string> = {};
        for (const c of product({ size: ['large', 'medium', 'small', undefined], background: [...BGS, undefined] })) {
          const got = await withMounted(
            <AppIconBox size={c.size as never} background={c.background as never} data-testid="box">
              <IconInformationLine />
            </AppIconBox>,
            el => {
              const box = el.querySelector('[data-testid="box"]') as HTMLElement;
              const cs = getComputedStyle(box);
              return { w: cs.width, h: cs.height, bg: cs.backgroundColor };
            },
            { theme },
          );
          const px = { large: '48px', medium: '40px', small: '24px' }[c.size ?? 'large'];
          t.check(got.w === px && got.h === px, () => `${theme} ${show(c)}: ${got.w}x${got.h}, want ${px}`);
          bg[c.background ?? 'default'] = got.bg;
        }
        for (const b of BGS)
          if (b !== 'default')
            t.check(bg[b] !== bg.default, () => `${theme}: background ${b} renders the default colour ${bg.default}`);
      }
    },
  },
  {
    module: 'components/app-icon-with-tooltip',
    name: 'icon with tooltip renders nothing without a tooltip, and with one shows exactly that text on hover',
    run: async t => {
      for (const tooltip of [undefined, '', 'Help text', 'نص المساعدة']) {
        const m = await mount(<AppIconWithTooltip tooltip={tooltip} />);
        const empty = m.el.innerHTML === '';
        if (!tooltip) t.check(empty, () => `tooltip=${show(tooltip)} rendered ${m.el.innerHTML.slice(0, 80)}`);
        else {
          await hover(m.el.firstElementChild!);
          t.check(tooltipText() === tooltip, () => `tooltip=${show(tooltip)}: hover shows ${show(tooltipText())}`);
        }
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-overflown-text-with-tooltip',
    name: 'overflown text shows its full title as a tooltip on hover iff the text is clipped (one line or two lines)',
    run: async t => {
      const SHORT = 'Short';
      const LONG = 'A very long product name that cannot fit in a narrow column of the table '.repeat(3);
      for (const c of product({ text: [SHORT, LONG], twoLines: [false, true] })) {
        const m = await mount(
          <div style={{ width: 160 }}>
            <AppOverflownTextWithTooltip title={c.text} twoLines={c.twoLines} />
          </div>,
        );
        await hover(m.el.querySelector('[data-two-lines]')!);
        const shown = tooltipText();
        const want = c.text === LONG ? c.text : null;
        t.check(shown === want, () => `${show({ long: c.text === LONG, twoLines: c.twoLines })}: tooltip ${show(shown?.slice(0, 30))}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-status',
    name: 'status chip: default colour neutral and size small, the chip text is the label, and a tooltip wraps it iff given',
    run: async t => {
      for (const c of product({ color: [...COLORS, undefined], size: ['small', 'medium', undefined], tooltip: [undefined, 'Why'] })) {
        const m = await mount(<AppStatus label="Paid" color={c.color as never} size={c.size as never} tooltip={c.tooltip} />);
        const chip = m.el.querySelector('.MuiChip-root')!;
        const cls = [...chip.classList];
        const want = { color: c.color ?? 'neutral', size: c.size ?? 'small' };
        const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
        t.check(
          cls.includes(`MuiChip-color${cap(want.color)}`) && cls.includes(`MuiChip-size${cap(want.size)}`) && chip.textContent === 'Paid',
          () => `${show(c)}: classes ${cls.join(' ')}`,
        );
        if (c.tooltip) {
          await hover(chip);
          t.check(tooltipText() === c.tooltip, () => `${show(c)}: hover shows ${show(tooltipText())}`);
        }
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-typography',
    name: 'typography: default variant body1, any variant maps to its MUI class, and the tooltip shows on hover iff given',
    run: async t => {
      const VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'subtitle1', 'subtitle2', undefined] as const;
      for (const c of product({ variant: VARIANTS, tooltip: [undefined, null, 'Tip'] })) {
        const m = await mount(
          <AppTypography variant={c.variant as never} tooltip={c.tooltip}>
            مرحبا
          </AppTypography>,
        );
        const el = m.el.querySelector('.MuiTypography-root')!;
        t.check(el.classList.contains(`MuiTypography-${c.variant ?? 'body1'}`), () => `${show(c)}: classes ${el.className}`);
        if (c.tooltip) {
          await hover(el);
          t.check(tooltipText() === 'Tip', () => `${show(c)}: hover shows ${show(tooltipText())}`);
        }
        await m.unmount();
      }
    },
  },
];
