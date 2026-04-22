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
