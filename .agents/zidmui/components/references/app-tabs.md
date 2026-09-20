# AppTabs

Tabs built on MUI's `Tabs`/`Tab`, driven either by a declarative `tabs` array or by explicit
`AppTab` children, with per-tab icon and status-chip support. Use it for any tabbed navigation
inside a page.

## Import

```tsx
import { AppTabs, AppTab, formatNumber } from '@zidsa/zidmui/components/app-tabs';
import type { AppTabsProps, AppTabProps } from '@zidsa/zidmui/components/app-tabs';
```

## Props

`AppTabsProps` = `Omit<TabsProps, 'textColor'> & { tabs?: AppTabProps[] }`
`AppTabProps` = `TabProps & { count?: number; icon?: React.ReactNode; chip?: AppStatusProps }`

### AppTabs

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `AppTabProps[]` (each item also needs a `key`) | — | Declarative tab list — each entry is rendered as an `AppTab`. Can be combined with `children`. |
| `children` | `React.ReactNode` | — | Raw `AppTab`/`Tab` elements, rendered after any `tabs` array items. |
| `textColor` | — | `'secondary'` (hardcoded) | **Omitted from the type** — always `'secondary'`, not settable. |
| `variant` | inherited | `'scrollable'` (default, overridable) | |
| `value`, `onChange`, ... | inherited from `TabsProps` | — | Pass through as-is. Indicator is hidden by default (`slotProps.indicator.hidden = true`, overridable via your own `slotProps`). |

### AppTab

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | inherited (`TabProps['label']`) | — | Rendered alongside `icon`/`chip` in a `StackRow`. |
| `icon` | `React.ReactNode` | — | Cloned with `fontSize="small"`, `color="action"` defaults (overridable by the icon element's own existing props, since they're spread after the defaults in the clone). **Shadows** MUI's own differently-typed `TabProps['icon']** — don't mix the two mental models. |
| `chip` | `AppStatusProps` | — | Renders an `AppStatus` next to the label (defaults `color="primary"`, `size="small"`, `sx={{ minWidth: 24 }}`). |
| `count` | `number` | — | Declared in the type but **not read/used** anywhere in the component body — currently has no visible effect. Don't rely on it to show a count badge; use `chip` with a formatted label instead. |
| other `TabProps` (`value`, `disabled`, ...) | inherited | — | Pass through as-is. |

`formatNumber` is also exported — a decimal `Intl.NumberFormat` helper (0-2 fraction digits),
unrelated to the tab components themselves but bundled in the same module.

## Usage examples

```tsx
// Declarative tabs array
<AppTabs
  value={activeTab}
  onChange={(_, newValue) => setActiveTab(newValue)}
  tabs={[
    { key: 'all', label: 'All orders', value: 'all' },
    { key: 'pending', label: 'Pending', value: 'pending', chip: { label: '3' } },
  ]}
/>
```

```tsx
// Using children directly
<AppTabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
  <AppTab label="Overview" value="overview" icon={<IconHomeLine />} />
  <AppTab label="Settings" value="settings" icon={<IconSettingsLine />} />
</AppTabs>
```

## Composition

- `AppTab`'s `chip` prop renders `AppStatus` internally.
- Uses `StackRow` for laying out icon + label + chip inside each tab.

## Anti-patterns

- **Relying on `count` to render a numeric badge.** It's declared in the type but unused in the
  implementation — use `chip={{ label: String(count) }}` instead to actually show a count.
- **Passing `textColor` expecting it to change the active tab's text color.** It's omitted from
  the type and hardcoded to `'secondary'` internally.
- **Mixing up `AppTab`'s `icon` prop with MUI's native `Tab` `icon` typing.** They're not
  compatible — `AppTab`'s `icon` is destructured and handled specially (cloned with
  `fontSize`/`color` defaults) before the rest of `TabProps` is spread onto MUI's `Tab`.
