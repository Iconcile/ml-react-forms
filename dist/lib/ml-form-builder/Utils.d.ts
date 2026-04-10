import * as React from 'react';
import { FormikValues } from 'formik';
import { MenuItemProps } from '@mui/material';
export type MenuOptionObject = {
    name: string | React.ReactNode;
    value: string;
    menuItemProps?: MenuItemProps;
};
export type MenuOptions = Array<string> | Array<MenuOptionObject>;
export declare const getMenuOptions: (options: MenuOptions) => Array<MenuOptionObject>;
export declare const getFieldError: (fieldName: string, formikProps: FormikValues, checkTouched?: boolean) => any;
