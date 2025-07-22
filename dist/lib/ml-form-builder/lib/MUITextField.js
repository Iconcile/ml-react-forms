var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { get, isEqual } from 'lodash';
import { getFieldError } from '../Utils';
import MUIReadOnly from './MUIReadOnly';
export var MUITextField = React.memo(function (props) {
    var _a;
    var _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b, _c = props.formikProps, formikProps = _c === void 0 ? {} : _c, _d = props.isReadOnly, isReadOnly = _d === void 0 ? false : _d, onChange = props.onChange;
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, fieldProps), { error: !!fieldError, helperText: fieldError || fieldProps.helperText || '', 
        // onChange: formikProps.handleChange,
        onChange: function (event) {
            if (onChange) {
                onChange(event, formikProps);
            }
            else {
                formikProps.handleChange(event);
            }
        }, onBlur: formikProps.handleBlur, value: (_a = get(formikProps, "values.".concat(fieldProps.name))) !== null && _a !== void 0 ? _a : '' });
    if (isReadOnly) {
        return (React.createElement(MUIReadOnly, { label: updatedProps.label, value: updatedProps.value }));
    }
    return (React.createElement(TextField, __assign({}, updatedProps)));
}, function (p, n) {
    var _a, _b, _c, _d;
    p.fieldProps.id = '1';
    n.fieldProps.id = '1';
    var pFieldName = ((_a = p.fieldProps) === null || _a === void 0 ? void 0 : _a.name) || '';
    var nFieldName = ((_b = n.fieldProps) === null || _b === void 0 ? void 0 : _b.name) || '';
    // ========== Checking for getFieldError
    // Field Value
    if (!isEqual(get(p.formikProps, "values.".concat(pFieldName)), get(n.formikProps, "values.".concat(nFieldName)))) {
        return false;
    }
    // Field Error
    if (!isEqual(get(p.formikProps, "errors.".concat(pFieldName)), get(n.formikProps, "errors.".concat(nFieldName)))) {
        return false;
    }
    // get(formikProps, `touched.${fieldName}`)
    if (!isEqual(get(p.formikProps, "touched.".concat(pFieldName)), get(n.formikProps, "touched.".concat(nFieldName)))) {
        return false;
    }
    // formikProps.submitCount
    if (!isEqual((_c = p.formikProps) === null || _c === void 0 ? void 0 : _c.submitCount, (_d = n.formikProps) === null || _d === void 0 ? void 0 : _d.submitCount)) {
        return false;
    }
    // Readonly Prop
    if (!isEqual(p.isReadOnly, n.isReadOnly)) {
        return false;
    }
    // Field Props
    if (!isEqual(p.fieldProps, n.fieldProps)) {
        return false;
    }
    return true;
});
