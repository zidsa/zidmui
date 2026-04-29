// oxlint-disable max-lines
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppButton } from '~/components/app-button';
import { AppCard } from '~/components/app-card';
import { AppStatus } from '~/components/app-status';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';
import { StackRow } from '~/components/stack-row';
import { IconStarLine } from '~/icons/system/star-line';
import { IconDeleteBinLine } from '~/icons/system/delete-bin-line';

const meta = {
  title: 'React/App Card',
  component: AppCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning', 'info', 'neutral'],
    },
    roundedCorners: {
      control: 'select',
      options: ['grouped', 'all'],
    },
    loading: { control: 'boolean' },
  },
  args: {
    title: 'Card Title',
    description: 'This is a description for the card',
    children: <AppTypography variant="body2">Card content goes here</AppTypography>,
  },
} satisfies Meta<typeof AppCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitlePrefixAndSuffix: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard
        titlePrefix={<IconStarLine fontSize="small" color="primary" />}
        title="Card with Title Prefix"
        description="An icon is rendered before the title"
      >
        <AppTypography variant="body2">Content with title prefix</AppTypography>
      </AppCard>

      <AppCard
        title="Card with Title Suffix"
        titleSuffix={<AppStatus label="New" size="small" color="primary" />}
        description="A badge is rendered after the title"
      >
        <AppTypography variant="body2">Content with title suffix</AppTypography>
      </AppCard>

      <AppCard
        titlePrefix={<IconStarLine fontSize="small" color="primary" />}
        title="Card with Both"
        titleSuffix={<AppStatus label="New" size="small" color="primary" />}
        description="Both prefix and suffix are rendered"
      >
        <AppTypography variant="body2">Content with both prefix and suffix</AppTypography>
      </AppCard>
    </StackColumn>
  ),
};

export const Colors: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard color="primary" title="Primary Card">
        <AppTypography variant="body2">Primary color content</AppTypography>
      </AppCard>

      <AppCard color="success" title="Success Card">
        <AppTypography variant="body2">Success color content</AppTypography>
      </AppCard>

      <AppCard color="error" title="Error Card">
        <AppTypography variant="body2">Error color content</AppTypography>
      </AppCard>

      <AppCard color="warning" title="Warning Card">
        <AppTypography variant="body2">Warning color content</AppTypography>
      </AppCard>

      <AppCard color="info" title="Info Card">
        <AppTypography variant="body2">Info color content</AppTypography>
      </AppCard>

      <AppCard color="neutral" title="Neutral Card">
        <AppTypography variant="body2">Neutral color content</AppTypography>
      </AppCard>
    </StackColumn>
  ),
};

export const WithActions: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard
        title="Card with Single Action"
        description="Description"
        actions={
          <AppButton variant="contained" size="small">
            Save
          </AppButton>
        }
      >
        <AppTypography variant="body2">Card content with a single action.</AppTypography>
      </AppCard>

      <AppCard
        title="Card with Multiple Actions"
        description="Description"
        color="primary"
        actions={[
          <AppButton key="cancel" variant="outlined" size="small">
            Cancel
          </AppButton>,
          <AppButton key="save" variant="contained" size="small">
            Save
          </AppButton>,
        ]}
      >
        <AppTypography variant="body2">Card content with multiple actions.</AppTypography>
      </AppCard>
    </StackColumn>
  ),
};

export const WithCustomTitle: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard
        title={
          <StackRow gap={1} alignItems="center" justifyContent="space-between" width="100%">
            <StackRow gap={1} alignItems="center">
              <IconStarLine fontSize="small" color="primary" />
              <AppTypography variant="subtitle2">Featured Items</AppTypography>
              <AppTypography variant="caption" color="text.tertiary">
                (3 / 5)
              </AppTypography>
            </StackRow>
            <AppButton variant="text" size="small">
              Select All
            </AppButton>
          </StackRow>
        }
      >
        <StackColumn gap={1}>
          <AppTypography variant="body2">Item 1</AppTypography>
          <AppTypography variant="body2">Item 2</AppTypography>
          <AppTypography variant="body2">Item 3</AppTypography>
        </StackColumn>
      </AppCard>

      <AppCard
        title={
          <StackRow justifyContent="space-between" alignItems="center" width="100%">
            <AppTypography variant="subtitle2">Condition 1</AppTypography>
            <IconDeleteBinLine fontSize="extraSmall" color="action" />
          </StackRow>
        }
      >
        <StackColumn gap={1}>
          <StackRow justifyContent="space-between">
            <AppTypography variant="body2" color="text.secondary">
              Type:
            </AppTypography>
            <AppTypography variant="body2">Minimum order amount</AppTypography>
          </StackRow>
          <StackRow justifyContent="space-between">
            <AppTypography variant="body2" color="text.secondary">
              Value:
            </AppTypography>
            <AppTypography variant="body2">$50</AppTypography>
          </StackRow>
        </StackColumn>
      </AppCard>
    </StackColumn>
  ),
};

export const WithCustomTitleProps: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard
        title="Custom Title Styling"
        titleProps={{ variant: 'h6', color: 'primary' }}
        description="Custom description styling"
        descriptionProps={{ variant: 'caption', color: 'text.secondary' }}
      >
        <AppTypography variant="body2">
          Title and description use custom typography props.
        </AppTypography>
      </AppCard>
    </StackColumn>
  ),
};

export const WithTitleAction: Story = {
  render: () => (
    <StackColumn width={800} gap={2}>
      <AppCard
        title="Card with Button Action"
        description="A button is rendered on the right side of the title"
        titleAction={
          <AppButton variant="text" size="small">
            Edit
          </AppButton>
        }
      >
        <AppTypography variant="body2">Content with a title action button.</AppTypography>
      </AppCard>

      <AppCard
        title="Card with Icon Button Action"
        description="An icon button is rendered on the right side"
        titleAction={
          <IconDeleteBinLine fontSize="small" color="action" sx={{ cursor: 'pointer' }} />
        }
      >
        <AppTypography variant="body2">Content with an icon action.</AppTypography>
      </AppCard>

      <AppCard
        title="Card with Multiple Actions"
        description="Multiple elements can be used as title action"
        titleAction={
          <StackRow gap={1}>
            <AppButton variant="outlined" size="small">
              Cancel
            </AppButton>
            <AppButton variant="contained" size="small">
              Save
            </AppButton>
          </StackRow>
        }
      >
        <AppTypography variant="body2">Content with multiple title actions.</AppTypography>
      </AppCard>

      <AppCard
        titlePrefix={<IconStarLine fontSize="small" color="primary" />}
        title="Combined with Prefix"
        titleSuffix={<AppStatus label="New" size="small" color="primary" />}
        description="Title action works alongside prefix and suffix"
        titleAction={
          <AppButton variant="text" size="small">
            View All
          </AppButton>
        }
      >
        <AppTypography variant="body2">
          Content showing titleAction combined with titlePrefix and titleSuffix.
        </AppTypography>
      </AppCard>
    </StackColumn>
  ),
};

export const WithEmptyContent: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard title="Card with Empty Content" description="The content area is hidden when empty">
        {/* No children - CardContent will be empty and hidden via CSS */}
      </AppCard>

      <AppCard
        title="Header Only Card"
        titleAction={
          <AppButton variant="text" size="small">
            Action
          </AppButton>
        }
      />
    </StackColumn>
  ),
};

export const WithContent: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard title="Card with Content" description="The content area is visible with styling">
        <AppTypography variant="body2">
          This content area has padding, border-radius, and proper spacing applied via the theme.
        </AppTypography>
      </AppCard>

      <AppCard
        title="Card with Multiple Content Items"
        description="Content items have gap spacing"
      >
        <AppTypography variant="body2">First content item</AppTypography>
        <AppTypography variant="body2">Second content item</AppTypography>
        <AppTypography variant="body2">Third content item</AppTypography>
      </AppCard>
    </StackColumn>
  ),
};
