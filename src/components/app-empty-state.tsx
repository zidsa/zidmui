import React, { FC } from 'react';

import { Box, type BoxProps, type SvgIconProps, useTheme } from '@mui/material';
import { AppTypographyProps, AppTypography } from './app-typography';
import { StackColumn } from './stack-column';
import { StackRow } from './stack-row';

//
//

export interface AppEmptyStateProps {
  size?: 'standard' | 'small';
  variant?: 'default' | 'error' | 'warning' | 'success';

  title?: React.ReactNode;
  titleProps?: AppTypographyProps;

  icon?: React.ReactElement<SvgIconProps>;
  iconProps?: SvgIconProps;
  iconBoxProps?: BoxProps;
  customIconComponent?: React.ReactElement<SvgIconProps>;

  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;

  subDescription?: React.ReactNode;
  subDescriptionProps?: AppTypographyProps;

  imageUrl?: string;
  imageProps?: BoxProps;

  children?: React.ReactNode;
  containerProps?: BoxProps;
}

export const AppEmptyState: FC<AppEmptyStateProps> = ({
  size = 'small',
  variant = 'default',

  title,
  titleProps,
  description,
  descriptionProps,

  subDescription,
  subDescriptionProps,

  icon,
  iconProps,
  iconBoxProps,
  customIconComponent,

  imageUrl,
  imageProps,

  children,
  containerProps,
}) => {
  const isBoxImage = icon?.props?.component === 'img';

  const theme = useTheme();

  let iconSize: SvgIconProps['fontSize'] = 'large';
  let titleSize: AppTypographyProps['variant'] = 'h4';
  let iconBoxSize = 120;
  let iconColor: SvgIconProps['color'] = 'action';

  const iconBoxVariantProps = {
    bgcolor: '_components.iconButton.primary.hover',
    border: `none`,
  };

  if (size === 'small') {
    iconSize = 'medium';
    titleSize = 'h6';
    iconBoxSize = 100;
  }

  if (variant === 'error') {
    iconBoxVariantProps.bgcolor = theme.palette._components.alert.error.background;
    iconBoxVariantProps.border = `1px solid ${theme.palette._components.alert.error.border}`;
    iconColor = 'error';
  }

  if (variant === 'warning') {
    iconBoxVariantProps.bgcolor = theme.palette._components.alert.warning.background;
    iconBoxVariantProps.border = `1px solid ${theme.palette._components.alert.warning.border}`;
  }

  if (variant === 'success') {
    iconBoxVariantProps.bgcolor = theme.palette._components.alert.success.background;
    iconBoxVariantProps.border = `1px solid ${theme.palette._components.alert.success.border}`;
  }

  return (
    <Box
      width="100%"
      height="100%"
      rowGap={size === 'small' ? 2 : 3}
      px={2}
      py={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...containerProps}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          width={240}
          height={160}
          bgcolor="_components.emptyState.imageBackground"
          {...imageProps}
        />
      ) : icon && !isBoxImage ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={99}
          width={iconBoxSize}
          height={iconBoxSize}
          maxWidth={iconBoxSize}
          maxHeight={iconBoxSize}
          {...iconBoxVariantProps}
          {...iconBoxProps}
        >
          {React.cloneElement(icon, { fontSize: iconSize, color: iconColor, ...iconProps })}
        </Box>
      ) : icon && isBoxImage ? (
        icon
      ) : (
        customIconComponent
      )}
      {(title || description || subDescription) && (
        <StackColumn gap={size === 'small' ? 0 : 0.5} maxWidth={600} textAlign="center">
          {title && (
            <AppTypography variant={titleSize} {...titleProps}>
              {title}
            </AppTypography>
          )}
          {description && (
            <AppTypography variant="body2" color="textTertiary" {...descriptionProps}>
              {description}
            </AppTypography>
          )}
          {subDescription && (
            <AppTypography mt={3} variant="body2" color="textTertiary" {...subDescriptionProps}>
              {subDescription}
            </AppTypography>
          )}
        </StackColumn>
      )}
      {children && <StackRow>{children}</StackRow>}
    </Box>
  );
};
