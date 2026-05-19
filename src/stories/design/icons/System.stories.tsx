import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/system/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'system');

const SystemIcons = () => <IconsDisplay icons={icons} categoryName="System" />;

//
//

const meta = {
  title: 'Design System/Icons/System',
  component: SystemIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SystemIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSystem: Story = {};
