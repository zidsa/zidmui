import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppButton } from '../components/app-button';

//
//

// Meta
const meta = {
  title: 'App Button',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
    disabled: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
    },
    tooltipProps: {
      control: 'object',
    },
  },
  args: {
    size: 'large',
    children: 'Text',
    disabled: false,
    tooltip: 'Tooltip sample',
    tooltipProps: {
      placement: 'top',
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Primary: Story = {
  argTypes: {
    color: {
      control: 'select',
      options: ['primary'],
    },
    variant: {
      control: 'select',
      options: ['contained'],
    },
  },
  args: {
    color: 'primary',
    variant: 'contained',
  },
};

//

export const Secondary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined'],
    },
  },
  args: {
    color: 'secondary',
    variant: 'outlined',
  },
};

//

export const Tertiary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined'],
    },
  },
  args: {
    color: 'tertiary',
    variant: 'contained',
  },
};

//

export const Error: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
  },
  args: {
    color: 'error',
    variant: 'contained',
  },
};
