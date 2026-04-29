// oxlint-disable max-lines
import type { Meta, StoryObj } from '@storybook/react-vite';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { AppButton } from '~/components/app-button';
import { AppCard } from '~/components/app-card';
import { AppIconBox } from '~/components/app-icon-box';
import { AppStatus } from '~/components/app-status';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';
import { StackRow } from '~/components/stack-row';
import { IconBarChart2Line } from '~/icons/business/bar-chart-2-line';
import { IconCheckboxCircleLine } from '~/icons/system/checkbox-circle-line';
import { IconDeleteBinLine } from '~/icons/system/delete-bin-line';
import { IconStarLine } from '~/icons/system/star-line';
import { IconFireLine } from '~/icons/weather/fire-line';

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

export const WithIconBox: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppCard
        titlePrefix={
          <AppIconBox>
            <IconCheckboxCircleLine color="action" />
          </AppIconBox>
        }
        title="Card with Icon Box"
        description="Icon wrapped in AppIconBox for consistent styling"
      />

      <AppCard
        titlePrefix={
          <AppIconBox>
            <IconFireLine color="action" />
          </AppIconBox>
        }
        title="Feature Card"
        titleDivider
        description="A divider separates the title from description"
        descriptionProps={{ variant: 'body2', color: 'text.tertiary' }}
      />

      <AppCard
        headerProps={{ flexDirection: 'column', alignItems: 'flex-start' }}
        titleContainerProps={{ gap: 1.5 }}
        titlePrefix={
          <AppIconBox>
            <IconBarChart2Line color="action" />
          </AppIconBox>
        }
        titleDivider
        title="Vertical Layout"
        description="Icon stacked above title using headerProps flexDirection column"
        descriptionProps={{ variant: 'body2', color: 'text.tertiary' }}
      />
    </StackColumn>
  ),
};

export const FeatureCards: Story = {
  render: () => {
    const features = [
      {
        id: 1,
        title: 'Dashboard Analytics',
        description: 'Track your store performance with real-time analytics',
        icon: <IconBarChart2Line color="action" />,
      },
      {
        id: 2,
        title: 'Customer Retargeting',
        description: 'Re-engage customers with personalized campaigns',
        icon: <IconFireLine color="action" />,
      },
      {
        id: 3,
        title: 'Discount Management',
        description: 'Create and manage promotional discounts',
        icon: <IconCheckboxCircleLine color="action" />,
      },
    ];

    return (
      <AppCard title="Main Features" titleProps={{ variant: 'h6' }}>
        <Grid>
          {features.map(feature => (
            <AppCard
              key={feature.id}
              sx={{ width: '100%' }}
              headerProps={{ flexDirection: 'column', alignItems: 'flex-start' }}
              titleContainerProps={{ gap: 1.5 }}
              titlePrefix={<AppIconBox>{feature.icon}</AppIconBox>}
              titleDivider
              title={feature.title}
              description={feature.description}
              descriptionProps={{ variant: 'body2', color: 'text.tertiary' }}
            />
          ))}
        </Grid>
      </AppCard>
    );
  },
};

export const StatCards: Story = {
  render: () => (
    <AppCard title="Performance Stats" titleProps={{ variant: 'h6' }}>
      <Grid>
        <AppCard
          headerProps={{ flexDirection: 'column', textAlign: 'center' }}
          titlePrefix={<AppIconBox>98%</AppIconBox>}
          description="Store Access Rate"
        />
        <AppCard
          headerProps={{ flexDirection: 'column', textAlign: 'center' }}
          titlePrefix={<AppIconBox>3x</AppIconBox>}
          description="Retention Rate"
        />
        <AppCard
          headerProps={{ flexDirection: 'column', textAlign: 'center' }}
          titlePrefix={<AppIconBox>5x</AppIconBox>}
          description="Conversion Rate"
        />
      </Grid>
    </AppCard>
  ),
};

export const WithListContent: Story = {
  render: () => {
    const listItems = [
      { id: 1, text: 'Accept all major credit cards' },
      { id: 2, text: 'Instant payment processing' },
      { id: 3, text: 'Secure transactions' },
    ];

    return (
      <StackColumn width={400} gap={2}>
        <AppCard
          sx={{ gap: 0.5 }}
          headerProps={{ flexDirection: 'column', alignItems: 'flex-start' }}
          title="Payment Features"
          titlePrefix={
            <AppIconBox>
              <IconCheckboxCircleLine color="action" />
            </AppIconBox>
          }
        >
          <Divider />
          <StyledList>
            {listItems.map(item => (
              <ListItem key={item.id}>
                <ListItemIcon>
                  <IconCheckboxCircleLine fontSize="small" />
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            ))}
          </StyledList>
        </AppCard>
      </StackColumn>
    );
  },
};

export const NestedCards: Story = {
  render: () => (
    <StackColumn width={500} gap={2}>
      <AppCard
        title="Growth Features"
        description="Expand your business with these tools"
        descriptionProps={{ color: 'text.secondary' }}
      >
        <StackColumn gap={2}>
          <AppCard titleProps={{ variant: 'body1' }} title="Inventory Management" />
          <AppCard titleProps={{ variant: 'body1' }} title="Order Tracking" />
          <AppCard titleProps={{ variant: 'body1' }} title="Customer Analytics" />
        </StackColumn>
      </AppCard>
    </StackColumn>
  ),
};

export const SimpleFeatureList: Story = {
  render: () => {
    const features = [
      { id: 1, name: 'Dashboard' },
      { id: 2, name: 'Retargeting' },
      { id: 3, name: 'Discounts' },
      { id: 4, name: 'Notifications' },
    ];

    return (
      <AppCard title="Available Features">
        <Grid columns={2}>
          {features.map(feature => (
            <AppCard
              key={feature.id}
              title={feature.name}
              titleProps={{ variant: 'body1' }}
              titlePrefix={<IconCheckboxCircleLine color="action" />}
            />
          ))}
        </Grid>
      </AppCard>
    );
  },
};

export const NumberedSteps: Story = {
  render: () => {
    const steps = [
      { id: '01', description: 'Create your account' },
      { id: '02', description: 'Set up your store' },
      { id: '03', description: 'Start selling' },
    ];

    return (
      <AppCard title="Getting Started" titleProps={{ variant: 'h6' }}>
        <Grid>
          {steps.map(step => (
            <AppCard
              key={step.id}
              headerProps={{ flexDirection: 'column', alignItems: 'flex-start' }}
              description={step.description}
              titlePrefix={<AppIconBox>{step.id}</AppIconBox>}
            />
          ))}
        </Grid>
      </AppCard>
    );
  },
};

//
//

const Grid = styled(Box)<{ columns?: number }>(({ theme, columns = 3 }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: theme.spacing(2),
}));

const StyledList = styled(List)(({ theme }) => ({
  '.MuiListItem-root': {
    border: 0,
    paddingBlock: theme.spacing(0.5),
    gap: theme.spacing(1),
  },
}));
