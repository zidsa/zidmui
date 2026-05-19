import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/design/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'design');

const DesignIcons = () => <IconsDisplay icons={icons} categoryName="Design" />;

//
//

const meta = {
  title: 'Design System/Icons/Design',
  component: DesignIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DesignIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllDesign: Story = {};
