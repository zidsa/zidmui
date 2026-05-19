import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/weather/*.tsx', { eager: true });
const icons = getIconsFromModule(iconModules as Record<string, Record<string, unknown>>, 'weather');

const WeatherIcons = () => <IconsDisplay icons={icons} categoryName="Weather" />;

//
//

const meta = {
  title: 'Design System/Icons/Weather',
  component: WeatherIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllWeather: Story = {};
