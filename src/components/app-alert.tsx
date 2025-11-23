import { Alert, AlertProps, AlertTitle, AlertTitleProps, CircularProgress } from '@mui/material';

import { AppButton, AppButtonProps } from './app-button';
import { AppTypography } from './app-typography';
import { StackColumn } from './stack-column';
import { StackRow } from './stack-row';

//
//

export type AppAlertProps = {
  title?: string | React.ReactNode;
  titleProps?: AlertTitleProps;
  link?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  isLoading?: boolean;
} & Omit<AlertProps, 'title' | 'variant' | 'content'>;

export const AppAlert: React.FC<AppAlertProps> = ({
  title,
  titleProps,
  link,
  content,
  children,
  onClose,
  actions,
  isLoading,
  ...props
}) => {
  if (isLoading) {
    return (
      <Alert {...props} onClose={onClose} variant="standard">
        <StackColumn gap={1.5} justifyContent="center" width="100%" alignItems="center">
          <CircularProgress size={22} />
        </StackColumn>
      </Alert>
    );
  }

  return (
    <Alert {...props} onClose={onClose} variant="standard">
      <StackColumn gap={1.5}>
        <StackColumn gap={0.5}>
          {title && (
            <AlertTitle mb={0} variant="subtitle2" {...titleProps}>
              {title}
            </AlertTitle>
          )}
          {content && (
            <AppTypography variant="body2" color={title ? 'text.tertiary' : 'text.primary'}>
              {content}
            </AppTypography>
          )}
          {link && link}
          {children}
        </StackColumn>

        {actions && <StackRow gap={1}>{actions}</StackRow>}
      </StackColumn>
    </Alert>
  );
};

//

export const AppAlertButton: React.FC<AppButtonProps> = ({ children, ...props }) => {
  return (
    <AppButton variant="outlined" size="small" {...props}>
      {children}
    </AppButton>
  );
};
