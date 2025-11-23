import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Divider, styled } from '@mui/material';

import { AppOverflownTextWithTooltip } from '../components/app-overflown-text-with-tooltip';
import { StackColumn } from '../components/stack-column';

//
//

// Meta
const meta = {
  title: 'App Overflown Text With Tooltip',
  component: AppOverflownTextWithTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
    },
  },
} satisfies Meta<typeof AppOverflownTextWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  args: {
    title: 'Sample Label',
  },
  render: () => (
    <StackColumn gap={2}>
      <Container>
        <AppOverflownTextWithTooltip title="This is a very long title that will be truncated" />
      </Container>

      <Divider />

      <Container>
        <AppOverflownTextWithTooltip
          title="This is a very very long title that will be truncated and should show tooltip when hovered to see the full text with the rest of the content"
          twoLines
        />
      </Container>
    </StackColumn>
  ),
};

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.colors.base.white,
  maxWidth: 200,
}));
