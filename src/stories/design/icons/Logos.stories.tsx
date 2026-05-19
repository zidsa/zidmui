import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/logos/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'logos');

const LogosIcons = () => <IconsDisplay icons={icons} categoryName="Logos" />;

//
//

const meta = {
  title: 'Design System/Icons/Logos',
  component: LogosIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof LogosIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLogos: Story = {};
