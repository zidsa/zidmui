import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/editor/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'editor');

const EditorIcons = () => <IconsDisplay icons={icons} categoryName="Editor" />;

//
//

const meta = {
  title: 'Design System/Icons/Editor',
  component: EditorIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllEditor: Story = {};
