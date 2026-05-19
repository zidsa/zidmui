import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/buildings/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'buildings',
);

const BuildingsIcons = () => <IconsDisplay icons={icons} categoryName="Buildings" />;

//
//

const meta = {
  title: 'Design System/Icons/Buildings',
  component: BuildingsIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof BuildingsIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBuildings: Story = {};
