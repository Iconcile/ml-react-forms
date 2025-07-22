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
import { FormLabel, FormControlLabel, FormHelperText, FormControl, RadioGroup, Radio } from '@mui/material';
import { get, map } from 'lodash';
import { getMenuOptions, getFieldError } from '../Utils';
export var MUIRadio = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var header = fieldProps.header, _c = fieldProps.options, options = _c === void 0 ? [] : _c, headerProps = fieldProps.headerProps, helperText = fieldProps.helperText, radioProps = fieldProps.radioProps, radioGroupProps = fieldProps.radioGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps;
    var fieldValue = get(formikProps, "values.".concat(fieldProps.name)) || '';
    var menuOptions = getMenuOptions(options);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    return (React.createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (React.createElement(FormLabel, __assign({}, headerProps), header)),
        React.createElement(RadioGroup, __assign({ name: fieldProps.name, value: fieldValue, onChange: formikProps.handleChange, onBlur: formikProps.handleBlur }, radioGroupProps), map(menuOptions, function (option, index) {
            var value = option.value, name = option.name, rest = __rest(option, ["value", "name"]);
            return (React.createElement(FormControlLabel, __assign({ key: "".concat(fieldProps.id, "_option_item_").concat(index), value: value + '', label: name, control: React.createElement(Radio, __assign({}, radioProps)) }, rest)));
        })),
        (fieldError || helperText) &&
            (React.createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};
