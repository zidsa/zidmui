import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppTabs, AppTab } from '~/components/app-tabs';
import { IconSettingsLine } from '~/icons/system/settings-line';

//
//

// Meta
const meta = {
  title: 'React/App Tabs',
  component: AppTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
    },
  },
} satisfies Meta<typeof AppTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

//

//

const InteractiveComponent = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <AppTabs
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      tabs={[
        { key: 'tab1', label: 'All', chip: { label: '120' } },
        { key: 'tab2', label: 'Active', chip: { label: '85', color: 'success' } },
        { key: 'tab3', label: 'Pending', chip: { label: '25', color: 'warning' } },
      ]}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};

//

export const Default: Story = {
  args: {
    value: 0,
    tabs: [
      { key: 'tab1', label: 'Tab One' },
      { key: 'tab2', label: 'Tab Two' },
      { key: 'tab3', label: 'Tab Three' },
    ],
  },
};

//

export const WithChip: Story = {
  args: {
    value: 0,
    tabs: [
      { key: 'tab1', label: 'All', chip: { label: '120', color: 'neutral' } },
      { key: 'tab2', label: 'Active', chip: { label: '85', color: 'success' } },
      { key: 'tab3', label: 'Pending', chip: { label: '25', color: 'warning' } },
      { key: 'tab4', label: 'Errors', chip: { label: '10', color: 'error' } },
    ],
  },
};

//

export const WithIcon: Story = {
  args: {
    value: 0,
    tabs: [
      { key: 'tab1', label: 'Settings', icon: <IconSettingsLine /> },
      { key: 'tab2', label: 'Tab Two' },
      { key: 'tab3', label: 'Tab Three' },
    ],
  },
};

//

export const WithIconAndChip: Story = {
  args: {
    value: 0,
    tabs: [
      {
        key: 'tab1',
        label: 'Settings',
        icon: <IconSettingsLine />,
        chip: { label: '5', color: 'info' },
      },
      { key: 'tab2', label: 'Tab Two', chip: { label: '12', color: 'success' } },
    ],
  },
};

//

export const UsingChildren: Story = {
  args: {
    value: 0,
  },
  render: args => (
    <AppTabs {...args}>
      <AppTab label="First" />
      <AppTab label="Second" chip={{ label: '5', color: 'info' }} />
      <AppTab label="Third" />
    </AppTabs>
  ),
};
