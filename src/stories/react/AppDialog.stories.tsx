import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppDialog } from '~/components/app-dialog';
import { AppButton } from '~/components/app-button';
import { AppTypography } from '~/components/app-typography';

//
//

// Meta
const meta = {
  title: 'React/App Dialog',
  component: AppDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    darkerBackdrop: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AppDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

//

const DefaultComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialog open={open} onClose={() => setOpen(false)}>
        <AppTypography>Dialog content goes here.</AppTypography>
      </AppDialog>
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    children: null,
  },
  render: () => <DefaultComponent />,
};

//

const WithTitleComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
        <AppTypography>Dialog content with title.</AppTypography>
      </AppDialog>
    </>
  );
};

export const WithTitle: Story = {
  args: {
    open: false,
    children: null,
  },
  render: () => <WithTitleComponent />,
};

//

const WithTitleAndDescriptionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Dialog Title"
        description="This is a description that provides more context about the dialog."
      >
        <AppTypography>Dialog content with title and description.</AppTypography>
      </AppDialog>
    </>
  );
};

export const WithTitleAndDescription: Story = {
  args: {
    open: false,
    children: null,
  },
  render: () => <WithTitleAndDescriptionComponent />,
};

//

const WithActionsComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        actions={
          <>
            <AppButton variant="outlined" color="secondary" onClick={() => setOpen(false)}>
              Cancel
            </AppButton>
            <AppButton variant="contained" color="primary" onClick={() => setOpen(false)}>
              Confirm
            </AppButton>
          </>
        }
      >
        <AppTypography>This action cannot be undone.</AppTypography>
      </AppDialog>
    </>
  );
};

export const WithActions: Story = {
  args: {
    open: false,
    children: null,
  },
  render: () => <WithActionsComponent />,
};

//

const DarkerBackdropComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onClick={() => setOpen(true)}>Open Dialog</AppButton>
      <AppDialog open={open} onClose={() => setOpen(false)} title="Darker Backdrop" darkerBackdrop>
        <AppTypography>This dialog has a darker backdrop.</AppTypography>
      </AppDialog>
    </>
  );
};

export const DarkerBackdrop: Story = {
  args: {
    open: false,
    children: null,
  },
  render: () => <DarkerBackdropComponent />,
};
