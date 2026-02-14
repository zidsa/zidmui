import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppInputBaseSearch } from '../components/app-input-base-search';
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
  argTypes: {},
} satisfies Meta<typeof AppInputBaseSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  args: {
    name: 'search',
  },
  render: () => (
    <StackColumn gap={4}>
      {/* <AppInputBaseSearch name="search" />
      <AppInputBaseSearch name="search" label="Search" />
      <AppInputBaseSearch name="search" label="Search" placeholder="Search for..." />
      <AppInputBaseSearch
        name="search"
        label="Search"
        placeholder="Search for..."
        size="small"
        error
      />

      <Divider />

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
      /> */}
    </StackColumn>
  ),
};
