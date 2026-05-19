import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/finance/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'finance');

const FinanceIcons = () => <IconsDisplay icons={icons} categoryName="Finance" />;

//
//

const meta = {
  title: 'Design System/Icons/Finance',
  component: FinanceIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FinanceIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFinance: Story = {};
