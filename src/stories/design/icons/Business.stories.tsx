import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/business/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'business',
);

const BusinessIcons = () => <IconsDisplay icons={icons} categoryName="Business" />;

//
//

const meta = {
  title: 'Design System/Icons/Business',
  component: BusinessIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof BusinessIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBusiness: Story = {};
