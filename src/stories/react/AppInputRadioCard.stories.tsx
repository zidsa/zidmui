import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '@mui/material';

import { AppInputRadioCard } from '~/components/app-input-radio-card';
import { StackColumn } from '~/components/stack-column';
import { IconStarLine } from '~/icons/system/star-line';

//
//

// Meta
const meta = {
  title: 'React/App Input Radio Card',
  component: AppInputRadioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
  args: {
    name: 'radioCard',
    value: 'option1',
    label: 'Radio Card Label',
  },
} satisfies Meta<typeof AppInputRadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    label: 'Only label',
  },
};

//

export const WithDescription: Story = {
  args: {
    label: 'Label and description',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

//

export const WithIcon: Story = {
  args: {
    label: 'With icon',
    description: 'This card has an icon on the right side.',
    icon: <IconStarLine />,
  },
};

//

export const Loading: Story = {
  args: {
    label: 'Loading state',
    description: 'This card is in loading state.',
    isLoading: true,
  },
};

//

export const Disabled: Story = {
  args: {
    label: 'Disabled card',
    description: 'This card is disabled.',
    disabled: true,
  },
};

//

export const RadioCardGroup: Story = {
  render: () => (
    <RadioGroup name="cardGroup">
      <StackColumn gap={3} width={300}>
        <AppInputRadioCard name="cardGroup" value="opt1" label="Option 1" />
        <AppInputRadioCard
          name="cardGroup"
          value="opt2"
          label="Option 2"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <AppInputRadioCard
          name="cardGroup"
          value="opt3"
          label="Option 3"
          description="Another description here."
        />
      </StackColumn>
    </RadioGroup>
  ),
};

//

const InteractiveComponent = () => {
  const [value, setValue] = useState('opt1');

  return (
    <RadioGroup name="interactiveCardGroup" value={value} onChange={e => setValue(e.target.value)}>
      <StackColumn gap={3} width={300}>
        <AppInputRadioCard name="interactiveCardGroup" value="opt1" label="Option 1" />
        <AppInputRadioCard
          name="interactiveCardGroup"
          value="opt2"
          label="Option 2"
          description="Lorem ipsum dolor sit amet."
        />
        <AppInputRadioCard
          name="interactiveCardGroup"
          value="opt3"
          label="Option 3"
          description="Another option with description."
        />
      </StackColumn>
    </RadioGroup>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};
