import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIconWithTooltip } from '../components/app-icon-with-tooltip';

//
//

// Meta
const meta = {
  title: 'App Icon With Tooltip',
  component: AppIconWithTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tooltip: {
      control: 'text',
    },
    accessibleAreaWidth: {
      control: 'text',
    },
    accessibleAreaHeight: {
      control: 'text',
    },
    iconProps: {
      control: 'object',
    },
  },
} satisfies Meta<typeof AppIconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  args: {
    tooltip: 'Tooltip sample',
    accessibleAreaWidth: '36px',
    accessibleAreaHeight: '36px',
    tooltipProps: { enterDelay: 250 },
  },
};
