import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, ClickAwayListener, styled, useTheme } from '@mui/material';

import { AppButton } from '../components/app-button';
import { AppTooltip, AppTooltipProps } from '../components/app-tooltip';
import { AppTypography } from '../components/app-typography';
import { StackColumn } from '../components/stack-column';
import { StackRow } from '../components/stack-row';
import { useToggle } from '../hooks/use-toggle';

//
//

// Meta
const meta = {
  title: 'App Tooltip',
  component: AppTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    arrow: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AppTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  args: {
    headline: 'Total sales over time',
    description: 'Amount spent (subtotal, taxes, shipping, returns, discounts, fees, etc.)',
    children: <></>,
    placement: 'top',
  },
  render: args => <AppTooltips {...args} />,
};

//

const AppTooltips = (props: AppTooltipProps) => {
  const toggle = useToggle();
  const theme = useTheme();

  return (
    <StackRow gap={4}>
      <StackColumn gap={4}>
        <AppTooltip {...props} description="">
          <AppButton variant="outlined">Default</AppButton>
        </AppTooltip>

        <AppTooltip disableFocusListener {...props} headline="">
          <AppButton variant="outlined">Hover or touch</AppButton>
        </AppTooltip>

        <AppTooltip disableHoverListener {...props}>
          <AppButton variant="outlined">Focus or touch</AppButton>
        </AppTooltip>

        <AppTooltip disableFocusListener disableTouchListener {...props}>
          <AppButton variant="outlined">Hover</AppButton>
        </AppTooltip>

        <ClickAwayListener onClickAway={toggle.off}>
          <AppTooltip
            onClose={toggle.off}
            open={toggle.value}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            slotProps={{
              popper: {
                disablePortal: true,
              },
            }}
            {...props}
          >
            <AppButton variant="outlined" onClick={toggle.on}>
              Click
            </AppButton>
          </AppTooltip>
        </ClickAwayListener>
      </StackColumn>

      {/*  */}

      <StackColumn gap={4}>
        <AppTooltip {...props} headline="This is headline only" description="">
          <AppButton variant="outlined">Headline only</AppButton>
        </AppTooltip>

        <AppTooltip {...props} headline="" description="This is description only">
          <AppButton variant="outlined">Description only</AppButton>
        </AppTooltip>

        <AppTooltip
          {...props}
          headline="This is headline and description"
          description="This is description"
        >
          <AppButton variant="outlined">Headline and description</AppButton>
        </AppTooltip>

        <AppTooltip {...props} headline="This is headline and description">
          <AppButton variant="outlined">Headline and description</AppButton>
        </AppTooltip>

        <AppTooltip
          {...props}
          content={
            <Box>
              <DescriptionTypography component="span" color={theme.palette.colors.green[400]}>
                Total sales ={' '}
              </DescriptionTypography>
              <DescriptionTypography component="span" color={theme.palette.colors.primary[400]}>
                net sales + additonal fees + duties + shipping charges + taxes
              </DescriptionTypography>
            </Box>
          }
        >
          <AppButton variant="outlined">With custom content</AppButton>
        </AppTooltip>
      </StackColumn>
    </StackRow>
  );
};

//

const DescriptionTypography = styled(AppTypography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: theme.spacing(1.5),
}));
