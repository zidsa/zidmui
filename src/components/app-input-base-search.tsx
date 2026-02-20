import { IconButtonProps, SvgIconProps, TextFieldProps } from '@mui/material';

import { IconSearchLine } from '~/icons/system/search-line';

import { AppInputBase } from './app-input-base';

//
//

export type AppInputSearchProps = TextFieldProps & {
  name: string;
  transformText?: (text: string) => string;
  iconButtonProps?: IconButtonProps;
  iconProps?: SvgIconProps;
};

export const AppInputBaseSearch = ({
  name,
  helperText,
  transformText,
  children,
  ...props
}: AppInputSearchProps) => {
  return (
    <AppInputBase
      transformText={transformText}
      id={'input-' + name}
      helperText={helperText}
      startAdornment={<IconSearchLine fontSize="small" />}
      {...props}
    >
      {children}
    </AppInputBase>
  );
};
