# Design Document: Partner CSS Design System

## Overview

This design document describes the architecture and implementation of a shared CSS design system for partner applications. The system extracts design tokens from the existing MUI theme configuration (`src/theme/`) and exposes them as CSS custom properties, along with framework-agnostic component styles that partners can integrate into any frontend stack.

The design follows a token-first approach where all visual values are defined as CSS custom properties, and component styles reference only these tokens. This enables partners to customize the theme by overriding CSS variables without modifying the source files.

## Architecture

```
partners/
├── index.css                 # Entry point - imports all files
├── root.css                  # Base styles and CSS reset
├── tokens/
│   ├── colors.css            # Color palette tokens
│   ├── typography.css        # Typography scale tokens
│   ├── spacing.css           # Spacing scale tokens
│   └── shadows.css           # Elevation/shadow tokens
├── components/
│   ├── button.css            # Button component styles
│   ├── input.css             # Input component styles
│   ├── chip.css              # Chip component styles
│   ├── alert.css             # Alert component styles
│   └── tooltip.css           # Tooltip component styles
├── utilities/
│   ├── typography.css        # Typography utility classes
│   └── spacing.css           # Spacing utility classes
└── _variables.css            # Template for partner overrides
```

### Design Principles

1. **Token-First**: All visual values are CSS custom properties
2. **No Hardcoded Values**: Component styles reference only tokens
3. **BEM Naming**: `.zid-{component}--{modifier}` pattern
4. **Logical Properties**: Use `inline-start/end` for RTL support
5. **No !important**: Specificity managed through class structure
6. **Framework Agnostic**: Pure CSS, no JavaScript dependencies

## Components and Interfaces

### Token Naming Convention

All CSS custom properties follow this pattern:
```
--zid-{category}-{name}[-{variant}]
```

Examples:
- `--zid-color-primary-main`
- `--zid-spacing-2`
- `--zid-shadow-1`
- `--zid-font-size-body1`

### Component Class Naming Convention

All component classes follow BEM-style naming:
```
.zid-{component}                    # Base component
.zid-{component}--{variant}         # Variant modifier
.zid-{component}--{size}            # Size modifier
.zid-{component}--{color}           # Color modifier
.zid-{component}__element           # Child element
```

Examples:
- `.zid-button`
- `.zid-button--contained`
- `.zid-button--large`
- `.zid-button--primary`
- `.zid-alert__icon`

## Data Models

### Color Token Structure

Based on `src/theme/colors.ts`, the color tokens are organized by palette:

```css
/* Primary palette (purple) */
--zid-color-primary-50 through --zid-color-primary-1000

/* Secondary palette */
--zid-color-secondary-50 through --zid-color-secondary-1000

/* Neutrals palette */
--zid-color-neutrals-50 through --zid-color-neutrals-1000

/* Semantic colors */
--zid-color-green-50 through --zid-color-green-1000
--zid-color-blue-50 through --zid-color-blue-1000
--zid-color-yellow-50 through --zid-color-yellow-1000
--zid-color-orange-50 through --zid-color-orange-1000
--zid-color-red-50 through --zid-color-red-1000

/* Base colors */
--zid-color-base-white
--zid-color-base-black
--zid-color-base-neutral
--zid-color-base-silver
```

### Spacing Token Structure

Based on MUI's 8px grid with 4px base unit:

```css
--zid-spacing-0: 0;
--zid-spacing-0-5: 2px;    /* 0.5 * 4px */
--zid-spacing-1: 4px;      /* 1 * 4px */
--zid-spacing-1-5: 6px;    /* 1.5 * 4px */
--zid-spacing-2: 8px;      /* 2 * 4px */
--zid-spacing-2-5: 10px;   /* 2.5 * 4px */
--zid-spacing-3: 12px;     /* 3 * 4px */
--zid-spacing-4: 16px;     /* 4 * 4px */
--zid-spacing-5: 20px;     /* 5 * 4px */
--zid-spacing-6: 24px;     /* 6 * 4px */
--zid-spacing-8: 32px;     /* 8 * 4px */
--zid-spacing-10: 40px;    /* 10 * 4px */
--zid-spacing-12: 48px;    /* 12 * 4px */
--zid-spacing-16: 64px;    /* 16 * 4px */
```

### Typography Token Structure

Based on `src/theme/typography.ts`:

```css
/* Font family */
--zid-font-family: 'IBM Plex Sans Arabic', -apple-system, Helvetica, Arial, sans-serif;

/* Font weights */
--zid-font-weight-regular: 400;
--zid-font-weight-medium: 500;

/* Typography variants */
--zid-font-size-h1: 6rem;
--zid-font-size-h2: 3.75rem;
--zid-font-size-h3: 3rem;
--zid-font-size-h4: 2.125rem;
--zid-font-size-h5: 1.5rem;
--zid-font-size-h6: 1.25rem;
--zid-font-size-body1: 1rem;
--zid-font-size-body2: 0.875rem;
--zid-font-size-caption: 0.75rem;
--zid-font-size-overline: 0.75rem;

/* Letter spacing */
--zid-letter-spacing-h1: -1.5px;
--zid-letter-spacing-h2: -0.5px;
--zid-letter-spacing-h4: 0.25px;
--zid-letter-spacing-h6: 0.15px;
--zid-letter-spacing-body1: 0.15px;
--zid-letter-spacing-body2: 0.17px;
--zid-letter-spacing-caption: 0.4px;
--zid-letter-spacing-overline: 1px;
```

### Shadow Token Structure

Based on `src/theme/shadows.ts`:

```css
--zid-shadow-0: none;
--zid-shadow-1: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
--zid-shadow-2: 0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 1px 3px 0px rgba(16, 24, 40, 0.05);
--zid-shadow-3: 0px 2px 4px -2px rgba(16, 24, 40, 0.05), 0px 4px 8px -2px rgba(16, 24, 40, 0.10);
--zid-shadow-4: 0px 2px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08);
```

### Border Radius Token Structure

Based on `src/theme/theme.ts`:

```css
--zid-radius-sm: 4px;
--zid-radius-md: 8px;
--zid-radius-lg: 12px;
--zid-radius-full: 9999px;  /* For pill-shaped buttons */
```

## Component Specifications

### Button Component

The button component supports multiple variants, sizes, and colors based on `src/theme/components/button.ts`.

**Base Structure:**
```css
.zid-button {
  font-family: var(--zid-font-family);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--zid-radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s, border-color 0.2s;
}
```

**Size Variants:**
- `.zid-button--small`: height 32px, padding 4px 16px, font-size 12px
- `.zid-button--medium`: height 40px, padding 7px 16px, font-size 14px
- `.zid-button--large`: height 48px, padding 10px 16px, font-size 16px

**Color Variants:**
- `.zid-button--primary`: Purple filled button
- `.zid-button--secondary`: Transparent with border
- `.zid-button--error`: Red/error styling

**Variant Modifiers:**
- `.zid-button--contained`: Filled background
- `.zid-button--outlined`: Transparent with border
- `.zid-button--text`: No background or border

### Input Component

**Base Structure:**
```css
.zid-input {
  font-family: var(--zid-font-family);
  font-size: var(--zid-font-size-body2);
  border: 1px solid var(--zid-color-input-border);
  border-radius: var(--zid-radius-md);
  padding: var(--zid-spacing-2) var(--zid-spacing-3);
  background-color: var(--zid-color-base-white);
  transition: border-color 0.2s;
}
```

**States:**
- `:hover`: Border color changes to hover state
- `:focus`: Border color changes to primary, focus ring appears
- `.zid-input--error`: Red border color
- `.zid-input--disabled`: Reduced opacity, no pointer events

### Alert Component

Based on `src/theme/components/alert.ts`:

**Base Structure:**
```css
.zid-alert {
  display: flex;
  align-items: flex-start;
  padding: var(--zid-spacing-3);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--zid-radius-lg);
}
```

**Severity Variants:**
- `.zid-alert--error`: Red background (#FFF3F4), red border (#FDC9D0)
- `.zid-alert--warning`: Yellow background (#FEFDF5), yellow border (#FAEBA4)
- `.zid-alert--info`: Blue background (#F4FCFC), blue border (#B5EFEF)
- `.zid-alert--success`: Green background (#F7FDF7), green border (#CAF4C8)

### Chip Component

**Base Structure:**
```css
.zid-chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--zid-font-family);
  font-size: 0.75rem;
  line-height: 1.125rem;
  border-radius: var(--zid-radius-full);
  min-width: var(--zid-spacing-15);
}
```

**Size Variants:**
- `.zid-chip--small`: Smaller padding
- `.zid-chip--medium`: Standard padding

### Tooltip Component

Based on `src/theme/components/tooltip.ts`:

**Base Structure:**
```css
.zid-tooltip {
  background-color: var(--zid-color-neutrals-1000);
  color: var(--zid-color-base-white);
  padding-block: var(--zid-spacing-2);
  padding-inline: var(--zid-spacing-3);
  border-radius: var(--zid-radius-sm);
  font-size: var(--zid-font-size-caption);
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Token Completeness

*For any* color, typography, or shadow value defined in the source TypeScript theme files (`colors.ts`, `typography.ts`, `shadows.ts`), there SHALL exist a corresponding CSS custom property in the generated token CSS files with the correct value.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Token Prefix Consistency

*For any* CSS custom property defined in the token files, the property name SHALL begin with the `--zid-` prefix.

**Validates: Requirements 1.6**

### Property 3: Spacing Formula Correctness

*For any* spacing token `--zid-spacing-N` where N is a numeric value, the token value SHALL equal `N * 4` pixels (following the 8px grid system).

**Validates: Requirements 1.4**

### Property 4: Component Token-Only Values

*For any* CSS property value in component style files (button.css, input.css, chip.css, alert.css, tooltip.css) that represents a color, spacing, font-size, shadow, or border-radius, the value SHALL be a CSS variable reference (`var(--zid-*)`) rather than a hardcoded value.

**Validates: Requirements 3.7**

### Property 5: Class Prefix Consistency

*For any* CSS class selector defined in the partner CSS files, the class name SHALL begin with the `zid-` prefix.

**Validates: Requirements 10.1**

### Property 6: BEM Modifier Syntax

*For any* CSS class that represents a variant, size, color, or state modifier, the class name SHALL use double-dash BEM syntax (e.g., `.zid-button--contained`, `.zid-input--error`).

**Validates: Requirements 10.2**

### Property 7: Selector Depth Limit

*For any* CSS selector in the partner CSS files, the selector depth SHALL NOT exceed 2 levels of descendant/child combinators.

**Validates: Requirements 10.3**

### Property 8: No Important Declarations

*For any* CSS rule in the partner CSS files, the rule SHALL NOT contain an `!important` declaration.

**Validates: Requirements 10.4**

### Property 9: Typography Utility Completeness

*For any* typography variant defined in the MUI theme (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `overline`), there SHALL exist a corresponding utility class `.zid-typography-{variant}` with the correct font-weight, letter-spacing, and font-size values from the theme.

**Validates: Requirements 8.1, 8.2**

### Property 10: Spacing Utility Completeness

*For any* spacing scale value N in the spacing token system, there SHALL exist margin utilities (`.zid-m-{N}`, `.zid-mt-{N}`, `.zid-mr-{N}`, `.zid-mb-{N}`, `.zid-ml-{N}`, `.zid-mx-{N}`, `.zid-my-{N}`) and padding utilities (`.zid-p-{N}`, `.zid-pt-{N}`, `.zid-pr-{N}`, `.zid-pb-{N}`, `.zid-pl-{N}`, `.zid-px-{N}`, `.zid-py-{N}`) that reference the corresponding spacing token.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 11: Logical Properties Usage

*For any* CSS property in component or utility files that affects horizontal layout (margin, padding, border, positioning), the property SHALL use CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, etc.) instead of physical properties (`margin-left`, `padding-right`, `left`, etc.).

**Validates: Requirements 12.1, 12.3**

## Error Handling

### Invalid Token References

If a component style references a token that doesn't exist, the CSS will use the fallback value or inherit from the parent. All token references should include fallback values where critical:

```css
/* Good: includes fallback */
color: var(--zid-color-primary-main, #AE72FF);

/* Acceptable for non-critical properties */
padding: var(--zid-spacing-2);
```

### Missing Files

The `index.css` entry point uses `@import` statements. If a file is missing, the browser will log a warning but continue loading other styles. The build process should validate all imports exist.

### Browser Compatibility

The CSS system targets modern browsers that support:
- CSS Custom Properties (CSS Variables)
- CSS Logical Properties
- `:focus-visible` pseudo-class

For older browser support, partners can use PostCSS plugins to transform logical properties and provide fallbacks.

## Testing Strategy

### Dual Testing Approach

The CSS design system will be validated using both unit tests and property-based tests:

1. **Unit Tests**: Verify specific examples, file existence, and edge cases
2. **Property Tests**: Verify universal properties across all tokens and components

### Property-Based Testing Configuration

- **Library**: fast-check (JavaScript property-based testing library)
- **Minimum iterations**: 100 per property test
- **Tag format**: `Feature: partner-css-design-system, Property {number}: {property_text}`

### Test Categories

#### Token Tests
- Verify all source theme values are present in CSS output
- Verify token naming follows conventions
- Verify spacing formula correctness

#### Component Tests
- Verify all required classes exist
- Verify no hardcoded values in component styles
- Verify BEM naming conventions

#### Architecture Tests
- Verify class prefix consistency
- Verify selector depth limits
- Verify no `!important` declarations
- Verify logical properties usage

### Test Implementation Notes

Since this is a CSS-only system, tests will:
1. Parse the generated CSS files using a CSS parser (e.g., `css-tree` or `postcss`)
2. Extract selectors, properties, and values
3. Validate against the correctness properties

Example test structure:
```typescript
// Property 2: Token Prefix Consistency
test.prop(
  'all CSS custom properties start with --zid-',
  [fc.constantFrom(...allCssCustomProperties)],
  (property) => {
    expect(property.startsWith('--zid-')).toBe(true);
  }
);
```
