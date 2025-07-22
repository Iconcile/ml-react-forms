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
import { Switch, FormControlLabel } from '@mui/material';
import { get } from 'lodash';
export var MUISwitch = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b, _c = props.isReadOnly, isReadOnly = _c === void 0 ? false : _c;
    var label = fieldProps.label, switchProps = __rest(fieldProps, ["label"]);
    var value = get(formikProps, "values.".concat(fieldProps.name));
    var handleOnChange = function () {
        formikProps.setFieldValue(fieldProps.name, !value);
    };
    console.log('Switch props', __assign({}, __assign(__assign({}, switchProps), { disabled: (switchProps.disabled || isReadOnly) })));
    return (React.createElement(FormControlLabel, { control: React.createElement(Switch, __assign({ checked: !!value, onChange: handleOnChange, onBlur: formikProps.handleBlur, inputProps: { 'aria-label': 'secondary checkbox' }, value: value }, __assign(__assign({}, switchProps), { disabled: (switchProps.disabled || isReadOnly) }))), label: label || '' }));
};
