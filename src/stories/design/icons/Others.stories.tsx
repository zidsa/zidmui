import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/others/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'others');

const OthersIcons = () => <IconsDisplay icons={icons} categoryName="Others" />;

//
//

const meta = {
  title: 'Design System/Icons/Others',
  component: OthersIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof OthersIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOthers: Story = {};
