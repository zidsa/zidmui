import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/arrows/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'arrows');

const ArrowsIcons = () => <IconsDisplay icons={icons} categoryName="Arrows" />;

//
//

const meta = {
  title: 'Design System/Icons/Arrows',
  component: ArrowsIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowsIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllArrows: Story = {};
