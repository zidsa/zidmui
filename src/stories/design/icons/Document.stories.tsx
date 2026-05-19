import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/document/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'document',
);

const DocumentIcons = () => <IconsDisplay icons={icons} categoryName="Document" />;

//
//

const meta = {
  title: 'Design System/Icons/Document',
  component: DocumentIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllDocument: Story = {};
