import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppPagination } from '~/components/app-pagination';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Pagination',
  component: AppPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
    },
    page: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    count: 10,
    page: 1,
    size: 'medium',
  },
} satisfies Meta<typeof AppPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    count: 10,
  },
};

//

export const SizeMedium: Story = {
  render: () => (
    <StackColumn gap={2}>
      <AppTypography variant="h6">Size Medium</AppTypography>
      <AppPagination />
      <AppPagination count={4} />
      <AppPagination count={10} />
      <AppPagination count={100} />
    </StackColumn>
  ),
};

//

export const SizeLarge: Story = {
  render: () => (
    <StackColumn gap={2}>
      <AppTypography variant="h6">Size Large</AppTypography>
      <AppPagination size="large" />
      <AppPagination count={4} size="large" />
      <AppPagination count={10} size="large" />
      <AppPagination count={100} size="large" />
    </StackColumn>
  ),
};

//

const InteractiveComponent = () => {
  const [page, setPage] = useState(1);

  return <AppPagination count={10} page={page} onChange={(_, newPage) => setPage(newPage)} />;
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
