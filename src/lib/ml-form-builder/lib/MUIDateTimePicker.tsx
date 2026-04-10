import * as React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps } from 'formik';
import { get, set } from 'lodash';

import { IFieldProps } from '..';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getFieldError } from '../Utils';

export interface IMUIDatePickerProps extends DatePickerProps<any> {
    'data-testid'?: string
    outputFormat?: string
    name?: string
}

export const MUIDatePicker: React.FC<IFieldProps & { fieldProps?: IMUIDatePickerProps }> = (props) => {
    const { fieldProps = {} as IMUIDatePickerProps, formikProps = {} as FormikProps<any> } = props;
    const value = get(formikProps, `values.${fieldProps.name}`);
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    const fieldError = getFieldError(fieldProps.name || '', formikProps);
    const { outputFormat, 'data-testid': dataTestId, ...datePickerProps } = fieldProps;
    const handleDateChange = (date: any | null) => {
        //setSelectedDate(date);
        if (!date) {
            formikProps.setFieldValue(fieldProps.name, date);
            return;
        }
        const dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'MM/DD/YYYY');
        formikProps.setFieldValue(fieldProps.name, dateValue);
    };
    //  (!value) ? null : value,
    const updatedProps = {
        ...datePickerProps,
        onChange: handleDateChange,
        value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value,
        inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value,
        format: fieldProps.format || 'MM/DD/YYYY',
        onError: (error: React.ReactNode) => {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    };

    set(updatedProps, 'slotProps.textField.error', !!fieldError)
    set(updatedProps, 'slotProps.textField.name', fieldProps.name)
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '')
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur)
    if (dataTestId) {
        set(updatedProps, 'slotProps.textField.data-testid', dataTestId)
    } else if (fieldProps.name) {
        set(updatedProps, 'slotProps.textField.data-testid', 'datepicker-' + fieldProps.name)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...updatedProps} />
        </LocalizationProvider>
    )
}

export interface IMUITimePickerProps extends TimePickerProps<any> {
    'data-testid'?: string
    name?: string
}

export const MUITimePicker: React.FC<IFieldProps & { fieldProps?: IMUITimePickerProps }> = props => {
    const { fieldProps = {} as IMUITimePickerProps, formikProps = {} as FormikProps<any> } = props;
    const { 'data-testid': timeTestId, ...timePickerProps } = fieldProps;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const value = get(formikProps, `values.${fieldProps.name}`);
    const handleTimeChange = (time: any | null) => {
        if (time === null)
            formikProps.setFieldValue(fieldProps.name, time);
        else
            formikProps.setFieldValue(fieldProps.name, new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
    }
    const updatedProps = {
        ...timePickerProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: handleTimeChange,
        value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value,
        inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value,
        onError: (error: React.ReactNode) => {
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        },
    };

    set(updatedProps, 'slotProps.textField.error', !!fieldError)
    set(updatedProps, 'slotProps.textField.name', fieldProps.name)
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '')
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur)
    if (timeTestId) {
        set(updatedProps, 'slotProps.textField.data-testid', timeTestId)
    } else if (fieldProps.name) {
        set(updatedProps, 'slotProps.textField.data-testid', 'timepicker-' + fieldProps.name)
    }

    return (
        <TimePicker  {...updatedProps} />
    )
}

export interface IMUIDateTimePickerProps extends DateTimePickerProps<any> {
    'data-testid'?: string
    outputFormat?: string
    name?: string
}


export const MUIDateTimePicker: React.FC<IFieldProps & { fieldProps?: IMUIDateTimePickerProps }> = props => {
    const { fieldProps = {} as IMUIDateTimePickerProps, formikProps = {} as FormikProps<any> } = props;
    const value = get(formikProps, `values.${fieldProps.name}`);
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const { outputFormat, 'data-testid': dtTestId, ...datePickerProps } = fieldProps;
    const defaultFormat = 'MM/DD/YYYY HH:mmA'
    const handleDateChange = (datetime: any | null) => {
        //setSelectedDate(date);
        if (!datetime) {
            formikProps.setFieldValue(fieldProps.name, datetime);
            return;
        }
        const dateValue = (outputFormat === 'date') ? datetime : datetime.format(outputFormat || fieldProps.format || defaultFormat);
        formikProps.setFieldValue(fieldProps.name, dateValue);
    };
    const updatedProps = {
        ...datePickerProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: handleDateChange,
        value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value,
        inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value,
        format: fieldProps.format || defaultFormat,

        onError: (error: React.ReactNode) => {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        },
    };

    set(updatedProps, 'slotProps.textField.error', !!fieldError)
    set(updatedProps, 'slotProps.textField.name', fieldProps.name)
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '')
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur)
    if (dtTestId) {
        set(updatedProps, 'slotProps.textField.data-testid', dtTestId)
    } else if (fieldProps.name) {
        set(updatedProps, 'slotProps.textField.data-testid', 'datetimepicker-' + fieldProps.name)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker {...updatedProps} />
        </LocalizationProvider>
    )
}