var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { get, set } from 'lodash';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getFieldError } from '../Utils';
export var MUIDatePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var value = get(formikProps, "values.".concat(fieldProps.name));
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    var fieldError = getFieldError(fieldProps.name || '', formikProps);
    var outputFormat = fieldProps.outputFormat, datePickerProps = __rest(fieldProps, ["outputFormat"]);
    var handleDateChange = function (date) {
        //setSelectedDate(date);
        if (!date) {
            formikProps.setFieldValue(fieldProps.name, date);
            return;
        }
        var dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'MM/DD/YYYY');
        formikProps.setFieldValue(fieldProps.name, dateValue);
    };
    //  (!value) ? null : value,
    var updatedProps = __assign(__assign({}, datePickerProps), {
        onChange: handleDateChange, value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value, inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value, format: fieldProps.format || 'MM/DD/YYYY', onError: function (error) {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    });
    set(updatedProps, 'slotProps.textField.error', !!fieldError);
    set(updatedProps, 'slotProps.textField.name', fieldProps.name);
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '');
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur);
    return (React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
        React.createElement(DatePicker, __assign({}, updatedProps))));
};
export var MUITimePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var fieldError = get(formikProps, "errors.".concat(fieldProps.name));
    var value = get(formikProps, "values.".concat(fieldProps.name));
    var handleTimeChange = function (time) {
        if (time === null)
            formikProps.setFieldValue(fieldProps.name, time);
        else
            formikProps.setFieldValue(fieldProps.name, new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
    };
    var updatedProps = __assign(__assign({}, fieldProps), {
        error: !!fieldError, helperText: (fieldError || ''), onChange: handleTimeChange, value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value, inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value, onError: function (error) {
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    });
    set(updatedProps, 'slotProps.textField.error', !!fieldError);
    set(updatedProps, 'slotProps.textField.name', fieldProps.name);
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '');
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur);
    return (React.createElement(TimePicker, __assign({}, updatedProps)));
};
export var MUIDateTimePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var value = get(formikProps, "values.".concat(fieldProps.name));
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    var fieldError = get(formikProps, "errors.".concat(fieldProps.name));
    var outputFormat = fieldProps.outputFormat, datePickerProps = __rest(fieldProps, ["outputFormat"]);
    var defaultFormat = 'MM/DD/YYYY HH:mmA';
    var handleDateChange = function (datetime) {
        //setSelectedDate(date);
        if (!datetime) {
            formikProps.setFieldValue(fieldProps.name, datetime);
            return;
        }
        var dateValue = (outputFormat === 'date') ? datetime : datetime.format(outputFormat || fieldProps.format || defaultFormat);
        formikProps.setFieldValue(fieldProps.name, dateValue);
    };
    var updatedProps = __assign(__assign({}, datePickerProps), {
        error: !!fieldError, helperText: (fieldError || ''),
        onChange: handleDateChange,
        value: (!value) ? null : (typeof value === 'string') ? dayjs(value) : value,
        inputValue: (!value) ? '' : (typeof value === 'string') ? dayjs(value) : value,
        format: fieldProps.format || defaultFormat,
        onError: function (error) {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    });
    set(updatedProps, 'slotProps.textField.error', !!fieldError);
    set(updatedProps, 'slotProps.textField.name', fieldProps.name);
    set(updatedProps, 'slotProps.textField.helperText', fieldError || '');
    set(updatedProps, 'slotProps.textField.onBlur', formikProps.handleBlur);
    return (React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
        React.createElement(DateTimePicker, __assign({}, updatedProps))));
};
