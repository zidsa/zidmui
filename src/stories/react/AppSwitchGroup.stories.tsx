import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppSwitchGroup } from '~/components/app-switch-group';

//
//

const meta = {
  title: 'React/App Switch Group',
  component: AppSwitchGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'select', options: ['primary', 'error'] },
  },
} satisfies Meta<typeof AppSwitchGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {
    label: 'Assign responsibility',
    helperText: 'Be careful',
    color: 'primary',
    options: [
      { name: 'playground1', label: 'Gilad Gray' },
      { name: 'playground2', label: 'Jason Killian' },
      { name: 'playground3', label: 'Antoine Llorca' },
    ],
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Assign responsibility',
    helperText: 'Be careful',
    error: true,
    formControlProps: { required: true },
    options: [
      { name: 'error1', label: 'Gilad Gray' },
      { name: 'error2', label: 'Jason Killian' },
      { name: 'error3', label: 'Antoine Llorca' },
    ],
  },
};

export const DisabledGroup: Story = {
  args: {
    label: 'Disabled group',
    helperText: 'All switches disabled',
    disabled: true,
    options: [
      { name: 'dis1', label: 'Gilad Gray' },
      { name: 'dis2', label: 'Jason Killian' },
      { name: 'dis3', label: 'Antoine Llorca' },
    ],
  },
};

export const PartiallyDisabledOptions: Story = {
  args: {
    label: 'Some options disabled',
    helperText: 'Individual switch disabled flags',
    options: [
      { name: 'partial1', label: 'Gilad Gray', disabled: true },
      { name: 'partial2', label: 'Jason Killian' },
      { name: 'partial3', label: 'Antoine Llorca', disabled: true },
    ],
  },
};
