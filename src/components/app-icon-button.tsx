import React from 'react';

import { Box, IconButton, type IconButtonProps } from '@mui/material';
import { AppTooltip, AppTooltipProps } from './app-tooltip';

//
//

export type AppIconButtonProps = Omit<IconButtonProps, 'component'> & {
  content?: React.ReactNode;
  href?: string;
  tooltip?: string | null;
  tooltipProps?: Omit<AppTooltipProps, 'children' | 'title'>;
  hideBorder?: boolean;
};

export const AppIconButton = ({
  ref,
  color = 'secondary',
  size = 'small',
  children,
  content,
  tooltip,
  tooltipProps,
  sx,
  hideBorder,
  ...props
}: AppIconButtonProps) => {
  const mergedSx = { ...sx, ...(hideBorder && { border: 'none' }) };

  const button = (
    <IconButton component="button" color={color} size={size} ref={ref} sx={mergedSx} {...props}>
      {children}
      {content}
    </IconButton>
  );

  if (!tooltip) return button;

  return (
    <AppTooltip description={tooltip} disableInteractive {...tooltipProps}>
      <Box>{button}</Box>
    </AppTooltip>
  );
};

AppIconButton.displayName = 'AppIconButton';
