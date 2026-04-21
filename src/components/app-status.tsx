import React from 'react';

import { ChipProps, Chip, TooltipProps } from '@mui/material';

import { AppTooltip } from './app-tooltip';

//
//

export type AppStatusProps = Omit<ChipProps, 'size'> & {
  size?: 'small' | 'medium';
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
  const element = <Chip color={color} size={size} ref={ref} {...props} />;

  //

  if (!tooltip) return element;

  return (
    <AppTooltip description={tooltip} {...tooltipProps}>
      {element}
    </AppTooltip>
  );
};
