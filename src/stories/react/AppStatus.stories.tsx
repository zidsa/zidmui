import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider, Stack } from '@mui/material';

import { AppStatus } from '~/components/app-status';
import { AppTypography } from '~/components/app-typography';

//
//

// Meta
const meta = {
  title: 'React/App Status',
  component: AppStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
    },
  },
} satisfies Meta<typeof AppStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {
    color: 'success',
    label: 'Text',
    size: 'small',
    variant: 'filled',
    tooltip: 'Tooltip sample',
    tooltipProps: {
      placement: 'top',
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={0} gap={4}>
      <AppTypography variant="subtitle1">Filled (default)</AppTypography>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" />
        <AppStatus label="Warning" color="warning" />
        <AppStatus label="Error" color="error" />
        <AppStatus label="Neutral" color="neutral" />
        <AppStatus label="Disabled" color="disabled" />
        <AppStatus label="Info" color="info" />
        <AppStatus label="Orange" color="orange" />
        <AppStatus label="Blue" color="blue" />
        <AppStatus label="Primary" color="primary" />
      </Stack>

      <Divider />

      <AppTypography variant="subtitle1">Outlined</AppTypography>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" variant="outlined" />
        <AppStatus label="Warning" color="warning" variant="outlined" />
        <AppStatus label="Error" color="error" variant="outlined" />
        <AppStatus label="Neutral" color="neutral" variant="outlined" />
        <AppStatus label="Disabled" color="disabled" variant="outlined" />
        <AppStatus label="Info" color="info" variant="outlined" />
        <AppStatus label="Orange" color="orange" variant="outlined" />
        <AppStatus label="Blue" color="blue" variant="outlined" />
        <AppStatus label="Primary" color="primary" variant="outlined" />
      </Stack>

      <Divider />

      <AppTypography variant="subtitle1">Medium Size - Filled</AppTypography>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" size="medium" />
        <AppStatus label="Warning" color="warning" size="medium" />
        <AppStatus label="Error" color="error" size="medium" />
        <AppStatus label="Neutral" color="neutral" size="medium" />
        <AppStatus label="Disabled" color="disabled" size="medium" />
        <AppStatus label="Info" color="info" size="medium" />
        <AppStatus label="Orange" color="orange" size="medium" />
        <AppStatus label="Blue" color="blue" size="medium" />
        <AppStatus label="Primary" color="primary" size="medium" />
      </Stack>

      <Divider />

      <AppTypography variant="subtitle1">Medium Size - Outlined</AppTypography>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Success" color="success" size="medium" variant="outlined" />
        <AppStatus label="Warning" color="warning" size="medium" variant="outlined" />
        <AppStatus label="Error" color="error" size="medium" variant="outlined" />
        <AppStatus label="Neutral" color="neutral" size="medium" variant="outlined" />
        <AppStatus label="Disabled" color="disabled" size="medium" variant="outlined" />
        <AppStatus label="Info" color="info" size="medium" variant="outlined" />
        <AppStatus label="Orange" color="orange" size="medium" variant="outlined" />
        <AppStatus label="Blue" color="blue" size="medium" variant="outlined" />
        <AppStatus label="Primary" color="primary" size="medium" variant="outlined" />
      </Stack>

      <Divider />

      <AppTypography variant="subtitle1">With Tooltip</AppTypography>
      <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
        <AppStatus label="Filled Tooltip" color="success" tooltip="Tooltip sample" />
        <AppStatus
          label="Outlined Tooltip"
          color="success"
          variant="outlined"
          tooltip="Tooltip sample"
        />
      </Stack>
    </Stack>
  ),
};
