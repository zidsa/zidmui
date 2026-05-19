import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconsDisplay, getIconsFromModule } from './_shared';

//
//

const iconModules = import.meta.glob('../../../icons/health-medical/*.tsx', { eager: true });
const icons = getIconsFromModule(
  iconModules as Record<string, Record<string, unknown>>,
  'health-medical',
);

const HealthMedicalIcons = () => <IconsDisplay icons={icons} categoryName="Health & Medical" />;

//
//

const meta = {
  title: 'Design System/Icons/Health & Medical',
  component: HealthMedicalIcons,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof HealthMedicalIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllHealthMedical: Story = {};
