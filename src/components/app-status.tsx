import React from 'react';

import { styled, ChipProps, Chip, TooltipProps, Tooltip } from '@mui/material';

//
//

type AppStatusColor =
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

  const element = <StatusElement ref={ref} size={size} data-color={color} {...props} />;

  //

  if (!tooltip) return element;

  return (
    <Tooltip title={tooltip} placement="top" disableInteractive enterDelay={700} {...tooltipProps}>
      {element}
    </Tooltip>
  );
};

AppStatus.displayName = 'AppStatus';

//

const StatusElement = styled(Chip)(({ theme }) => ({
  '&[data-color="success"]': {
    backgroundColor: theme.palette.colors.green[300],
    color: theme.palette.colors.green[900],
  },
  '&[data-color="error"]': {
    backgroundColor: theme.palette.colors.red[200],
    color: theme.palette.colors.red[900],
  },
  '&[data-color="warning"]': {
    backgroundColor: theme.palette.colors.yellow[300],
    color: theme.palette.colors.yellow[1000],
  },
  '&[data-color="neutral"]': {
    backgroundColor: theme.palette.colors.neutrals[100],
    color: theme.palette.colors.neutrals[600],
  },
  '&[data-color="disabled"]': {
    backgroundColor: theme.palette.colors.neutrals[50],
    color: theme.palette.colors.neutrals[400],
  },
  '&[data-color="info"]': {
    backgroundColor: theme.palette.colors.primary[200],
    color: theme.palette.colors.primary[800],
  },
  '&[data-color="orange"]': {
    backgroundColor: theme.palette.colors.orange[200],
    color: theme.palette.colors.orange[700],
  },
  '&[data-color="blue"]': {
    backgroundColor: theme.palette.colors.blue[300],
    color: theme.palette.colors.blue[900],
  },
}));
