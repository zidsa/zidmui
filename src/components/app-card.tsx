import React from 'react';

import { AppTypography, type AppTypographyProps } from './app-typography';

import { type Theme, SxProps, Card, CardContent, Divider, CardContentProps } from '@mui/material';
import { StackRow, StackRowProps } from './stack-row';
import { StackColumn, StackColumnProps } from './stack-column';
import { styled } from '@mui/material/styles';

//
//

export type AppCardColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type AppCardCorners = 'grouped' | 'all';

export type AppCardProps = {
  children?: React.ReactNode;
  color?: AppCardColor;
  roundedCorners?: AppCardCorners;
  title?: string | React.ReactNode;
  headerProps?: StackRowProps;
  titleContainerProps?: StackColumnProps;
  titleProps?: AppTypographyProps;
  titlePrefix?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  titleAction?: React.ReactNode;
  titleDivider?: boolean;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  sx?: SxProps<Theme>;
  loading?: boolean;
  actions?: React.ReactElement | null | (React.ReactElement | null)[];
  actionsProps?: StackRowProps;
  cardContentProps?: CardContentProps;
};

export const AppCard: React.FC<AppCardProps> = ({
  color,
  title,
  description,
  descriptionProps,
  headerProps,
  titleContainerProps,
  titleProps,
  titleSuffix,
  titleAction,
  titleDivider,
  titlePrefix,
  children,
  actions,
  actionsProps,
  loading,
  cardContentProps,
  ...props
}) => {
  const hasActions = Boolean(actions && React.Children.toArray(actions)?.length > 0);

  return (
    <Card color={color} {...props}>
      <CardHead {...headerProps}>
        {titlePrefix}
        {(!!title || !!description) && (
          <StackColumn gap={0.25} width="100%" {...titleContainerProps}>
            {typeof title === 'string' ? (
              <AppTypography variant="h6" color="text.primary" gap={1} {...titleProps}>
                {title} {titleSuffix ? titleSuffix : null}
              </AppTypography>
            ) : (
              title
            )}

            {titleDivider && <Divider />}

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
        )}
        {titleAction && <StackRow>{titleAction}</StackRow>}
      </CardHead>

      <CardContent {...cardContentProps}>
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

const CardHead = styled(StackRow)(({ theme }) => {
  return {
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    paddingBottom: 0,
    width: '100%',
    ':empty': {
      display: 'none',
    },
  };
});
