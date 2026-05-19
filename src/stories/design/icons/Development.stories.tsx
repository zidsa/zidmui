import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/development/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'development',
);

const DevelopmentIcons = () => <IconsDisplay icons={icons} categoryName="Development" />;

//
//

const meta = {
  title: 'Design System/Icons/Development',
  component: DevelopmentIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DevelopmentIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllDevelopment: Story = {};
