import { cloneElement, isValidElement } from 'react';

import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import { AppStatus, AppStatusProps } from './app-status';
import { StackRow } from './stack-row';

//
//

export type AppTabsProps = Omit<TabsProps, 'textColor'> & { tabs?: AppTabProps[] };

export const AppTabs = ({ tabs, children, ...props }: AppTabsProps) => {
  return (
    <Tabs
      variant="scrollable"
      textColor="secondary"
      slotProps={{ indicator: { hidden: true } }}
      {...props}
    >
      {tabs?.map(({ key, ...tabProps }) => (
        <AppTab key={key} {...tabProps} />
      ))}
      {children}
    </Tabs>
  );
};

//

export type AppTabProps = TabProps & {
  count?: number;
  icon?: React.ReactNode;
  chip?: AppStatusProps;
};

export const AppTab = ({ label, chip, icon, ...props }: AppTabProps) => {
  const iconWithDefaults = isValidElement(icon)
    ? // @ts-expect-error: type
      cloneElement(icon, { fontSize: 'small', color: 'action', ...(icon.props ?? {}) })
    : icon;

  return (
    <Tab
      label={
        <StackRow>
          {iconWithDefaults ? iconWithDefaults : null}

          {label}

          {chip && <AppStatus color="primary" size="small" sx={{ minWidth: 24 }} {...chip} />}
        </StackRow>
      }
      {...props}
    />
  );
};

export const formatNumber = (amount: number) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};
