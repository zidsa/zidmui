import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AppAccordion } from '~/components/app-accordion';
import type { AppAccordionProps } from '~/components/app-accordion';

//
//

// Wrapper component with state management
const AccordionWithState = (args: AppAccordionProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? false);

  return <AppAccordion {...args} isOpen={isOpen} onToggle={(_, expanded) => setIsOpen(expanded)} />;
};

// Meta
const meta = {
  title: 'React/App Accordion',
  component: AppAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning', 'info', 'neutral'],
    },
    unmountOnExit: {
      control: 'boolean',
    },
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

//

export const Default: Story = {};

//

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

//

export const WithDescription: Story = {
  args: {
    isOpen: true,
    title: 'Accordion with Description',
    description: 'This description provides additional context about the accordion content',
  },
};

//

export const WithCustomContent: Story = {
  args: {
    isOpen: true,
    children: (
      <div>
        <h4>Custom Content</h4>
        <p>This is custom JSX content inside the accordion.</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    ),
  },
};

//

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

//

export const PrimaryColor: Story = {
  args: {
    isOpen: true,
    color: 'primary',
    title: 'Primary Color Accordion',
    description: 'This accordion uses the primary color variant when expanded',
    children: <div>Content with primary color styling</div>,
  },
};

//

export const SuccessColor: Story = {
  args: {
    isOpen: true,
    color: 'success',
    title: 'Success Color Accordion',
    description: 'This accordion uses the success color variant when expanded',
    children: <div>Content with success color styling</div>,
  },
};

//

export const ErrorColor: Story = {
  args: {
    isOpen: true,
    color: 'error',
    title: 'Error Color Accordion',
    description: 'This accordion uses the error color variant when expanded',
    children: <div>Content with error color styling</div>,
  },
};

//

export const WarningColor: Story = {
  args: {
    isOpen: true,
    color: 'warning',
    title: 'Warning Color Accordion',
    description: 'This accordion uses the warning color variant when expanded',
    children: <div>Content with warning color styling</div>,
  },
};

//

export const InfoColor: Story = {
  args: {
    isOpen: true,
    color: 'info',
    title: 'Info Color Accordion',
    description: 'This accordion uses the info color variant when expanded',
    children: <div>Content with info color styling</div>,
  },
};

//

export const NeutralColor: Story = {
  args: {
    isOpen: true,
    color: 'neutral',
    title: 'Neutral Color Accordion',
    description: 'This accordion uses the neutral color variant when expanded',
    children: <div>Content with neutral color styling</div>,
  },
};
