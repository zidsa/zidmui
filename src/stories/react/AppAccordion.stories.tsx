// oxlint-disable max-lines
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AppAccordion } from '~/components/app-accordion';
import type { AppAccordionProps } from '~/components/app-accordion';
import { AppButton } from '~/components/app-button';
import { AppCheckbox } from '~/components/app-checkbox';
import { AppIconButton } from '~/components/app-icon-button';
import { AppStatus } from '~/components/app-status';
import { AppSwitch } from '~/components/app-switch';
import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';
import { StackRow } from '~/components/stack-row';
import { IconDeleteBinLine } from '~/icons/system/delete-bin-line';
import { IconStarLine } from '~/icons/system/star-line';
import { Box, CircularProgress } from '@mui/material';
import { useToggle } from '~/hooks/use-toggle';

// Wrapper component with state management
const AccordionWithState = (args: AppAccordionProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? false);
  return <AppAccordion {...args} isOpen={isOpen} onToggle={(_, expanded) => setIsOpen(expanded)} />;
};

const meta = {
  title: 'React/App Accordion',
  component: AppAccordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning', 'info', 'neutral'],
    },
    unmountOnExit: { control: 'boolean' },
  },
  args: {
    isOpen: false,
    title: 'Accordion Title',
    description: 'This is a description for the accordion',
    unmountOnExit: true,
    children: <div>Accordion content goes here</div>,
  },
  render: args => <AccordionWithState {...args} />,
} satisfies Meta<typeof AppAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// New Feature Stories - Demonstrating individual props
export const WithTitlePrefixAndSuffix: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppAccordion
        titlePrefix={<IconStarLine color="primary" />}
        title="Accordion with Title Prefix"
        description="An icon is rendered before the title"
      >
        <AppTypography>Content with title prefix</AppTypography>
      </AppAccordion>

      <AppAccordion
        title="Accordion with Title Suffix"
        titleSuffix={<AppStatus label="New" size="small" color="primary" />}
        description="A badge is rendered after the title"
      >
        <AppTypography>Content with title suffix</AppTypography>
      </AppAccordion>

      <AppAccordion
        titlePrefix={<IconStarLine color="primary" />}
        title="Accordion with Both"
        titleSuffix={<AppStatus label="New" size="small" color="primary" />}
        description="Both prefix and suffix are rendered"
      >
        <AppTypography>Content with both prefix and suffix</AppTypography>
      </AppAccordion>
    </StackColumn>
  ),
};

export const WithLoaders: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <AppAccordion
        title="Summary Loader (Default)"
        description="Default zid logo spinner in summary"
        isSummaryLoading={true}
      >
        <AppTypography>Content goes here</AppTypography>
      </AppAccordion>

      <AppAccordion
        title="Summary Loader (Custom)"
        description="Custom CircularProgress loader in summary"
        isSummaryLoading={true}
        summaryLoader={<CircularProgress size={20} />}
      >
        <AppTypography>Content goes here</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={true}
        title="Details Loader (Default)"
        description="Default zid logo spinner in details"
        isDetailsLoading={true}
      >
        <AppTypography>Content goes here</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={true}
        title="Details Loader (Custom)"
        description="Custom CircularProgress loader in details"
        isDetailsLoading={true}
        detailsLoader={<CircularProgress size={40} />}
      >
        <AppTypography>Content goes here</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={true}
        title="Both Loaders (Default)"
        description="Default zid logo spinner in both summary and details"
        isSummaryLoading={true}
        isDetailsLoading={true}
      >
        <AppTypography>Content goes here</AppTypography>
      </AppAccordion>
    </StackColumn>
  ),
};

const ColorsExample = () => {
  const toggle = useToggle(true);

  return (
    <StackColumn width={400} gap={2}>
      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="primary"
          title="Primary Color Accordion"
        >
          <AppTypography>Primary color content</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="success"
          title="Success Color Accordion"
        >
          <AppTypography>Success color content</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="error"
          title="Error Color Accordion"
        >
          <AppTypography>Error color content</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="warning"
          title="Warning Color Accordion"
        >
          <AppTypography>Warning color content</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="info"
          title="Info Color Accordion"
        >
          <AppTypography>Info color content</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={toggle.value}
          onToggle={toggle.toggle}
          color="neutral"
          title="Neutral Color Accordion"
        >
          <AppTypography>Neutral color content</AppTypography>
        </AppAccordion>
      </Box>
    </StackColumn>
  );
};

export const Colors: Story = {
  render: () => <ColorsExample />,
};

//

const AccordionGroupExample = () => {
  const toggle = useToggle(false);

  return (
    <StackColumn width={400} gap={1}>
      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="primary"
        title="Primary Color Accordion"
      >
        <AppTypography>Primary color content</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="success"
        title="Success Color Accordion"
      >
        <AppTypography>Success color content</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="error"
        title="Error Color Accordion"
      >
        <AppTypography>Error color content</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="warning"
        title="Warning Color Accordion"
      >
        <AppTypography>Warning color content</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="info"
        title="Info Color Accordion"
      >
        <AppTypography>Info color content</AppTypography>
      </AppAccordion>

      <AppAccordion
        isOpen={toggle.value}
        onToggle={toggle.toggle}
        color="neutral"
        title="Neutral Color Accordion"
      >
        <AppTypography>Neutral color content</AppTypography>
      </AppAccordion>
    </StackColumn>
  );
};

export const AccordionGroups: Story = {
  render: () => <AccordionGroupExample />,
};

export const UnmountOnExit: Story = {
  args: {
    isOpen: false,
    unmountOnExit: true,
    title: 'Unmount Content When Closed',
    description: 'Content is unmounted from DOM when accordion is closed',
    children: (
      <div>
        <p>This content will be unmounted when the accordion is closed.</p>
        <p>Check the DOM to verify!</p>
      </div>
    ),
  },
};

// Pattern 2: Controlled Accordion with Toggle State
export const ControlledWithToggle: Story = {
  args: {
    title: 'Controlled Accordion',
    description: 'This accordion state is controlled externally',
    isOpen: false,
  },
};

// Pattern 3: Switch-Controlled Accordion
const SwitchControlledAccordion = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <AppAccordion
      title={
        <StackRow flex={1} alignItems="center" justifyContent="space-between">
          <StackColumn gap={0}>
            <AppTypography variant="h6">Conditions</AppTypography>
            <AppTypography variant="caption" color="text.tertiary">
              Configure the conditions for this feature
            </AppTypography>
          </StackColumn>
          <AppSwitch
            name="is_conditions_active"
            switchProps={{
              checked: isActive,
              onChange: (_, checked) => setIsActive(checked),
              onClick: event => event.stopPropagation(),
            }}
          />
        </StackRow>
      }
      accordionSummaryProps={{
        expandIcon: undefined,
        sx: { h3: { cursor: 'default' } },
        slotProps: { content: { sx: { cursor: 'default' } } },
      }}
      unmountOnExit
      isOpen={isActive}
    >
      <StackColumn gap={2}>
        <AppTypography variant="body2">
          This accordion is controlled by the switch in the header.
        </AppTypography>
        <AppTypography variant="body2">
          Toggle the switch to expand or collapse the content.
        </AppTypography>
      </StackColumn>
    </AppAccordion>
  );
};
export const SwitchControlled: Story = { render: () => <SwitchControlledAccordion /> };

// Pattern 4: Nested Accordion with Custom Background
const NestedAccordionWithCustomBackground = () => {
  const [outerOpen, setOuterOpen] = useState(true);
  const [innerOpen1, setInnerOpen1] = useState(false);
  const [innerOpen2, setInnerOpen2] = useState(false);
  const innerAccordionProps = {
    expandIcon: undefined,
    sx: { h3: { cursor: 'default' } },
    slotProps: { content: { sx: { cursor: 'default' } } },
  };

  return (
    <AppAccordion
      title="Parent Accordion"
      description="This accordion contains nested child accordions with custom styling"
      isOpen={outerOpen}
      onToggle={(_, expanded) => setOuterOpen(expanded)}
    >
      <StackColumn gap={1.5}>
        <AppAccordion
          title={
            <StackRow flex={1} justifyContent="space-between" alignItems="center">
              <AppTypography variant="body2">Nested Section 1</AppTypography>
              <AppSwitch
                name="nested_section_1"
                switchProps={{
                  checked: innerOpen1,
                  onChange: (_, checked) => setInnerOpen1(checked),
                  onClick: event => event.stopPropagation(),
                }}
              />
            </StackRow>
          }
          titleProps={{ variant: 'body2' }}
          sx={{ border: 'none' }}
          accordionSummaryProps={innerAccordionProps}
          isOpen={innerOpen1}
        >
          <AppTypography variant="body2">
            Content for nested section 1. This inner accordion has a gray background and no border.
          </AppTypography>
        </AppAccordion>
        <AppAccordion
          title={
            <StackRow flex={1} justifyContent="space-between" alignItems="center">
              <AppTypography variant="body2">Nested Section 2</AppTypography>
              <AppSwitch
                name="nested_section_2"
                switchProps={{
                  checked: innerOpen2,
                  onChange: (_, checked) => setInnerOpen2(checked),
                  onClick: event => event.stopPropagation(),
                }}
              />
            </StackRow>
          }
          titleProps={{ variant: 'body2' }}
          sx={{ border: 'none' }}
          accordionSummaryProps={innerAccordionProps}
          isOpen={innerOpen2}
        >
          <AppTypography variant="body2">
            Content for nested section 2. Toggle the switch to expand or collapse this section.
          </AppTypography>
        </AppAccordion>
      </StackColumn>
    </AppAccordion>
  );
};
export const NestedWithCustomBackground: Story = {
  render: () => <NestedAccordionWithCustomBackground />,
};

// Pattern 5: Accordion with Action Buttons in Title
const AccordionWithActionButtons = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>(['item1', 'item3']);
  const allItems = ['item1', 'item2', 'item3', 'item4', 'item5'];
  const isAllSelected = selectedItems.length === allItems.length;
  const handleToggleItem = (item: string) =>
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );

  return (
    <AppAccordion
      title={
        <StackRow gap={1} alignItems="center" justifyContent="space-between" flex={1}>
          <StackRow gap={1} alignItems="center">
            <StackRow
              width={24}
              minWidth={24}
              height={24}
              alignItems="center"
              justifyContent="center"
            >
              <IconStarLine fontSize="small" color="primary" />
            </StackRow>
            <AppTypography variant="subtitle2">Featured Items</AppTypography>
            <AppTypography variant="caption" color="text.tertiary">
              ({selectedItems.length} / {allItems.length})
            </AppTypography>
          </StackRow>
          <AppButton
            variant="text"
            size="small"
            onClick={event => {
              event.stopPropagation();
              if (isAllSelected) {
                setSelectedItems([]);
              } else {
                setSelectedItems(allItems);
              }
            }}
          >
            {isAllSelected ? 'Unselect All' : 'Select All'}
          </AppButton>
        </StackRow>
      }
      titleProps={{ variant: 'subtitle2' }}
      isOpen={isOpen}
      onToggle={(_, expanded) => setIsOpen(expanded)}
    >
      <StackColumn gap={1}>
        <AppTypography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Click the &quot;Select All&quot; / &quot;Unselect All&quot; button - it won&apos;t toggle
          the accordion.
        </AppTypography>
        {allItems.map(item => (
          <StackRow key={item} alignItems="center" gap={1}>
            <AppCheckbox
              name={item}
              checked={selectedItems.includes(item)}
              onChange={() => handleToggleItem(item)}
              label={item.charAt(0).toUpperCase() + item.slice(1).replace(/(\d)/, ' $1')}
            />
          </StackRow>
        ))}
      </StackColumn>
    </AppAccordion>
  );
};
export const WithActionButtons: Story = { render: () => <AccordionWithActionButtons /> };

// Pattern 6: Accordion with Delete Action
const AccordionWithDeleteAction = () => {
  const [conditions, setConditions] = useState([
    { id: 1, name: 'Minimum order amount', value: '$50' },
    { id: 2, name: 'Customer group', value: 'VIP Members' },
    { id: 3, name: 'Product category', value: 'Electronics' },
  ]);
  const handleRemove = (index: number) => setConditions(prev => prev.filter((_, i) => i !== index));

  return (
    <StackColumn gap={2} sx={{ minWidth: 400 }}>
      <AppTypography variant="body2" color="text.secondary">
        Click the delete button to remove an accordion. The delete action won&apos;t toggle the
        accordion.
      </AppTypography>
      {conditions.map((condition, index) => (
        <AppAccordion
          key={condition.id}
          title={
            <StackRow justifyContent="space-between" alignItems="center" flex={1}>
              <AppTypography variant="subtitle2">Condition {index + 1}</AppTypography>
              <AppIconButton
                hideBorder
                onClick={event => {
                  event.stopPropagation();
                  handleRemove(index);
                }}
              >
                <IconDeleteBinLine fontSize="small" color="action" />
              </AppIconButton>
            </StackRow>
          }
          titleProps={{ variant: 'subtitle2' }}
          accordionProps={{ defaultExpanded: index === 0 }}
        >
          <StackColumn gap={1}>
            <StackRow justifyContent="space-between">
              <AppTypography variant="body2" color="text.secondary">
                Type:
              </AppTypography>
              <AppTypography variant="body2">{condition.name}</AppTypography>
            </StackRow>
            <StackRow justifyContent="space-between">
              <AppTypography variant="body2" color="text.secondary">
                Value:
              </AppTypography>
              <AppTypography variant="body2">{condition.value}</AppTypography>
            </StackRow>
          </StackColumn>
        </AppAccordion>
      ))}
      {conditions.length === 0 && (
        <AppTypography variant="body2" color="text.tertiary" sx={{ textAlign: 'center', py: 4 }}>
          All conditions have been removed. Refresh to reset.
        </AppTypography>
      )}
    </StackColumn>
  );
};
export const WithDeleteAction: Story = { render: () => <AccordionWithDeleteAction /> };

// Pattern 7: Non-Interactive Accordion (Display Only)
const NonInteractiveAccordion = () => {
  const [freeShipping, setFreeShipping] = useState(false);
  return (
    <StackColumn gap={2} sx={{ minWidth: 400 }}>
      <AppTypography variant="body2" color="text.secondary">
        This accordion cannot be toggled by clicking the header. Only the switch controls expansion.
      </AppTypography>
      <AppAccordion
        title={
          <StackRow flex={1} justifyContent="space-between" alignItems="center">
            <AppTypography variant="body2">Free Shipping</AppTypography>
            <AppSwitch
              name="free_shipping"
              switchProps={{
                onChange: (_, checked) => setFreeShipping(checked),
                checked: freeShipping,
              }}
            />
          </StackRow>
        }
        unmountOnExit
        accordionSummaryProps={{
          expandIcon: undefined,
          sx: { h3: { cursor: 'default' } },
          slotProps: { content: { sx: { cursor: 'default' } } },
        }}
        isOpen={freeShipping}
      >
        <StackColumn gap={2}>
          <AppTypography variant="body2">
            Configure free shipping options for this discount.
          </AppTypography>
          <AppTypography variant="body2" color="text.secondary">
            When enabled, customers will receive free shipping on qualifying orders.
          </AppTypography>
        </StackColumn>
      </AppAccordion>
    </StackColumn>
  );
};
export const NonInteractive: Story = { render: () => <NonInteractiveAccordion /> };

// Simulating async data loading
const LoadingSimulation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (_: React.SyntheticEvent, expanded: boolean) => {
    setIsOpen(expanded);
    if (expanded) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <AppAccordion
      title="Load Data on Expand"
      description="Click to expand and simulate loading data"
      isOpen={isOpen}
      onToggle={handleToggle}
      isDetailsLoading={isLoading}
    >
      <StackColumn gap={1}>
        <AppTypography variant="body2">Data loaded successfully!</AppTypography>
        <AppTypography variant="body2" color="text.secondary">
          This content appeared after a 2-second loading simulation.
        </AppTypography>
      </StackColumn>
    </AppAccordion>
  );
};

export const LoadingSimulationStory: Story = {
  render: () => <LoadingSimulation />,
};

export const DisabledState: Story = {
  render: () => (
    <StackColumn width={400} gap={2}>
      <Box>
        <AppAccordion
          title="Disabled Accordion (Closed)"
          description="This accordion is disabled and cannot be interacted with"
          disable={true}
        >
          <AppTypography>This content is hidden</AppTypography>
        </AppAccordion>
      </Box>

      <Box>
        <AppAccordion
          isOpen={true}
          title="Disabled Accordion (Open)"
          description="This accordion is disabled while open and cannot be collapsed"
          disable={true}
        >
          <AppTypography>
            This content is visible but the accordion cannot be collapsed
          </AppTypography>
        </AppAccordion>
      </Box>
    </StackColumn>
  ),
};
