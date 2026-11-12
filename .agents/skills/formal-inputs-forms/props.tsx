// formal-inputs-forms: properties of the input and form components, checked against the real
// src/components modules under React 19 and MUI in Chromium, over every value of each finite prop
// domain. Run: .agents/skills/verify-zidmui/scripts/formal.sh inputs-forms [--mutants]
// Three properties carry expect: 'violated': they are recorded FINDINGs (see SKILL.md). The run fails if
// any starts to hold, so the fix that makes it hold must flip the record in the same PR.
import { act, useState } from 'react';

import { AppButton } from '../../../src/components/app-button';
import { AppCheckbox } from '../../../src/components/app-checkbox';
import { AppIconButton } from '../../../src/components/app-icon-button';
import { AppInputAdornmentText } from '../../../src/components/app-input-adornment-text';
import { AppInputBase } from '../../../src/components/app-input-base';
import { AppInputBaseSearch } from '../../../src/components/app-input-base-search';
import { AppInputRadio } from '../../../src/components/app-input-radio';
import { AppInputRadioCard } from '../../../src/components/app-input-radio-card';
import { AppRadioGroup } from '../../../src/components/app-radio-group';
import { AppSwitch } from '../../../src/components/app-switch';
import { AppSwitchGroup } from '../../../src/components/app-switch-group';
import { click, mount, product, settle, show, withMounted, type Property } from '../verify-zidmui/formal/lib';

const type = async (input: HTMLInputElement, text: string) => {
  const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
  await act(async () => {
    set.call(input, text);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
};
const tooltipText = () => document.querySelector('[role="tooltip"]')?.textContent ?? null;
const hoverOut = async (el: Element, ms: number) => {
  await act(async () => el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body })));
  await settle(ms);
  const text = tooltipText();
  await act(async () => el.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body })));
  await settle(900); // MUI tooltip hysteresis, see formal-feedback-overlays
  return text;
};
const helper = (el: Element) => el.querySelector('.MuiFormHelperText-root')?.textContent ?? null;

const TRANSFORMS = {
  none: undefined,
  upper: (s: string) => s.toUpperCase(),
  digits: (s: string) => s.replace(/\D/g, ''),
} as const;

export const properties: Property[] = [
  {
    module: 'components/app-button',
    name: 'button: colour resolves to the given colour, else secondary for outlined/text and primary for contained (the default variant); children then content render; a tooltip shows on hover iff given; disabled blocks onClick',
    run: async t => {
      for (const c of product({
        variant: ['contained', 'outlined', 'text', undefined],
        color: [undefined, 'primary', 'secondary', 'error'],
        disabled: [false, true],
        tooltip: [undefined, 'Why'],
      })) {
        let clicks = 0;
        const m = await mount(
          <AppButton variant={c.variant as never} color={c.color as never} disabled={c.disabled} tooltip={c.tooltip} content="-C" onClick={() => clicks++}>
            Save
          </AppButton>,
        );
        const btn = m.el.querySelector('button')!;
        const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
        const v = c.variant ?? 'contained';
        const col = c.color ?? (v === 'contained' ? 'primary' : 'secondary');
        await click(btn);
        const got = { cls: btn.classList.contains(`MuiButton-${v}${cap(col)}`), text: btn.textContent, clicks };
        const want = { cls: true, text: 'Save-C', clicks: c.disabled ? 0 : 1 };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)} (${btn.className}), want ${show(want)}`);
        if (c.tooltip && !c.disabled) {
          const tip = await hoverOut(btn, 700);
          t.check(tip === c.tooltip, () => `${show(c)}: tooltip ${show(tip)}`);
        }
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-icon-button',
    name: 'icon button: defaults to colour secondary and size small, hideBorder removes the border, a tooltip shows on hover iff given',
    run: async t => {
      for (const c of product({
        color: [undefined, 'primary', 'error'],
        size: [undefined, 'small', 'medium', 'large'],
        hideBorder: [false, true],
        tooltip: [undefined, null, 'Edit'],
      })) {
        const m = await mount(
          <AppIconButton color={c.color as never} size={c.size as never} hideBorder={c.hideBorder} tooltip={c.tooltip} aria-label="edit">
            <span>i</span>
          </AppIconButton>,
        );
        const btn = m.el.querySelector('button')!;
        const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
        const got = {
          color: btn.classList.contains(`MuiIconButton-color${cap(c.color ?? 'secondary')}`),
          size: btn.classList.contains(`MuiIconButton-size${cap(c.size ?? 'small')}`),
          borderNone: getComputedStyle(btn).borderStyle === 'none',
        };
        t.check(got.color && got.size && (!c.hideBorder || got.borderNone), () => `${show(c)}: ${show(got)} ${btn.className}`);
        if (c.tooltip) {
          const tip = await hoverOut(btn, 700);
          t.check(tip === c.tooltip, () => `${show(c)}: tooltip ${show(tip)}`);
        }
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-checkbox',
    name: 'checkbox: checked mirrors the prop; a click calls onChange with the flipped value unless disabled; the label renders',
    run: async t => {
      for (const c of product({ checked: [false, true], disabled: [false, true], label: ['', 'Agree'] })) {
        const seen: boolean[] = [];
        const m = await mount(<AppCheckbox checked={c.checked} disabled={c.disabled} label={c.label} name="a" onChange={(_e, v) => seen.push(v)} />);
        const input = m.el.querySelector('input[type="checkbox"]') as HTMLInputElement;
        await click(input);
        const got = { checked: input.checked, disabled: input.disabled, seen, label: m.el.textContent };
        const want = { checked: c.checked, disabled: c.disabled, seen: c.disabled ? [] : [!c.checked], label: c.label };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
        await m.unmount();
      }
    },
  },
  {
    module: 'components/app-input-base',
    name: 'input: the field shows transformText(typed) and onChange sees the transformed value, for every transform and input (Arabic-Indic digits included)',
    run: async t => {
      for (const c of product({ transform: Object.keys(TRANSFORMS) as (keyof typeof TRANSFORMS)[], text: ['', 'abc', 'A1b2', '١٢٣', '12 34'] })) {
        const seen: string[] = [];
        const f = TRANSFORMS[c.transform];
        const Controlled = () => {
          const [v, setV] = useState('');
          return <AppInputBase name="x" value={v} transformText={f} onChange={e => (seen.push(e.target.value), setV(e.target.value))} />;
        };
        const got = await withMounted(<Controlled />, async el => {
          const input = el.querySelector('input')!;
          await type(input, c.text);
          return { value: input.value, seen };
        });
        const want = { value: f ? f(c.text) : c.text, seen: [f ? f(c.text) : c.text] };
        // An empty write to an empty field fires no change event.
        if (c.text === '') want.seen = [];
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-input-base',
    name: 'input: the label suffix renders after the label, adornment elements win over adornment text, and both positions are independent',
    run: async t => {
      for (const c of product({
        label: [undefined, 'Price'],
        suffix: [undefined, '*'],
        startEl: [false, true],
        startText: [undefined, 'SAR'],
        endEl: [false, true],
        endText: [undefined, '%'],
      })) {
        const got = await withMounted(
          <AppInputBase
            name="p"
            label={c.label}
            labelSuffix={c.suffix}
            startAdornment={c.startEl ? <b>S</b> : undefined}
            startAdornmentText={c.startText}
            endAdornment={c.endEl ? <b>E</b> : undefined}
            endAdornmentText={c.endText}
          />,
          el => ({
            label: el.querySelector('label')?.textContent?.replace(/\s+/g, ' ').trim() ?? null,
            // MUI prefixes a start adornment with a zero-width space (U+200B) for the notched outline.
            start: el.querySelector('.MuiInputAdornment-positionStart')?.textContent?.replace(/\u200b/g, '') ?? null,
            end: el.querySelector('.MuiInputAdornment-positionEnd')?.textContent ?? null,
          }),
        );
        const want = {
          label: c.label ? (c.suffix ? `${c.label} ${c.suffix}` : c.label) : null,
          start: c.startEl ? 'S' : (c.startText ?? null),
          end: c.endEl ? 'E' : (c.endText ?? null),
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-input-base',
    name: 'FINDING number-wheel-guard: with disableWheelNumberChange (default true) a wheel over a focused number input blurs it, whether or not the caller passes slotProps.htmlInput',
    expect: 'violated',
    run: async t => {
      for (const c of product({ htmlInput: [false, true], disable: [undefined, true, false], type: ['number', 'text'] })) {
        const got = await withMounted(
          <AppInputBase name="n" type={c.type} disableWheelNumberChange={c.disable} slotProps={c.htmlInput ? { htmlInput: {} } : undefined} />,
          async el => {
            const input = el.querySelector('input')!;
            await act(async () => input.focus());
            await act(async () => input.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 100 })));
            return document.activeElement === input ? 'focused' : 'blurred';
          },
        );
        const want = c.type === 'number' && c.disable !== false ? 'blurred' : 'focused';
        t.check(got === want, () => `${show(c)}: ${got}, want ${want}`);
      }
    },
  },
  {
    module: 'components/app-input-base-search',
    name: 'search input: the input id is input-<name>, the search icon is the start adornment, and typing reports the value',
    run: async t => {
      for (const name of ['q', 'search', 'products']) {
        const seen: string[] = [];
        const got = await withMounted(<AppInputBaseSearch name={name} onChange={e => seen.push(e.target.value)} />, async el => {
          const input = el.querySelector('input')!;
          await type(input, 'shoe');
          return { id: input.id, icon: !!el.querySelector('.MuiInputAdornment-positionStart svg'), seen };
        });
        const want = { id: `input-${name}`, icon: true, seen: ['shoe'] };
        t.check(show(got) === show(want), () => `${name}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-input-adornment-text',
    name: 'adornment text: position defaults to start, the text renders, hideBackground makes the background transparent',
    run: async t => {
      for (const c of product({ position: [undefined, 'start', 'end'], hide: [false, true] })) {
        const got = await withMounted(
          <AppInputAdornmentText position={c.position as never} hideBackground={c.hide}>
            SAR
          </AppInputAdornmentText>,
          el => {
            const a = el.querySelector('.MuiInputAdornment-root') as HTMLElement;
            const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
            return {
              pos: a.classList.contains(`MuiInputAdornment-position${cap(c.position ?? 'start')}`),
              text: a.textContent?.replace(/\u200b/g, ''), // MUI's U+200B before start adornments
              bg: c.hide ? getComputedStyle(a).backgroundColor === 'rgba(0, 0, 0, 0)' : true,
            };
          },
        );
        t.check(show(got) === show({ pos: true, text: 'SAR', bg: true }), () => `${show(c)}: ${show(got)}`);
      }
    },
  },
  {
    module: 'components/app-input-radio',
    name: 'radio input: one radio per option; a radio is disabled iff the group or its option is; clicking an enabled unchecked option reports its value',
    run: async t => {
      for (const c of product({ group: [undefined, true], second: [undefined, true], row: [false, true], click: [0, 1, 2] })) {
        const seen: string[] = [];
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: c.second },
          { value: 'c', label: 'C' },
        ];
        const got = await withMounted(
          <AppInputRadio name="r" options={options as never} disabled={c.group} row={c.row} onChange={e => seen.push(e.target.value)} />,
          async el => {
            const radios = [...el.querySelectorAll('input[type="radio"]')] as HTMLInputElement[];
            await click(radios[c.click]);
            return { n: radios.length, disabled: radios.map(r => r.disabled), seen };
          },
        );
        const dis = ['a', 'b', 'c'].map(v => !!c.group || (v === 'b' && !!c.second));
        const want = { n: 3, disabled: dis, seen: dis[c.click] ? [] : [['a', 'b', 'c'][c.click]] };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-input-radio',
    name: 'FINDING radio-error-hides-helper: with error set, the helper text still renders (in the error colour)',
    expect: 'violated',
    run: async t => {
      for (const c of product({ error: [false, true], helperText: [undefined, 'Pick one'] })) {
        const got = await withMounted(<AppInputRadio name="r" options={[{ value: 'a', label: 'A' }] as never} error={c.error} helperText={c.helperText} />, el => helper(el) || null);
        t.check(got === (c.helperText ?? null), () => `${show(c)}: helper ${show(got)}`);
      }
    },
  },
  {
    module: 'components/app-input-radio-card',
    name: 'radio card: a string label renders with its suffix, the description and icon render iff given, the spinner iff loading, and a click checks it',
    run: async t => {
      for (const c of product({ suffix: [undefined, 'New'], description: [undefined, 'Fast'], icon: [false, true], isLoading: [false, true] })) {
        const got = await withMounted(
          <AppInputRadioCard value="x" label="Express" labelSuffix={c.suffix} description={c.description} icon={c.icon ? <i data-testid="ic" /> : undefined} isLoading={c.isLoading} />,
          async el => {
            const input = el.querySelector('input[type="radio"]') as HTMLInputElement;
            await click(input);
            return {
              text: el.textContent,
              icon: !!el.querySelector('[data-testid="ic"]'),
              spinner: !!el.querySelector('.MuiCircularProgress-root'),
              checked: input.checked,
            };
          },
        );
        const want = { text: `Express${c.suffix ?? ''}${c.description ?? ''}`, icon: c.icon, spinner: c.isLoading, checked: true };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-radio-group',
    name: 'radio group: the legend renders iff a label is given, the checked radio is the one whose value equals value, disabled disables every option, and a click reports the value',
    run: async t => {
      for (const c of product({ label: [undefined, 'Ship by'], value: [undefined, 'a', 'b'], disabled: [false, true], clickIdx: [0, 1] })) {
        const seen: string[] = [];
        const got = await withMounted(
          <AppRadioGroup
            name="g"
            label={c.label}
            value={c.value}
            disabled={c.disabled}
            options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
            onChange={e => seen.push(e.target.value)}
          />,
          async el => {
            const radios = [...el.querySelectorAll('input[type="radio"]')] as HTMLInputElement[];
            const checked = radios.findIndex(r => r.checked);
            await click(radios[c.clickIdx]);
            return { legend: el.querySelector('legend')?.textContent ?? null, checked, disabled: radios.every(r => r.disabled), seen };
          },
        );
        const v = ['a', 'b'][c.clickIdx];
        const want = {
          legend: c.label ?? null,
          checked: c.value ? ['a', 'b'].indexOf(c.value) : -1,
          disabled: c.disabled,
          seen: c.disabled || c.value === v ? [] : [v],
        };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-switch',
    name: 'switch: a label wraps it in a form label, no label renders the bare switch; name and colour (default primary) reach the input, and a click flips it',
    run: async t => {
      for (const c of product({ label: [undefined, '', 'Notify'], color: [undefined, 'primary', 'error'], checked: [false, true] })) {
        const Ctl = () => {
          const [on, setOn] = useState(c.checked);
          return <AppSwitch name="sw" label={c.label} color={c.color as never} switchProps={{ checked: on, onChange: (_e, v) => setOn(v) }} />;
        };
        const got = await withMounted(<Ctl />, async el => {
          const input = el.querySelector('input')!;
          await click(input);
          const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
          return {
            wrapped: !!el.querySelector('label.MuiFormControlLabel-root'),
            name: input.name,
            color: !!el.querySelector(`.MuiSwitch-color${cap(c.color ?? 'primary')}`),
            checked: input.checked,
          };
        });
        const want = { wrapped: !!c.label, name: 'sw', color: true, checked: !c.checked };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-switch-group',
    name: 'switch group: one switch per option in order, the legend iff label, disabled disables every switch, required reaches every input',
    run: async t => {
      for (const c of product({ n: [0, 1, 3], label: [undefined, 'Channels'], disabled: [false, true], required: [false, true] })) {
        const options = Array.from({ length: c.n }, (_v, i) => ({ name: `s${i}`, label: `S${i}` }));
        const got = await withMounted(
          <AppSwitchGroup options={options} label={c.label} disabled={c.disabled} required={c.required} />,
          el => {
            const inputs = [...el.querySelectorAll('input')] as HTMLInputElement[];
            return {
              names: inputs.map(i => i.name),
              legend: el.querySelector('legend, .MuiFormLabel-root')?.textContent ?? null,
              disabled: inputs.every(i => i.disabled),
              required: inputs.every(i => i.required),
            };
          },
        );
        const want = { names: options.map(o => o.name), legend: c.label ?? null, disabled: c.disabled || c.n === 0, required: c.required || c.n === 0 };
        t.check(show(got) === show(want), () => `${show(c)}: got ${show(got)}, want ${show(want)}`);
      }
    },
  },
  {
    module: 'components/app-switch-group',
    name: 'FINDING switch-group-error-hides-helper: with error set, the helper text still renders (in the error colour)',
    expect: 'violated',
    run: async t => {
      for (const c of product({ error: [false, true], helperText: [undefined, 'Pick at least one'] })) {
        const got = await withMounted(<AppSwitchGroup options={[{ name: 'a', label: 'A' }]} error={c.error} helperText={c.helperText} />, el => helper(el) || null);
        t.check(got === (c.helperText ?? null), () => `${show(c)}: helper ${show(got)}`);
      }
    },
  },
];
