import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/game-sports/*.tsx', { eager: true });
const allOthersIcons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'others',
);

// Filter only game & sports related icons
const gameKeywords = [
  'basketball',
  'billiards',
  'boxing',
  'football',
  'game',
  'golf',
  'ping-pong',
  'sword',
  'dice',
  'baseball',
  'chess',
  'piano',
  'poker',
  'target',
];

const icons = allOthersIcons.filter(icon =>
  gameKeywords.some(keyword => icon.name.includes(keyword)),
);

const GameSportsIcons = () => <IconsDisplay icons={icons} categoryName="Game & Sports" />;

//
//

const meta = {
  title: 'Design System/Icons/Game & Sports',
  component: GameSportsIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof GameSportsIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllGameSports: Story = {};
