import React from 'react';

import { Stack, StackProps } from '@mui/material';

//
//

export type StackColumnProps = Omit<StackProps, 'spacing'> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const StackColumn: React.FC<StackColumnProps> = ({ children, ...props }) => {
  return (
    <Stack spacing={0} direction="column" {...props}>
      {children}
    </Stack>
  );
};

StackColumn.displayName = 'StackColumn';
