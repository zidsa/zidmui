import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppRadioGroup } from '~/components/app-radio-group';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Radio Group',
  component: AppRadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    radioSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    row: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    name: 'radioGroup',
    label: 'Radio Group',
    radioSize: 'medium',
    row: true,
    disabled: false,
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof AppRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    name: 'defaultRadioGroup',
    label: 'Select an option',
  },
};

//

export const Row: Story = {
  args: {
    name: 'rowRadioGroup',
    label: 'Row Layout',
    row: true,
  },
};

//

export const Column: Story = {
  args: {
    name: 'columnRadioGroup',
    label: 'Column Layout',
    row: false,
  },
};

//

export const Sizes: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppRadioGroup
        name="smallRadio"
        label="Small"
        radioSize="small"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppRadioGroup
        name="mediumRadio"
        label="Medium"
        radioSize="medium"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppRadioGroup
        name="largeRadio"
        label="Large"
        radioSize="large"
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
    </StackColumn>
  ),
};

//

export const Disabled: Story = {
  args: {
    name: 'disabledRadioGroup',
    label: 'Disabled Radio Group',
    disabled: true,
  },
};

//

export const NoLabel: Story = {
  args: {
    name: 'noLabelRadioGroup',
  },
};

//

const InteractiveComponent = () => {
  const [value, setValue] = useState('opt1');

  return (
    <AppRadioGroup
      name="interactiveRadioGroup"
      label={`Selected: ${value}`}
      value={value}
      onChange={e => setValue(e.target.value)}
      options={[
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
        { value: 'opt3', label: 'Option 3' },
      ]}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
