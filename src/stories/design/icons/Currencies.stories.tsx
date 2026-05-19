import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/currencies/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'currencies',
);

const CurrenciesIcons = () => <IconsDisplay icons={icons} categoryName="Currencies" />;

//
//

const meta = {
  title: 'Design System/Icons/Currencies',
  component: CurrenciesIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof CurrenciesIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCurrencies: Story = {};
