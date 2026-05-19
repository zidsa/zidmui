import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/device/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'device');

const DeviceIcons = () => <IconsDisplay icons={icons} categoryName="Device" />;

//
//

const meta = {
  title: 'Design System/Icons/Device',
  component: DeviceIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DeviceIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllDevice: Story = {};
