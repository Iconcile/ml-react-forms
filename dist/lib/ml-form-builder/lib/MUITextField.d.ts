import * as React from 'react';
import { FormikProps } from 'formik';
import { TextFieldProps } from '@mui/material/TextField';
import { IFieldProps } from '../index';
export type IMUITextFieldProps = TextFieldProps & {
    'data-testid'?: string;
};
export interface IProps extends IFieldProps {
    fieldProps?: IMUITextFieldProps;
    onChange?: (event: React.ChangeEvent<any>, formikProps: FormikProps<any>) => void;
}
export declare const MUITextField: React.FC<IProps>;
