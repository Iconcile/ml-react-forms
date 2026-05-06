import React from 'react';
import { IFieldProps } from '../index';
import { FieldArrayRenderProps } from 'formik';
import { ButtonProps, IconButtonProps, TextFieldProps } from '@mui/material';
interface IFieldArrayProps {
    'data-testid'?: string;
    name: string;
    id: string;
    itemType: string;
    addButtonProps?: ButtonProps;
    addButtonText?: string;
    addButton?: JSX.Element;
    removeButton?: JSX.Element;
    removeButtonProps?: IconButtonProps;
    textFieldProps?: TextFieldProps;
    defaultData?: any;
    onRemove?: (arrayHelpers: FieldArrayRenderProps, index: number) => void;
    virtualized?: boolean;
    virtualizedHeight?: number;
    virtualizedItemHeight?: number;
    virtualizedItemKey?: string | ((item: any) => React.Key);
}
export interface IProps extends IFieldProps {
    fieldProps?: IFieldArrayProps;
}
export declare const MUIFieldArray: React.FC<IProps>;
export {};
