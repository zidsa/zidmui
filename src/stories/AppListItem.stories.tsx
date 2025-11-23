import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Divider, styled } from '@mui/material';

import { AppListItem } from '../components/app-list-item';
import { AppStatus } from '../components/app-status';
import { StackColumn } from '../components/stack-column';
import { IconBankLine } from '../icons/buildings/bank-line';

//
//

// Meta
const meta = {
  title: 'App List Item',
  component: AppListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
    },
  },
} satisfies Meta<typeof AppListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {},
};

export const Variants: Story = {
  render: () => (
    <StackColumn gap={2}>
      <Container>
        <AppListItem textLabel="Sample Label" />
      </Container>

      <Divider />

      <Container>
        <AppListItem textLabel="Another Item" textDescription="This is a description" />
      </Container>

      <Divider />

      <Container>
        <AppListItem
          textLabel="List Item with Icon"
          textDescription="This is a description"
          icon={<IconBankLine />}
        />
      </Container>

      <Divider />

      <Container>
        <AppListItem
          textLabel="List Item with Label Suffix"
          textDescription="This is a description"
          labelSuffix={<AppStatus color="success" label="Badge" size="small" />}
        />
      </Container>

      <Divider />

      <Container>
        <AppListItem
          textLabel="List Item with Text Content"
          textDescription="This is a description"
          textContent="Some text content here to demonstrate the textContent prop"
        />
      </Container>

      <Divider />

      <Container>
        <AppListItem
          textLabel="List Item with Text Content"
          textDescription="This is a description"
          textContent="Some text content here to demonstrate the textContent prop"
        >
          Additional content
        </AppListItem>
      </Container>
    </StackColumn>
  ),
};

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.colors.base.white,
  minWidth: 200,
  maxWidth: 400,
}));
