import * as React from 'react';
import { FormikValues } from 'formik';
import { TFieldConditions } from './lib/ConditionalOperation';
import { LoadingButtonProps } from '@mui/lab';
export interface ReadOnlyProps {
    renderer: (props: IFieldProps) => React.ReactNode;
}
export interface FormConfig {
    type: string;
    name?: string;
    id?: string;
    valueKey: string;
    flex?: number | string;
    fieldProps?: object;
    styles?: object;
    classNames?: Array<string> | string;
    condition?: TFieldConditions;
    readOnlyProps?: ReadOnlyProps;
}
interface RowSettingsProps {
    horizontalSpacing?: number;
    verticalSpacing?: number;
    columnHorizontalPadding?: number;
}
export interface BuilderSettingsProps extends RowSettingsProps {
    isReadOnly?: boolean;
}
export type RowSchema = Array<FormConfig> | FormConfig | {
    columns: Array<FormConfig>;
    settings?: RowSettingsProps;
};
export interface FormRowProps {
    schema: RowSchema;
    rowId: string;
    formikProps?: FormikValues;
    settings?: BuilderSettingsProps;
}
type submitButtonLayout = "right" | "center" | "fullWidth";
export interface IFormActionProps {
    submitButtonText?: string;
    submitButtonProps?: LoadingButtonProps;
    submitButtonLayout?: submitButtonLayout;
    actionContent?: JSX.Element;
    containerClassNames?: string | string[];
    displayActions?: boolean;
}
export interface BuilderProps {
    schema: Array<RowSchema>;
    formId: string;
    formikProps?: FormikValues;
    actionConfig?: IFormActionProps;
    settings?: BuilderSettingsProps;
    isInProgress?: boolean;
}
export interface IFieldProps {
    formikProps?: FormikValues;
    fieldConfig?: FormConfig;
    isReadOnly?: boolean;
}
export declare const getComponentConfig: (type: string) => {
    component: JSX.Element;
    props?: object | undefined;
};
export declare const attachField: (type: Array<string> | string, component: JSX.Element, props?: object) => void;
export declare const setDefaultProps: (type: Array<string> | string, props: object) => void;
export declare const BuildFormRow: React.FC<FormRowProps>;
export declare const MLFormContent: React.FC<BuilderProps>;
export declare const MLFormAction: React.FC<IFormActionProps & Pick<BuilderProps, 'formId' | 'formikProps'>>;
export declare const MLFormBuilder: React.FC<BuilderProps>;
export default MLFormBuilder;
