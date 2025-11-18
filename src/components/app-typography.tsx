import React from 'react';

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { TypographyVariant } from '@mui/material/styles';

//
//

export type AppTypographyProps = Omit<TypographyProps, 'fontSize' | 'fontWeight' | 'fontStyle'> & {
  variant?: TypographyVariant;
  tooltip?: string | null;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
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
    <Tooltip
      title={tooltip}
      placement="bottom"
      disableInteractive
      enterDelay={700}
      slotProps={{
        popper: { modifiers: [{ name: 'offset', options: { offset: [0, -12] } }] },
      }}
      {...tooltipProps}
    >
      {element}
    </Tooltip>
  ) : (
    element
  );
};

AppTypography.displayName = 'AppTypography';
