import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@mui/material';

import { AppInputBaseSearch } from '../components/app-input-base-search';
import { AppTypography } from '../components/app-typography';
import { StackColumn } from '../components/stack-column';

//
//

// Meta
const meta = {
  title: 'App Input Base Search',
  component: AppInputBaseSearch,
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
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    name: 'search',
    label: 'Search',
    placeholder: 'Search for...',
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof AppInputBaseSearch>;

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

      <AppInputBaseSearch name="search" />
      <AppInputBaseSearch name="search" label="Search" />
      <AppInputBaseSearch name="search" label="Search" placeholder="Search for..." />

      <Divider />

      <AppTypography variant="h6">Sizes</AppTypography>

      <AppInputBaseSearch name="search" label="Medium" placeholder="Search for..." />
      <AppInputBaseSearch name="search" label="Small" placeholder="Search for..." size="small" />

      <Divider />

      <AppTypography variant="h6">States</AppTypography>

      <AppInputBaseSearch name="search" label="Error" placeholder="Search for..." error />
      <AppInputBaseSearch name="search" label="Disabled" placeholder="Search for..." disabled />

      <Divider />

      <AppTypography variant="h6">RTL</AppTypography>

      <AppInputBaseSearch name="search" dir="rtl" />
      <AppInputBaseSearch name="search" dir="rtl" label="بحث" />
      <AppInputBaseSearch name="search" dir="rtl" label="بحث" placeholder="ابحث عن..." />
      <AppInputBaseSearch
        name="search"
        dir="rtl"
        label="بحث"
        placeholder="ابحث عن..."
        size="small"
        error
      />
    </StackColumn>
  ),
};
