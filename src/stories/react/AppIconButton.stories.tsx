import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIconButton } from '~/components/app-icon-button';
import { IconSettingsLine } from '~/icons/system/settings-line';
import { IconDeleteBinLine } from '~/icons/system/delete-bin-line';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Icon Button',
  component: AppIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  render: () => (
    <StackColumn gap={3}>
      {/* Primary */}
      <StackColumn direction="row" gap={2} alignItems="center">
        <AppIconButton color="primary" size="large">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="medium">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="small">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="extraSmall">
          <IconSettingsLine />
        </AppIconButton>
      </StackColumn>

      {/* Secondary */}
      <StackColumn direction="row" gap={2} alignItems="center">
        <AppIconButton color="secondary" size="large">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="secondary" size="medium">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="secondary" size="small">
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="secondary" size="extraSmall">
          <IconSettingsLine />
        </AppIconButton>
      </StackColumn>

      {/* Error */}
      <StackColumn direction="row" gap={2} alignItems="center">
        <AppIconButton color="error" size="large">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="error" size="medium">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="error" size="small">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="error" size="extraSmall">
          <IconDeleteBinLine />
        </AppIconButton>
      </StackColumn>

      {/* Default */}
      <StackColumn direction="row" gap={2} alignItems="center">
        <AppIconButton color="default" size="large">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="default" size="medium">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="default" size="small">
          <IconDeleteBinLine />
        </AppIconButton>

        <AppIconButton color="default" size="extraSmall">
          <IconDeleteBinLine />
        </AppIconButton>
      </StackColumn>

      {/* Loading */}
      <StackColumn direction="row" gap={2} alignItems="center">
        <AppIconButton color="primary" size="large" loading>
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="medium" loading>
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="small" loading>
          <IconSettingsLine />
        </AppIconButton>

        <AppIconButton color="primary" size="extraSmall" loading>
          <IconSettingsLine />
        </AppIconButton>
      </StackColumn>
    </StackColumn>
  ),
  args: {},
};
