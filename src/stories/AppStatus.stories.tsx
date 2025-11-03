import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider, Stack } from '@mui/material';

import { AppStatus } from '../components/app-status';

//
//

// Meta
const meta = {
  title: 'App Status',
  component: AppStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    color: 'success',
    label: 'Text',
    size: 'small',
    tooltip: 'Tooltip sample',
    tooltipProps: {
      placement: 'top',
    },
  },
} satisfies Meta<typeof AppStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  render: () => (
    <Stack spacing={0} gap={4}>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" />
        <AppStatus label="Warning" color="warning" />
        <AppStatus label="Error" color="error" />
        <AppStatus label="Neutral" color="neutral" />
        <AppStatus label="Disabled" color="disabled" />
        <AppStatus label="Info" color="info" />
        <AppStatus label="Orange" color="orange" />
        <AppStatus label="Blue" color="blue" />
        <AppStatus label="With Tooltip" color="neutral" tooltip="Tooltip sample" />
      </Stack>

      <Divider />

      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" size="medium" />
        <AppStatus label="Warning" color="warning" size="medium" />
        <AppStatus label="Error" color="error" size="medium" />
        <AppStatus label="Neutral" color="neutral" size="medium" />
        <AppStatus label="Disabled" color="disabled" size="medium" />
        <AppStatus label="Info" color="info" size="medium" />
        <AppStatus label="Orange" color="orange" size="medium" />
        <AppStatus label="Blue" color="blue" size="medium" />
        <AppStatus
          label="With Tooltip size medium"
          color="neutral"
          size="medium"
          tooltip="Tooltip sample"
        />
      </Stack>
    </Stack>
  ),
};
