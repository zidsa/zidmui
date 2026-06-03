import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';
import { StackRow } from '~/components/stack-row';

//
//

const alignItemsOptions = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const;
const justifyContentOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
const flexWrapOptions = ['nowrap', 'wrap', 'wrap-reverse'] as const;

const gapControl = {
  control: { type: 'number' as const, min: 0, max: 5, step: 0.25 },
};

const sharedStackArgTypes = {
  gap: gapControl,
  alignItems: {
    control: 'select' as const,
    options: alignItemsOptions,
  },
  justifyContent: {
    control: 'select' as const,
    options: justifyContentOptions,
  },
  width: {
    control: 'text' as const,
  },
  children: { table: { disable: true } },
  ref: { table: { disable: true } },
  component: { table: { disable: true } },
  sx: { table: { disable: true } },
  spacing: { table: { disable: true } },
  direction: { table: { disable: true } },
};

const columnArgTypes = {
  ...sharedStackArgTypes,
};

const rowArgTypes = {
  ...sharedStackArgTypes,
  flexWrap: {
    control: 'select' as const,
    options: flexWrapOptions,
  },
};

const meta = {
  title: 'React/App Stack',
  component: StackColumn,
  subcomponents: { StackRow },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: columnArgTypes,
} satisfies Meta<typeof StackColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const StackColumnLayout: Story = {
  args: {
    gap: 2,
    alignItems: 'stretch',
    width: 280,
  },
  argTypes: columnArgTypes,
  render: args => (
    <StackColumn {...args}>
      <AppTypography variant="subtitle2">StackColumn (column, spacing fixed to 0; use gap)</AppTypography>
      <AppTypography variant="body2">First row</AppTypography>
      <AppTypography variant="body2">Second row</AppTypography>
      <AppTypography variant="body2">Third row</AppTypography>
    </StackColumn>
  ),
};

export const StackRowLayout: Story = {
  args: {
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  argTypes: rowArgTypes,
  render: args => (
    <StackRow {...args}>
      <AppTypography variant="body2">Left</AppTypography>
      <AppTypography variant="body2">Middle</AppTypography>
      <AppTypography variant="body2">Right</AppTypography>
    </StackRow>
  ),
};

export const NestedRowInColumn: Story = {
  render: () => (
    <StackColumn gap={3} alignItems="stretch" sx={{ minWidth: 320 }}>
      <AppTypography variant="h6">Nested layout</AppTypography>
      <StackRow gap={1} justifyContent="space-between">
        <AppTypography variant="body2">Label</AppTypography>
        <AppTypography variant="body2" color="text.secondary">
          Value
        </AppTypography>
      </StackRow>
      <StackRow gap={1}>
        <AppTypography variant="caption">Tags:</AppTypography>
        <AppTypography variant="caption">A</AppTypography>
        <AppTypography variant="caption">B</AppTypography>
      </StackRow>
    </StackColumn>
  ),
};
