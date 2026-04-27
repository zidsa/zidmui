import React from 'react';

import { AppTypography, type AppTypographyProps } from './app-typography';

import { type Theme, SxProps, Card, CardContent } from '@mui/material';
import { StackRow, StackRowProps } from './stack-row';
import { StackColumn } from './stack-column';

//
//

export type AppCardColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type AppCardCorners = 'grouped' | 'all';

export type AppCardProps = {
  children?: React.ReactNode;
  color?: AppCardColor;
  roundedCorners?: AppCardCorners;
  title?: string | React.ReactNode;
  titleContainerProps?: StackRowProps;
  titleProps?: AppTypographyProps;
  titlePrefix?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  titleAction?: React.ReactNode;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  sx?: SxProps<Theme>;
  loading?: boolean;
  actions?: React.ReactElement | null | (React.ReactElement | null)[];
  actionsProps?: StackRowProps;
};

export const AppCard: React.FC<AppCardProps> = ({
  color,
  title,
  description,
  descriptionProps,
  titleContainerProps,
  titleProps,
  titleSuffix,
  titleAction,
  titlePrefix,
  children,
  actions,
  actionsProps,
  loading,
  ...props
}) => {
  const hasActions = Boolean(actions && React.Children.toArray(actions)?.length > 0);

  return (
    <Card color={color} {...props}>
      <StackRow alignItems="center" gap={1} p={1.5} pb={0} width="100%" {...titleContainerProps}>
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

        <StackRow>{titleAction}</StackRow>
      </StackRow>

      <CardContent>
        {children}

        {hasActions && !loading && (
          <StackRow justifyContent="end" {...actionsProps}>
            {actions}
          </StackRow>
        )}
      </CardContent>
    </Card>
  );
};
