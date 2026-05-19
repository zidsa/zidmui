import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/user-faces/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'user-faces',
);

const UserFacesIcons = () => <IconsDisplay icons={icons} categoryName="User & Faces" />;

//
//

const meta = {
  title: 'Design System/Icons/User & Faces',
  component: UserFacesIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof UserFacesIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllUserFaces: Story = {};
