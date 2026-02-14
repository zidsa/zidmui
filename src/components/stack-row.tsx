import React from 'react';

import { Stack, StackProps } from '@mui/material';

//
//

export type StackRowProps = Omit<StackProps, 'spacing'> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const StackRow: React.FC<StackRowProps> = ({ children, ...props }) => {
  return (
    <Stack spacing={0} direction="row" alignItems="center" {...props}>
      {children}
    </Stack>
  );
};

StackRow.displayName = 'StackRow';
