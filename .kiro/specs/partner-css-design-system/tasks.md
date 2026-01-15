# Implementation Plan: Partner CSS Design System

## Overview

This implementation plan breaks down the partner CSS design system into discrete coding tasks. Each task builds incrementally on previous work, starting with token extraction, then component styles, utilities, and finally validation. The implementation uses pure CSS with no JavaScript runtime dependencies.

## Tasks

- [-] 1. Set up folder structure and entry point
  - Create `partners/tokens/` directory
  - Create `partners/components/` directory
  - Create `partners/utilities/` directory
  - Create `partners/index.css` entry point with placeholder imports
  - _Requirements: 2.6, 10.5_

- [ ] 2. Implement color tokens
  - [x] 2.1 Create `partners/tokens/colors.css` with all color palette tokens
    - Extract primary palette (50-1000) from `src/theme/colors.ts`
    - Extract secondary palette (50-1000)
    - Extract neutrals palette (50-1000)
    - Extract semantic colors (green, blue, yellow, orange, red)
    - Extract base colors (white, black, neutral, silver)
    - Add semantic aliases for text, background, border colors from `palette.ts`
    - Include documentation comments for each color group
    - _Requirements: 1.1, 1.6, 2.1, 11.2_

  <!-- - [ ] 2.2 Write property test for color token completeness
    - **Property 1: Token Completeness (colors)**
    - **Validates: Requirements 1.1** -->

  <!-- - [ ] 2.3 Write property test for token prefix consistency
    - **Property 2: Token Prefix Consistency**
    - **Validates: Requirements 1.6** -->

- [x] 3. Implement typography tokens
  - [x] 3.1 Create `partners/tokens/typography.css` with typography tokens
    - Define font-family token
    - Define font-weight tokens (regular, medium)
    - Define font-size tokens for all variants (h1-h6, body1, body2, subtitle1, subtitle2, caption, overline)
    - Define letter-spacing tokens for each variant
    - Define line-height tokens
    - Include documentation comments
    - _Requirements: 1.2, 1.6, 2.2, 11.2_

  <!-- - [ ] 3.2 Write property test for typography token completeness
    - **Property 1: Token Completeness (typography)**
    - **Validates: Requirements 1.2** -->

- [x] 4. Implement spacing tokens
  - [x] 4.1 Create `partners/tokens/spacing.css` with spacing scale tokens
    - Define spacing tokens from 0 to 16 (0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16)
    - Follow 8px grid system (spacing-N = N * 4px)
    - Define border-radius tokens (sm, md, lg, full)
    - Include documentation comments
    - _Requirements: 1.4, 1.5, 1.6, 2.3, 11.2_

  <!-- - [ ] 4.2 Write property test for spacing formula correctness
    - **Property 3: Spacing Formula Correctness**
    - **Validates: Requirements 1.4** -->

- [x] 5. Implement shadow tokens
  - [x] 5.1 Create `partners/tokens/shadows.css` with elevation tokens
    - Define shadow tokens 0-4 from `src/theme/shadows.ts`
    - Include documentation comments
    - _Requirements: 1.3, 1.6, 2.4, 11.2_

- [x] 6. Create root.css and update index.css
  - [x] 6.1 Create `partners/root.css` with base styles
    - Import all token files
    - Define `:root` selector with token definitions
    - Add CSS reset/normalize basics (box-sizing, font-family)
    - _Requirements: 2.5_

  - [x] 6.2 Update `partners/index.css` to import all files in correct order
    - Import root.css first
    - Import component files
    - Import utility files
    - _Requirements: 2.6_

- [x] 7. Checkpoint - Verify token structure
  - Ensure all token files are created and properly imported
  - Verify CSS syntax is valid
  - Ask the user if questions arise

- [x] 8. Implement button component
  - [x] 8.1 Create `partners/components/button.css` with button styles
    - Define base `.zid-button` class with common styles
    - Define size modifiers: `--small`, `--medium`, `--large`
    - Define variant modifiers: `--contained`, `--outlined`, `--text`
    - Define color modifiers: `--primary`, `--secondary`, `--error`
    - Define state styles: `:hover`, `:focus-visible`, `:active`, `:disabled`
    - Use only token references, no hardcoded values
    - Use logical properties for RTL support
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 10.1, 10.2, 12.1_

  <!-- - [ ] 8.2 Write property test for button token-only values
    - **Property 4: Component Token-Only Values**
    - **Validates: Requirements 3.7** -->

  <!-- - [ ] 8.3 Write property test for BEM modifier syntax
    - **Property 6: BEM Modifier Syntax**
    - **Validates: Requirements 10.2** -->

- [x] 9. Implement input component
  - [x] 9.1 Create `partners/components/input.css` with input styles
    - Define base `.zid-input` class
    - Define size modifiers: `--small`, `--medium`
    - Define variant modifier: `--outlined`
    - Define state styles: `:hover`, `:focus`, `.zid-input--error`, `.zid-input--disabled`
    - Define adornment elements: `.zid-input__adornment-start`, `.zid-input__adornment-end`
    - Use only token references
    - Use logical properties for RTL support
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.1, 10.2, 12.1_

- [x] 10. Implement chip component
  - [x] 10.1 Create `partners/components/chip.css` with chip styles
    - Define base `.zid-chip` class
    - Define size modifiers: `--small`, `--medium`
    - Define variant modifiers: `--filled`, `--outlined`
    - Define color modifiers: `--default`, `--primary`, `--secondary`, `--error`, `--warning`, `--info`, `--success`
    - Define clickable state: `.zid-chip--clickable` with hover/focus
    - Define delete icon element: `.zid-chip__delete-icon`
    - Use only token references
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.1, 10.2_

- [x] 11. Implement alert component
  - [x] 11.1 Create `partners/components/alert.css` with alert styles
    - Define base `.zid-alert` class
    - Define severity modifiers: `--error`, `--warning`, `--info`, `--success`
    - Define variant modifiers: `--filled`, `--outlined`, `--standard`
    - Define child elements: `.zid-alert__icon`, `.zid-alert__title`, `.zid-alert__message`, `.zid-alert__action`
    - Use colors from palette.ts alert configuration
    - Use only token references
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 10.1, 10.2_

- [x] 12. Implement tooltip component
  - [x] 12.1 Create `partners/components/tooltip.css` with tooltip styles
    - Define base `.zid-tooltip` class with neutrals-1000 background
    - Define arrow element: `.zid-tooltip__arrow`
    - Define placement modifiers: `--top`, `--bottom`, `--left`, `--right`
    - Use spacing tokens for padding
    - Use only token references
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 10.1, 10.2_

- [x] 13. Checkpoint - Verify component styles
  - Ensure all component files are created
  - Verify CSS syntax is valid
  - Verify no hardcoded values in components
  - Ask the user if questions arise

- [x] 14. Implement typography utilities
  - [x] 14.1 Create `partners/utilities/typography.css` with typography utility classes
    - Define variant classes: `.zid-typography-h1` through `.zid-typography-overline`
    - Apply correct font-size, font-weight, letter-spacing for each variant
    - Define text color utilities: `.zid-text-primary`, `.zid-text-secondary`, `.zid-text-tertiary`, `.zid-text-disabled`
    - _Requirements: 8.1, 8.2, 8.3, 10.1_

  <!-- - [ ] 14.2 Write property test for typography utility completeness
    - **Property 9: Typography Utility Completeness**
    - **Validates: Requirements 8.1, 8.2** -->

- [x] 15. Implement spacing utilities
  - [x] 15.1 Create `partners/utilities/spacing.css` with spacing utility classes
    - Define margin utilities: `.zid-m-{N}`, `.zid-mt-{N}`, `.zid-mr-{N}`, `.zid-mb-{N}`, `.zid-ml-{N}`, `.zid-mx-{N}`, `.zid-my-{N}`
    - Define padding utilities: `.zid-p-{N}`, `.zid-pt-{N}`, `.zid-pr-{N}`, `.zid-pb-{N}`, `.zid-pl-{N}`, `.zid-px-{N}`, `.zid-py-{N}`
    - Cover all spacing scale values (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16)
    - Reference spacing tokens
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.1_

  <!-- - [ ] 15.2 Write property test for spacing utility completeness
    - **Property 10: Spacing Utility Completeness**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4** -->

- [x] 16. Create variables template
  - [x] 16.1 Create `partners/_variables.css` template file
    - List all overridable CSS custom properties
    - Include comments explaining each token category
    - Provide example override syntax
    - _Requirements: 11.3_

- [ ] 17. CSS architecture validation
  - [ ] 17.1 Write property test for class prefix consistency
    - **Property 5: Class Prefix Consistency**
    - **Validates: Requirements 10.1**

  - [ ] 17.2 Write property test for selector depth limit
    - **Property 7: Selector Depth Limit**
    - **Validates: Requirements 10.3**

  - [ ] 17.3 Write property test for no !important declarations
    - **Property 8: No Important Declarations**
    - **Validates: Requirements 10.4**

  - [ ] 17.4 Write property test for logical properties usage
    - **Property 11: Logical Properties Usage**
    - **Validates: Requirements 12.1, 12.3**

- [ ] 18. Final checkpoint - Complete validation
  - Ensure all CSS files are properly imported in index.css
  - Verify all property tests pass
  - Verify CSS is valid and parseable
  - Ask the user if questions arise

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All CSS files should use only token references, not hardcoded values
- All directional properties should use CSS logical properties for RTL support
