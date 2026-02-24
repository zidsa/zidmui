import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppInputRadio } from '~/components/app-input-radio';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Input Radio',
  component: AppInputRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'error'],
    },
    row: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  args: {
    name: 'radio',
    label: 'Radio label',
    helperText: 'Select one of the options',
    size: 'medium',
    color: 'primary',
    row: true,
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof AppInputRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    name: 'defaultRadio',
    label: 'Default Radio',
  },
};

//

export const SmallSize: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppInputRadio
        name="smallRow"
        label="Small Radio - Row"
        helperText="Select one of the options"
        size="small"
        row
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppInputRadio
        name="smallColumn"
        label="Small Radio - Column"
        helperText="Select one of the options"
        size="small"
        row={false}
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

export const MediumSize: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppInputRadio
        name="mediumRow"
        label="Medium Radio - Row"
        helperText="Select one of the options"
        size="medium"
        row
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppInputRadio
        name="mediumColumn"
        label="Medium Radio - Column"
        helperText="Select one of the options"
        size="medium"
        row={false}
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

export const LargeSize: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppInputRadio
        name="largeRow"
        label="Large Radio - Row"
        helperText="Select one of the options"
        size="large"
        row
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppInputRadio
        name="largeColumn"
        label="Large Radio - Column"
        helperText="Select one of the options"
        size="large"
        row={false}
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

export const ErrorStates: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppInputRadio
        name="errorPrimary"
        label="Error Radio - Primary Color"
        helperText="Something went wrong!"
        size="medium"
        error
        row
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppInputRadio
        name="errorColor"
        label="Error Radio - Error Color"
        helperText="Something went wrong!"
        size="medium"
        color="error"
        error
        row
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

export const DisabledStates: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppInputRadio
        name="disabledRow"
        label="Disabled Radio - Row"
        helperText="This input is disabled"
        size="large"
        disabled
        row
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
      <AppInputRadio
        name="disabledSpecific"
        label="Disabled Specific Option"
        helperText="Option 2 is disabled"
        size="large"
        row={false}
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2', disabled: true },
          { value: 'opt3', label: 'Option 3' },
        ]}
      />
    </StackColumn>
  ),
};

//

const InteractiveComponent = () => {
  const [value, setValue] = useState('opt1');

  return (
    <AppInputRadio
      name="interactive"
      label="Interactive Radio"
      helperText={`Selected: ${value}`}
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
