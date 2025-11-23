import React from 'react';

import {
  ListItem,
  ListItemIcon,
  ListItemIconProps,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
  styled,
} from '@mui/material';

import { AppIconWithTooltip } from './app-icon-with-tooltip';
import { AppOverflownTextWithTooltip } from './app-overflown-text-with-tooltip';
import { AppTypographyProps, AppTypography } from './app-typography';
import { StackRow } from './stack-row';

//
//

export type AppListItemProps = {
  icon?: React.ReactNode;
  iconProps?: ListItemIconProps;
  textLabel?: React.ReactNode;
  textLabelProps?: ListItemTextProps;
  textDescription?: React.ReactNode;
  textContent?: React.ReactNode;
  textContentProps?: AppTypographyProps;
  children?: React.ReactNode;
  labelSuffix?: React.ReactNode;
  tooltip?: string;
} & Omit<ListItemProps, 'value'>;

export const AppListItem = ({
  icon,
  iconProps,
  textLabel,
  textDescription,
  textLabelProps = {},
  textContent,
  textContentProps,
  children,
  labelSuffix,
  tooltip,
  ...props
}: AppListItemProps) => {
  if (typeof textDescription === 'string') {
    textLabelProps.secondary = (
      <AppOverflownTextWithTooltip
        title={textDescription}
        typographyProps={{ variant: 'body2', color: 'text.tertiary' }}
        twoLines
      />
    );
  } else if (textDescription) {
    textLabelProps.secondary = (
      <AppTypography variant="caption" color="text.tertiary">
        {textDescription}
      </AppTypography>
    );
  }

  //

  if (typeof textLabel === 'string') {
    textLabel = (
      <AppOverflownTextWithTooltip
        title={textLabel}
        typographyProps={{ variant: 'body2', color: 'text.secondary' }}
      />
    );
  } else {
    textLabel = (
      <AppTypography variant="body2" color="text.secondary">
        {textLabel}
      </AppTypography>
    );
  }

  if (labelSuffix) {
    textLabel = (
      <StackRow overflow="hidden">
        {textLabel}
        {labelSuffix}
      </StackRow>
    );
  }

  //

  if (typeof textContent === 'string') {
    textContent = (
      <AppOverflownTextWithTooltip
        title={textContent}
        typographyProps={{ variant: 'body2', color: 'text.secondary' }}
        twoLines
      />
    );
  } else if (textContent) {
    textContent = (
      <AppTypography variant="body2" color="text.secondary">
        {textContent}
      </AppTypography>
    );
  }

  return (
    <ListItemStyled {...props}>
      {icon && <ListItemIcon {...iconProps}>{icon}</ListItemIcon>}
      {(textLabel || textLabelProps) && (
        <ListItemText
          primary={
            <StackRow gap={0.75}>
              {textLabel}

              {tooltip && (
                <AppIconWithTooltip title={tooltip} iconProps={{ sx: { fontSize: 16 } }} />
              )}
            </StackRow>
          }
          {...textLabelProps}
        />
      )}
      {textContent && (
        <AppTypography variant="body2" color="text.secondary" {...textContentProps}>
          {textContent}
        </AppTypography>
      )}
      {children}
    </ListItemStyled>
  );
};

type AppListItemContentProps = AppTypographyProps;

export const AppListItemContent: React.FC<AppListItemContentProps> = ({ children, ...props }) => {
  return (
    <AppTypography variant="body2" color="text.secondary" {...props}>
      {children}
    </AppTypography>
  );
};

//

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  '.MuiListItemText-root': {
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    margin: theme.spacing(0.125),
  },
}));
