import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '@mui/material';

import { AppIconBox } from '~/components/app-icon-box';
import { IconShoppingCartLine } from '~/icons/finance/shopping-cart-line';

//
//

const meta = {
  title: 'React/App Icon Box',
  component: AppIconBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['default', 'primary', 'blue', 'red', 'green', 'yellow', 'orange', 'secondary'],
    },
  },
} satisfies Meta<typeof AppIconBox>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Playground: Story = {
  args: {
    background: 'primary',
    children: <IconShoppingCartLine />,
  },
};

export const Variants: Story = {
  args: { children: null },
  render: () => (
    <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" justifyContent="center">
      <AppIconBox background="default">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="primary">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="blue">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="red">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="green">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="yellow">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="orange">
        <IconShoppingCartLine />
      </AppIconBox>
      <AppIconBox background="secondary">
        <IconShoppingCartLine />
      </AppIconBox>
    </Stack>
  ),
};
