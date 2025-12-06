import React from 'react';

import { Typography, TypographyProps, TypographyVariant } from '@mui/material';

import { AppTooltip, AppTooltipProps } from './app-tooltip';

//
//

export type AppTypographyProps = Omit<TypographyProps, 'fontSize' | 'fontWeight' | 'fontStyle'> & {
  variant?: TypographyVariant;
  tooltip?: string | null;
  tooltipProps?: Omit<AppTooltipProps, 'children'>;
};

export const AppTypography: React.FC<AppTypographyProps> = ({
  ref,
  children,
  variant = 'body1',
  tooltip,
  tooltipProps,
  ...props
}) => {
  const element = (
    <Typography ref={ref} {...props} variant={variant}>
      {children}
    </Typography>
  );

  return tooltip ? (
    <AppTooltip description={tooltip} {...tooltipProps}>
      {element}
    </AppTooltip>
  ) : (
    element
  );
};

AppTypography.displayName = 'AppTypography';
