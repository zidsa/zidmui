import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppSwitch } from '~/components/app-switch';
import { AppSwitchGroup } from '~/components/app-switch-group';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Switch',
  component: AppSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['primary', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
  },
  args: {
    name: 'switch',
    label: 'Switch label',
    color: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof AppSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    name: 'defaultSwitch',
    label: 'Primary Switch',
  },
};

//

export const ErrorColor: Story = {
  args: {
    name: 'errorSwitch',
    label: 'Error Switch',
    color: 'error',
  },
};

//

export const NoLabel: Story = {
  render: () => (
    <StackColumn direction="row" gap={2}>
      <AppSwitch name="noLabel1" />
      <AppSwitch name="noLabel2" color="error" />
    </StackColumn>
  ),
};

//

export const Disabled: Story = {
  render: () => (
    <StackColumn gap={2}>
      <AppSwitch name="disabled1" label="Disabled - Error - Unchecked" color="error" disabled />
      <AppSwitch
        name="disabled2"
        label="Disabled - Error - Checked"
        color="error"
        defaultChecked
        disabled
      />
      <AppSwitch name="disabled3" label="Disabled - Primary - Unchecked" disabled />
      <AppSwitch name="disabled4" label="Disabled - Primary - Checked" defaultChecked disabled />
    </StackColumn>
  ),
};

//

export const SwitchGroup: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppSwitchGroup
        label="Assign responsibility"
        helperText="Be careful"
        options={[
          { name: 'group1', label: 'Gilad Gray' },
          { name: 'group2', label: 'Jason Killian' },
          { name: 'group3', label: 'Antoine Llorca' },
        ]}
      />
      <AppSwitchGroup
        label="Error Assign responsibility"
        helperText="Be careful"
        error
        formControlProps={{ required: true }}
        options={[
          { name: 'errorGroup1', label: 'Gilad Gray' },
          { name: 'errorGroup2', label: 'Jason Killian' },
          { name: 'errorGroup3', label: 'Antoine Llorca' },
        ]}
      />
    </StackColumn>
  ),
};

//

export const DisabledSwitchGroup: Story = {
  render: () => (
    <StackColumn gap={4}>
      <AppSwitchGroup
        label="Disabled Assign responsibility"
        helperText="Be careful"
        disabled
        options={[
          { name: 'disabledGroup1', label: 'Gilad Gray' },
          { name: 'disabledGroup2', label: 'Jason Killian' },
          { name: 'disabledGroup3', label: 'Antoine Llorca' },
        ]}
      />
      <AppSwitchGroup
        label="Some Disabled Assign responsibility"
        helperText="Be careful"
        options={[
          { name: 'someDisabled1', label: 'Gilad Gray', disabled: true },
          { name: 'someDisabled2', label: 'Jason Killian' },
          { name: 'someDisabled3', label: 'Antoine Llorca', disabled: true },
        ]}
      />
    </StackColumn>
  ),
};
