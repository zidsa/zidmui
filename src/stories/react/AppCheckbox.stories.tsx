import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppCheckbox } from '~/components/app-checkbox';

//
//

// Meta
const meta = {
  title: 'React/App Checkbox',
  component: AppCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Checkbox label',
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof AppCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

//

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

//

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

//

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    checked: true,
    disabled: true,
  },
};

//

const InteractiveComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <AppCheckbox label="Click me" checked={checked} onChange={(_, value) => setChecked(value)} />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
