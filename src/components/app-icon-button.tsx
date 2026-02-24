import React from 'react';

import Box from '@mui/material/Box';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
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
  ...props
}: AppIconButtonProps) => {
  if (!tooltip) {
    return (
      <IconButton component="button" color={color} size={size} ref={ref} sx={sx} {...props}>
        {children}
        {content}
      </IconButton>
    );
  }

  return (
    <AppTooltip description={tooltip} disableInteractive {...tooltipProps}>
      <Box>
        <IconButton component="button" color={color} size={size} ref={ref} sx={sx} {...props}>
          {children}
          {content}
        </IconButton>
      </Box>
    </AppTooltip>
  );
};

AppIconButton.displayName = 'AppIconButton';
