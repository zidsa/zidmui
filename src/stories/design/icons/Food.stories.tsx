import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/food/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'food');

const FoodIcons = () => <IconsDisplay icons={icons} categoryName="Food" />;

//
//

const meta = {
  title: 'Design System/Icons/Food',
  component: FoodIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FoodIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFood: Story = {};
