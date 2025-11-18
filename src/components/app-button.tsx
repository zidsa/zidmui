import React from 'react';

import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

//
//

type PrimaryDarkButtonProps = {
  color: 'primaryDark';
  variant: 'text' | 'contained';
};

type PrimaryLightButtonProps = {
  color: 'primaryLight';
  variant: 'contained';
};

type PrimaryButtonProps = {
  color: 'primary';
  variant: 'contained';
};

type SecondaryButtonProps = {
  color: 'secondary';
  variant: 'text' | 'outlined';
};

type ErrorButtonProps = {
  color: 'error';
  variant: 'text' | 'outlined' | 'contained';
};

type NoColorButtonProps = {
  color?: undefined;
  variant?: 'text' | 'outlined' | 'contained';
};

type TertiaryButtonProps = {
  color: 'tertiary';
  variant?: 'contained' | 'outlined';
};

export type AppButtonProps = Omit<ButtonProps, 'color' | 'variant'> & {
  content?: React.ReactNode;
  tooltip?: string | null;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
} & (
    | PrimaryButtonProps
    | SecondaryButtonProps
    | ErrorButtonProps
    | NoColorButtonProps
    | PrimaryDarkButtonProps
    | PrimaryLightButtonProps
    | TertiaryButtonProps
  );

export const AppButton = ({
  ref,
  variant = 'contained',
  color,
  children,
  content,
  tooltip,
  tooltipProps,
  ...props
}: AppButtonProps) => {
  const resolvedColor =
    color ||
    (() => {
      switch (variant) {
        case 'outlined':
        case 'text':
          return 'secondary';
        case 'contained':
        default:
          return 'primary';
      }
    })();

  const element = (
    <Button component="button" color={resolvedColor} variant={variant} ref={ref} {...props}>
      <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {children}
        {content}
      </Box>
    </Button>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="bottom" disableInteractive {...tooltipProps}>
      {element}
    </Tooltip>
  ) : (
    element
  );
};

AppButton.displayName = 'AppButton';
