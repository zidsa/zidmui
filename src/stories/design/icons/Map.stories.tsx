import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/map/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'map');

const MapIcons = () => <IconsDisplay icons={icons} categoryName="Map" />;

//
//

const meta = {
  title: 'Design System/Icons/Map',
  component: MapIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof MapIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllMap: Story = {};
