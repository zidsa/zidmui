import React from 'react';

import { styled, ChipProps, Chip, TooltipProps } from '@mui/material';

import { AppTooltip } from './app-tooltip';

//
//

export type AppStatusColor =
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
        backgroundColor: theme.palette.colors.green[300],
        color: theme.palette.colors.green[900],
      }
    : undefined),
  ...(color2 === 'error'
    ? {
        backgroundColor: theme.palette.colors.red[200],
        color: theme.palette.colors.red[900],
      }
    : undefined),
  ...(color2 === 'warning'
    ? {
        backgroundColor: theme.palette.colors.yellow[300],
        color: theme.palette.colors.yellow[1000],
      }
    : undefined),
  ...(color2 === 'neutral'
    ? {
        backgroundColor: theme.palette.colors.neutral[100],
        color: theme.palette.colors.neutral[600],
      }
    : undefined),
  ...(color2 === 'disabled'
    ? {
        backgroundColor: theme.palette.colors.neutral[50],
        color: theme.palette.colors.neutral[400],
      }
    : undefined),
  ...(color2 === 'info'
    ? {
        backgroundColor: theme.palette.colors.primary[200],
        color: theme.palette.colors.primary[800],
      }
    : undefined),
  ...(color2 === 'orange'
    ? {
        backgroundColor: theme.palette.colors.orange[200],
        color: theme.palette.colors.orange[700],
      }
    : undefined),
  ...(color2 === 'blue'
    ? {
        backgroundColor: theme.palette.colors.blue[300],
        color: theme.palette.colors.blue[900],
      }
    : undefined),
}));
