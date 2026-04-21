import React from 'react';

import { AppTypography, type AppTypographyProps } from './app-typography';

import { type Theme, SxProps, Card, CardContent } from '@mui/material';
import { StackRow } from './stack-row';
import { StackColumn } from './stack-column';

//
//

export type AppCardColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type AppCardCorners = 'grouped' | 'all';

export type AppCard = {
  children?: React.ReactNode;
  color?: AppCardColor;
  roundedCorners?: AppCardCorners;
  title?: string | React.ReactNode;
  titleProps?: AppTypographyProps;
  titlePrefix?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  sx?: SxProps<Theme>;
  loading?: boolean;
  actions?: React.ReactElement | null | (React.ReactElement | null)[];
};

export const AppCard: React.FC<AppCard> = ({
  color,
  title,
  description,
  descriptionProps,
  titleProps,
  titleSuffix,
  titlePrefix,
  children,
  actions,
  loading,
  ...props
}) => {
  const hasActions = Boolean(actions && React.Children.toArray(actions)?.length > 0);

  return (
    <Card color={color} {...props}>
      <StackColumn gap={1.25}>
        <StackRow alignItems="center" gap={1} p={1.5} pb={0} width="100%">
          {titlePrefix}

          <StackColumn gap={0.25} width="100%">
            {typeof title === 'string' ? (
              <AppTypography variant="subtitle1" color="text.primary" gap={1} {...titleProps}>
                {title} {titleSuffix ? titleSuffix : null}
              </AppTypography>
            ) : (
              title
            )}

            {description && (
              <AppTypography
                variant="body2"
                color="text.primary"
                whiteSpace="pre-line"
                {...descriptionProps}
              >
                {description}
              </AppTypography>
            )}
          </StackColumn>
        </StackRow>

        <CardContent>
          <StackColumn gap={2}>
            {children}

            {hasActions && !loading && <StackRow justifyContent="end">{actions}</StackRow>}
          </StackColumn>
        </CardContent>
      </StackColumn>
    </Card>
  );
};
