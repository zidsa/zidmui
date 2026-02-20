import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@mui/material';

import { AppInputBase } from '~/components/app-input-base';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Input Base',
  component: AppInputBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'small'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    multiline: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    startAdornmentText: {
      control: 'text',
    },
    endAdornmentText: {
      control: 'text',
    },
  },
  args: {
    size: 'medium',
    label: 'Label',
    placeholder: 'Placeholder text',
    disabled: false,
    error: false,
    multiline: false,
  },
} satisfies Meta<typeof AppInputBase>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {},
};

//

export const Variants: Story = {
  render: () => (
    <StackColumn sx={{ background: 'white' }} padding={10} gap={4}>
      <AppTypography variant="h6">Basic</AppTypography>

      <AppInputBase />
      <AppInputBase label="User name" />
      <AppInputBase label="User name" placeholder="Enter your username" />
      <AppInputBase label="User name" placeholder="Enter your username" size="small" />

      <Divider />

      <AppTypography variant="h6">States</AppTypography>

      <AppInputBase
        label="Error"
        placeholder="Invalid input"
        error
        helperText="This field is required"
      />
      <AppInputBase label="Disabled" placeholder="Cannot edit" disabled />

      <Divider />

      <AppTypography variant="h6">Adornments</AppTypography>

      <AppInputBase label="Price" placeholder="0.00" startAdornmentText="$" />
      <AppInputBase label="Price" placeholder="0.00" endAdornmentText="$" />
      <AppInputBase label="Weight" placeholder="0" endAdornmentText="Kg" />
      <AppInputBase
        label="Price"
        placeholder="0.00"
        endAdornmentText="SAR"
        endAdornmentTextProps={{ typographyProps: { color: 'primary' } }}
      />

      <Divider />

      <AppTypography variant="h6">Multiline</AppTypography>

      <AppInputBase
        label="Description"
        placeholder="Enter a detailed description..."
        endAdornmentText="Kg"
        multiline
      />

      <Divider />

      <AppTypography variant="h6">RTL</AppTypography>

      <AppInputBase dir="rtl" label="اسم المستخدم" />
      <AppInputBase dir="rtl" label="اسم المستخدم" placeholder="اسم المستخدم" />
      <AppInputBase dir="rtl" label="اسم المستخدم" placeholder="اسم المستخدم" size="small" error />
      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="اسم المستخدم"
        startAdornmentText="$"
      />
      <AppInputBase
        dir="rtl"
        label="اسم المستخدم"
        placeholder="اسم المستخدم"
        endAdornmentText="Kg"
      />
      <AppInputBase
        dir="rtl"
        label="الوصف"
        placeholder="هذا النص طويل جداً جداً جداً جداً للاختبار"
        endAdornmentText="Kg"
        multiline
      />
    </StackColumn>
  ),
};
