import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icons } from './Icons';

//
//

// Meta
const meta = {
  title: 'Icons',
  component: Icons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Icons>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
