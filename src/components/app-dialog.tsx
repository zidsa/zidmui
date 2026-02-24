import {
  Dialog,
  DialogProps,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogTitle,
  DialogTitleProps,
  StackProps,
  useTheme,
} from '@mui/material';
import { AppTypographyProps, AppTypography } from './app-typography';
import { StackColumn } from './stack-column';

//
//

export type AppDialogProps = DialogProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  titleStackProps?: StackProps;
  titleProps?: DialogTitleProps;
  actions?: React.ReactNode;
  actionsProps?: DialogActionsProps;
  children: React.ReactNode;
  dialogContentProps?: DialogContentProps;
  darkerBackdrop?: boolean;
};

export const AppDialog = ({
  title,
  description,
  descriptionProps,
  children,
  titleStackProps,
  actions,
  titleProps,
  actionsProps,
  darkerBackdrop,
  dialogContentProps,
  slotProps,
  ...props
}: AppDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          elevation: 4,
          ...slotProps?.paper,
        },
        backdrop: {
          sx: {
            backgroundColor: darkerBackdrop ? theme.palette.background.darkBackdrop : '',
          },
          ...slotProps?.backdrop,
        },
      }}
      {...props}
    >
      {(title || description) && (
        <DialogTitle {...titleProps}>
          <StackColumn {...titleStackProps} gap={3}>
            {title}
            {description && (
              <AppTypography variant="body2" {...descriptionProps}>
                {description}
              </AppTypography>
            )}
          </StackColumn>
        </DialogTitle>
      )}
      <DialogContent {...dialogContentProps}>{children}</DialogContent>

      {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </Dialog>
  );
};
