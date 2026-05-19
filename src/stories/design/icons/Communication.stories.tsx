import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/communication/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'communication',
);

const CommunicationIcons = () => <IconsDisplay icons={icons} categoryName="Communication" />;

//
//

const meta = {
  title: 'Design System/Icons/Communication',
  component: CommunicationIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof CommunicationIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCommunication: Story = {};
