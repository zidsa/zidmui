import React from 'react';

import { styled, ChipProps, Chip, TooltipProps } from '@mui/material';

import { AppTooltip } from './app-tooltip';

//
//

export type AppStatusColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'default'
  | 'disabled'
  | 'info'
  | 'orange'
  | 'blue';

export type AppStatusProps = Omit<ChipProps, 'color' | 'variant' | 'size'> & {
  size?: 'small' | 'medium';
  color?: AppStatusColor;
  tooltip?: TooltipProps['title'];
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
};

export const AppStatus: React.FC<AppStatusProps> = ({
  ref,
  color = 'neutral',
  size = 'small',
  tooltip,
  tooltipProps,
  ...props
}) => {
  if (color === 'default') color = 'neutral';

  const element = <StatusElement color2={color} size={size} ref={ref} {...props} />;

  //

  if (!tooltip) return element;

  return (
    <AppTooltip description={tooltip} {...tooltipProps}>
      {element}
    </AppTooltip>
  );
};

AppStatus.displayName = 'AppStatus';

//

const StatusElement = styled(Chip, {
  shouldForwardProp: prop => prop !== 'color2',
})<{ color2?: AppStatusProps['color'] }>(({ theme, color2 = 'neutral' }) => ({
  ...(color2 === 'success'
    ? {
        backgroundColor: theme.palette._components.status.success.background,
        color: theme.palette._components.status.success.color,
      }
    : undefined),
  ...(color2 === 'error'
    ? {
        backgroundColor: theme.palette._components.status.error.background,
        color: theme.palette._components.status.error.color,
      }
    : undefined),
  ...(color2 === 'warning'
    ? {
        backgroundColor: theme.palette._components.status.warning.background,
        color: theme.palette._components.status.warning.color,
      }
    : undefined),
  ...(color2 === 'neutral'
    ? {
        backgroundColor: theme.palette._components.status.neutral.background,
        color: theme.palette._components.status.neutral.color,
      }
    : undefined),
  ...(color2 === 'disabled'
    ? {
        backgroundColor: theme.palette._components.status.disabled.background,
        color: theme.palette._components.status.disabled.color,
      }
    : undefined),
  ...(color2 === 'info'
    ? {
        backgroundColor: theme.palette._components.status.info.background,
        color: theme.palette._components.status.info.color,
      }
    : undefined),
  ...(color2 === 'orange'
    ? {
        backgroundColor: theme.palette._components.status.orange.background,
        color: theme.palette._components.status.orange.color,
      }
    : undefined),
  ...(color2 === 'blue'
    ? {
        backgroundColor: theme.palette._components.status.blue.background,
        color: theme.palette._components.status.blue.color,
      }
    : undefined),
  ...(color2 === 'primary'
    ? {
        backgroundColor: theme.palette._components.status.primary.background,
        color: theme.palette._components.status.primary.color,
      }
    : undefined),
}));
