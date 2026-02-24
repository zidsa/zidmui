import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppEmptyState } from '~/components/app-empty-state';
import { AppButton } from '~/components/app-button';
import { IconErrorWarningLine } from '~/icons/system/error-warning-line';
import { IconLockLine } from '~/icons/system/lock-line';
import { IconStarLine } from '~/icons/system/star-line';

//
//

// Meta
const meta = {
  title: 'React/App Empty State',
  component: AppEmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['standard', 'small'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    subDescription: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AppEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    size: 'standard',
    icon: <IconStarLine />,
    title: 'Empty state title',
    description:
      'Some text explaining the state here and a nudge to take a corrective or guiding action',
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const PageNotFound: Story = {
  args: {
    icon: <IconErrorWarningLine />,
    variant: 'error',
    size: 'standard',
    title: 'Oops, page not found!',
    description: 'We are very sorry for inconvenience.',
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const PageNotFoundWithSubDescription: Story = {
  args: {
    icon: <IconErrorWarningLine />,
    variant: 'error',
    size: 'standard',
    title: 'Oops, page not found!',
    description: 'We are very sorry for inconvenience.',
    subDescription: 'Error Code: 404',
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const AccessDenied: Story = {
  args: {
    icon: <IconLockLine />,
    title: 'Access denied',
    variant: 'warning',
    size: 'standard',
    description: "You don't have permission to access this area or take this action",
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const SomethingWentWrong: Story = {
  args: {
    icon: <IconErrorWarningLine />,
    variant: 'error',
    size: 'standard',
    title: 'Something went wrong',
    description: "The page you are looking for doesn't exist or has been moved.",
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const SmallSize: Story = {
  args: {
    icon: <IconErrorWarningLine />,
    variant: 'error',
    size: 'small',
    title: 'Something went wrong',
    description: "The page you are looking for doesn't exist or has been moved.",
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const WithImage: Story = {
  args: {
    icon: <IconErrorWarningLine />,
    imageUrl: 'https://picsum.photos/200/300',
    variant: 'error',
    size: 'standard',
    title: 'Oops, page not found!',
    description: 'We are very sorry for inconvenience.',
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const NoDescription: Story = {
  args: {
    size: 'standard',
    icon: <IconStarLine />,
    title: 'Empty state title',
    children: (
      <>
        <AppButton color="secondary" variant="outlined">
          Secondary Action
        </AppButton>
        <AppButton variant="contained">Primary Action</AppButton>
      </>
    ),
  },
};

//

export const NoChildren: Story = {
  args: {
    size: 'standard',
    icon: <IconStarLine />,
    title: 'Empty state title',
    description:
      'Some text explaining the state here and a nudge to take a corrective or guiding action',
  },
};
