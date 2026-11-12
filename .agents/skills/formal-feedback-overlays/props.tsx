// formal-feedback-overlays: properties of AppAlert, AppDialog, AppDialogWithFeatures and AppTooltip,
// checked against the real src/components modules under React 19 and MUI in Chromium, over every
// value of each finite prop domain. Run: .agents/skills/verify-zidmui/scripts/formal.sh feedback-overlays
import { act } from 'react';

import { AppAlert, AppAlertButton } from '../../../src/components/app-alert';
import { AppDialog } from '../../../src/components/app-dialog';
import { AppDialogWithFeatures } from '../../../src/components/app-dialog-with-features';
import { AppTooltip } from '../../../src/components/app-tooltip';
import { click, mount, product, settle, show, withMounted, type Property } from '../verify-zidmui/formal/lib';

const SEVERITIES = ['success', 'info', 'warning', 'error'] as const;
const VARIANTS = ['standard', 'outlined', 'filled', undefined] as const;
const dialog = () => document.querySelector('[role="dialog"]');
const tooltip = () => document.querySelector('[role="tooltip"]');
const key = (el: Element, k: string) =>
  act(async () => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
  });

export const properties: Property[] = [
  {
    module: 'components/app-alert',
    name: 'alert: loading shows only a spinner; otherwise title, content, link, actions render iff given, the variant default is standard, and the close button exists iff onClose is set and calls it once per click',
    run: async t => {
      for (const c of product({
        severity: SEVERITIES,
        variant: VARIANTS,
        isLoading: [false, true],
        title: [undefined, 'Heads up'],
        content: [undefined, 'Body text'],
        link: [false, true],
        actions: [false, true],
        closable: [false, true],
      })) {
        let closes = 0;
        const m = await mount(
          <AppAlert
            severity={c.severity}
            variant={c.variant}
            isLoading={c.isLoading}
            title={c.title}
            content={c.content}
            link={c.link ? <a href="#x">More</a> : undefined}
            actions={c.actions ? <AppAlertButton>Fix</AppAlertButton> : undefined}
            onClose={c.closable ? () => closes++ : undefined}
          />,
        );
        const root = m.el.querySelector('.MuiAlert-root')!;
        const text = root.textContent ?? '';
        const close = root.querySelector('button[aria-label="Close"]');
        const got = {
          spinner: !!root.querySelector('.MuiCircularProgress-root'),
          title: text.includes('Heads up'),
          content: text.includes('Body text'),
          link: text.includes('More'),
          action: text.includes('Fix'),
          variant: [...root.classList].some(x => x === `MuiAlert-${c.variant ?? 'standard'}`) ||
            [...root.classList].some(x => x.toLowerCase().includes(`${c.variant ?? 'standard'}${c.severity}`.toLowerCase())),
          close: !!close,
        };
        if (close) await click(close);
        const want = {
          spinner: c.isLoading,
          title: !c.isLoading && !!c.title,
          content: !c.isLoading && !!c.content,
          link: !c.isLoading && c.link,
          action: !c.isLoading && c.actions,
          variant: true,
          close: c.closable,
        };
        t.check(show(got) === show(want) && closes === (c.closable ? 1 : 0), () => `${show(c)}: got ${show(got)} closes=${closes}, want ${show(want)}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-dialog',
    name: 'dialog: in the DOM iff open; the title block renders iff title or description; actions iff given; children always; Escape and backdrop click call onClose with their reason',
    run: async t => {
      for (const c of product({
        open: [false, true],
        title: [undefined, 'Delete product'],
        description: [undefined, 'This cannot be undone'],
        actions: [false, true],
        darkerBackdrop: [false, true],
      })) {
        const reasons: string[] = [];
        const m = await mount(
          <AppDialog
            open={c.open}
            title={c.title}
            description={c.description}
            darkerBackdrop={c.darkerBackdrop}
            actions={c.actions ? <button>Confirm</button> : undefined}
            onClose={(_e, r) => reasons.push(r)}
          >
            <p>child</p>
          </AppDialog>,
        );
        const d = dialog();
        const got = {
          open: !!d,
          titleBlock: !!d?.querySelector('.MuiDialogTitle-root'),
          description: d?.textContent?.includes('This cannot be undone') ?? false,
          actions: !!d?.querySelector('.MuiDialogActions-root'),
          child: d?.textContent?.includes('child') ?? false,
        };
        if (d) {
          await key(d, 'Escape');
          const backdrop = document.querySelector('.MuiBackdrop-root');
          await act(async () => {
            backdrop?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
        }
        const want = {
          open: c.open,
          titleBlock: c.open && !!(c.title || c.description),
          description: c.open && !!c.description,
          actions: c.open && c.actions,
          child: c.open,
        };
        const wantReasons = c.open ? ['escapeKeyDown', 'backdropClick'] : [];
        t.check(
          show(got) === show(want) && show(reasons) === show(wantReasons),
          () => `${show(c)}: got ${show(got)} reasons=${show(reasons)}, want ${show(want)} ${show(wantReasons)}`,
        );
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-dialog-with-features',
    name: 'feature dialog: loading shows only a spinner; otherwise search renders iff search or onSearchChange, typing reports each value, pagination renders iff given and reports the clicked page, children render',
    run: async t => {
      for (const c of product({
        isLoading: [false, true],
        search: [undefined, '', 'shoe'],
        onSearch: [false, true],
        pagination: [undefined, { count: 5, page: 1 }, { count: 5, page: 3 }],
      })) {
        const typed: string[] = [];
        const pages: number[] = [];
        const got = await withMounted(
          <AppDialogWithFeatures
            open
            onClose={() => {}}
            title="Pick"
            isLoading={c.isLoading}
            search={c.search}
            onSearchChange={c.onSearch ? s => typed.push(s) : undefined}
            pagination={c.pagination && { ...c.pagination, onChange: (_e: unknown, p: number) => pages.push(p) }}
          >
            <p>row</p>
          </AppDialogWithFeatures>,
          async () => {
            const d = dialog()!;
            const input = d.querySelector('#input-search') as HTMLInputElement | null;
            if (input) {
              const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
              await act(async () => {
                set.call(input, 'bag');
                input.dispatchEvent(new Event('input', { bubbles: true }));
              });
            }
            const next = d.querySelector('button[aria-label="Go to next page"]');
            if (next) await click(next);
            return {
              spinner: !!d.querySelector('.MuiCircularProgress-root'),
              search: !!input,
              searchValue: input ? input.defaultValue || input.getAttribute('value') || '' : null,
              pagination: !!d.querySelector('nav[aria-label="pagination navigation"]'),
              row: d.textContent?.includes('row') ?? false,
            };
          },
        );
        const showSearch = !c.isLoading && !!(c.search || c.onSearch);
        const want = {
          spinner: c.isLoading,
          search: showSearch,
          searchValue: showSearch ? (c.search ?? '') : null,
          pagination: !c.isLoading && !!c.pagination,
          row: !c.isLoading,
        };
        const wantTyped = showSearch && c.onSearch ? ['bag'] : [];
        const wantPages = !c.isLoading && c.pagination ? [c.pagination.page + 1] : [];
        t.check(
          show(got) === show(want) && show(typed) === show(wantTyped) && show(pages) === show(wantPages),
          () => `${show(c)}: got ${show(got)} typed=${show(typed)} pages=${show(pages)}, want ${show(want)} ${show(wantTyped)} ${show(wantPages)}`,
        );
      }
    },
  },
  {
    module: 'components/app-tooltip',
    name: 'tooltip: hover shows headline, description and content after the 500 ms delay and never before; disable shows nothing',
    run: async t => {
      for (const c of product({
        headline: [undefined, 'Head'],
        description: [undefined, 'Desc'],
        content: [undefined, 'More'],
        disable: [false, true],
      })) {
        const m = await mount(
          <AppTooltip headline={c.headline} description={c.description} content={c.content} disable={c.disable}>
            <button>target</button>
          </AppTooltip>,
        );
        const btn = m.el.querySelector('button')!;
        await act(async () => {
          btn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body }));
        });
        await settle(250);
        const early = !!tooltip();
        await settle(450);
        const text = tooltip()?.textContent ?? null;
        const parts = [c.headline, c.description, c.content].filter(Boolean).join('');
        const want = c.disable ? null : parts;
        t.check(!early && text === want, () => `${show(c)}: early=${early} text=${show(text)}, want ${show(want)}`);
        // Leave the target before unmounting, as a pointer does. MUI keeps a module-level hysteresis flag
        // that only a close clears: unmounting an open tooltip leaves it set, and every later tooltip on
        // the page then opens with no delay. After a close it lapses in 800 ms.
        await act(async () => {
          btn.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body }));
        });
        await settle(900);
        await m.unmount();
      }
    },
  },
];
