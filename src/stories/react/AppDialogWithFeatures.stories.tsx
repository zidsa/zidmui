import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppDialogWithFeatures } from '~/components/app-dialog-with-features';
import { AppButton } from '~/components/app-button';
import { AppTypography } from '~/components/app-typography';

//
//

// Meta
const meta = {
  title: 'React/App Dialog With Features',
  component: AppDialogWithFeatures,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    isLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AppDialogWithFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

//

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialogWithFeatures
        open={open}
        onClose={() => setOpen(false)}
        title="Select Item"
        search={search}
        onSearchChange={setSearch}
      >
        <AppTypography>Item One</AppTypography>
        <AppTypography>Item Two</AppTypography>
        <AppTypography>Item Three</AppTypography>
        <AppTypography>Item Four</AppTypography>
      </AppDialogWithFeatures>
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    search: '',
    children: null,
  },
  render: () => <DefaultComponent />,
};

//

const WithPaginationComponent = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialogWithFeatures
        open={open}
        onClose={() => setOpen(false)}
        title="Select Item"
        search={search}
        onSearchChange={setSearch}
        pagination={{
          count: 5,
          page,
          onChange: (_, newPage) => setPage(newPage),
        }}
      >
        <AppTypography>Item One</AppTypography>
        <AppTypography>Item Two</AppTypography>
        <AppTypography>Item Three</AppTypography>
        <AppTypography>Item Four</AppTypography>
      </AppDialogWithFeatures>
    </>
  );
};

export const WithPagination: Story = {
  args: {
    open: false,
    onClose: () => {},
    search: '',
    children: null,
  },
  render: () => <WithPaginationComponent />,
};

//

const LoadingComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialogWithFeatures
        open={open}
        onClose={() => setOpen(false)}
        title="Loading..."
        search=""
        isLoading
      >
        <AppTypography>Content</AppTypography>
      </AppDialogWithFeatures>
    </>
  );
};

export const Loading: Story = {
  args: {
    open: false,
    onClose: () => {},
    search: '',
    children: null,
  },
  render: () => <LoadingComponent />,
};
