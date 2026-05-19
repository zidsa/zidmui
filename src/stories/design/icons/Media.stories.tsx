import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/media/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'media');

const MediaIcons = () => <IconsDisplay icons={icons} categoryName="Media" />;

//
//

const meta = {
  title: 'Design System/Icons/Media',
  component: MediaIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllMedia: Story = {};
