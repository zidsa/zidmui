import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@mui/material';

import { AppInputBase } from '../components/app-input-base';
import { StackColumn } from '../components/stack-column';

//
//

// Meta
const meta = {
  title: 'App Input Base',
  component: AppInputBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AppInputBase>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  args: {
    name: 'search',
  },
  render: () => (
    <StackColumn sx={{ background: 'white' }} padding={10} gap={4}>
      <AppInputBase />
      <AppInputBase label="User name" />
      <AppInputBase label="User name" placeholder="User name for..." size="small" error />

      <AppInputBase label="User name" placeholder="User name for..." startAdornmentText="$" />
      <AppInputBase label="User name" placeholder="User name for..." endAdornmentText="$" />

      <AppInputBase label="User name" placeholder="User name for..." endAdornmentText="Kg" />

      <AppInputBase
        label="User name"
        placeholder="This is very long placeholder text for the input."
        endAdornmentText="Kg"
        multiline
      />

      <Divider />

      <AppInputBase dir="rtl" />
      <AppInputBase dir="rtl" label="اسم المستخدم" placeholder="اسم المستخدم" size="small" error />
      <AppInputBase dir="rtl" label="اسم المستخدم" />
      <AppInputBase dir="rtl" label="اسم المستخدم" placeholder="اسم المستخدم" />
      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="اسم المستخدم"
        size="small"
        startAdornmentText="$"
      />
      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="اسم المستخدم"
        size="small"
        endAdornmentText="$"
      />
      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="اسم المستخدم"
        size="small"
        endAdornmentText="Kg"
      />

      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="هذا النص طويل جداً جداً جداً جداً جداً جداً جداً جداً جداً للاختبار"
        endAdornmentText="Kg"
        multiline
      />
    </StackColumn>
  ),
};
