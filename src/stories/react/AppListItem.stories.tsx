import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Divider, styled } from '@mui/material';

import { AppListItem } from '~/components/app-list-item';
import { AppStatus } from '~/components/app-status';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';
import { IconBankLine } from '~/icons/buildings/bank-line';

//
//

// Meta
const meta = {
  title: 'React/App List Item',
  component: AppListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    textLabel: {
      control: 'text',
    },
    textDescription: {
      control: 'text',
    },
    textContent: {
      control: 'text',
    },
    tooltip: {
      control: 'text',
    },
  },
  args: {
    textLabel: 'List item label',
    textDescription: 'Description text',
  },
} satisfies Meta<typeof AppListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {},
};

//

export const Variants: Story = {
  render: () => (
    <StackColumn gap={2}>
      <AppTypography variant="h6" sx={{ px: 1 }}>
        Label Only
      </AppTypography>

      <Container>
        <AppListItem textLabel="Sample Label" />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        Label and Description
      </AppTypography>

      <Container>
        <AppListItem textLabel="Another Item" textDescription="This is a description" />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        With Icon
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="List Item with Icon"
          textDescription="This is a description"
          icon={<IconBankLine />}
        />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        With Label Suffix
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="List Item with Label Suffix"
          textDescription="This is a description"
          labelSuffix={<AppStatus color="success" label="Active" size="small" />}
        />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        With Text Content
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="List Item with Text Content"
          textDescription="This is a description"
          textContent="Some text content here to demonstrate the textContent prop"
        />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        With Tooltip
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="List Item with Tooltip"
          textDescription="Hover the icon to see the tooltip"
          tooltip="This is a helpful tooltip"
        />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        Full Example
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="Complete List Item"
          textDescription="This item uses all available props"
          textContent="Additional content text"
          icon={<IconBankLine />}
          labelSuffix={<AppStatus color="info" label="New" size="small" />}
          tooltip="Tooltip with extra info"
        />
      </Container>

      <Divider />

      <AppTypography variant="h6" sx={{ px: 1 }}>
        With Children
      </AppTypography>

      <Container>
        <AppListItem
          textLabel="List Item with Children"
          textDescription="This is a description"
          textContent="Some text content"
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
