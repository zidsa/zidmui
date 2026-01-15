import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppButton } from '../components/app-button';
import '../../partners/index.css';
import '../../partners/root.css';
import { StackColumn } from '../components/stack-column';
import { StackRow } from '../components/stack-row';

//
//

// Meta
const meta = {
  title: 'App Button',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
    disabled: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
    },
    tooltipProps: {
      control: 'object',
    },
  },
  args: {
    size: 'large',
    children: 'Text',
    disabled: false,
    tooltip: 'Tooltip sample',
    tooltipProps: {
      placement: 'top',
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Primary: Story = {
  argTypes: {
    color: {
      control: 'select',
      options: ['primary'],
    },
    variant: {
      control: 'select',
      options: ['contained'],
    },
  },
  args: {
    color: 'primary',
    variant: 'contained',
  },
  render: () => {
    return (
      <StackColumn>
        <p className="zid-typography-h1">Hello there</p>
        <p className="zid-typography-h2">Hello there</p>
        <p className="zid-typography-h3">Hello there</p>
        <p className="zid-typography-h4">Hello there</p>
        <p className="zid-typography-h5">Hello there</p>
        <p className="zid-typography-h6">Hello there</p>
        <p className="zid-typography-body1">Hello there</p>
        <p className="zid-typography-body2">Hello there</p>
        <p className="zid-typography-subtitle1">Hello there</p>
        <p className="zid-typography-subtitle2">Hello there</p>
        <p className="zid-typography-caption">Hello there</p>
        <StackRow>
          <button className="zid-button zid-button--small zid-button--primary zid-button--contained">
            Primary
          </button>
          <button className="zid-button zid-button--small zid-button--primary zid-button--outlined">
            Primary
          </button>
          <button className="zid-button zid-button--small zid-button--primary zid-button--text">
            Primary
          </button>
        </StackRow>

        <StackRow>
          <button className="zid-button zid-button--medium zid-button--primary zid-button--contained">
            Primary
          </button>
          <button className="zid-button zid-button--medium zid-button--primary zid-button--outlined">
            Primary
          </button>
          <button className="zid-button zid-button--medium zid-button--primary zid-button--text">
            Primary
          </button>
        </StackRow>

        <StackRow>
          <button className="zid-button zid-button--large zid-button--primary zid-button--contained">
            Primary
          </button>
          <button className="zid-button zid-button--large zid-button--primary zid-button--outlined">
            Primary
          </button>
          <button className="zid-button zid-button--large zid-button--primary zid-button--text">
            Primary
          </button>
        </StackRow>

        <StackRow>
          <input className="zid-input zid-input--small zid-input--outlined" />
        </StackRow>

        <StackRow>
          <div className="zid-chip zid-chip--outlined zid-chip--small">Chip</div>
          <div className="zid-chip zid-chip--filled zid-chip--small">Chip</div>

          <div className="zid-chip zid-chip--outlined zid-chip--medium">Chip</div>
          <div className="zid-chip zid-chip--filled zid-chip--medium">Chip</div>

          <div className="zid-chip zid-chip--info zid-chip--filled">Chip</div>
          <div className="zid-chip zid-chip--success zid-chip--filled">Chip</div>
        </StackRow>
      </StackColumn>
    );
  },
};

//

export const Secondary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined'],
    },
  },
  args: {
    color: 'secondary',
    variant: 'outlined',
  },
};

//

export const Tertiary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined'],
    },
  },
  args: {
    color: 'tertiary',
    variant: 'contained',
  },
};

//

export const Error: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
  },
  args: {
    color: 'error',
    variant: 'contained',
  },
};
