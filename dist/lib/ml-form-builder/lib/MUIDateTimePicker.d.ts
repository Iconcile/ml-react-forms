import * as React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { IFieldProps } from '..';
import { DateTimePickerProps } from '@mui/x-date-pickers';
export interface IMUIDatePickerProps extends DatePickerProps<any> {
    outputFormat?: string;
    name?: string;
}
export declare const MUIDatePicker: React.FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export interface IMUITimePickerProps extends TimePickerProps<any> {
    name?: string;
}
export declare const MUITimePicker: React.FC<IFieldProps & {
    fieldProps?: IMUITimePickerProps;
}>;
export interface IMUIDateTimePickerProps extends DateTimePickerProps<any> {
    outputFormat?: string;
    name?: string;
}
export declare const MUIDateTimePicker: React.FC<IFieldProps & {
    fieldProps?: IMUIDateTimePickerProps;
}>;
