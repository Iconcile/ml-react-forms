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
import { Checkbox, FormControl, FormHelperText, FormControlLabel, FormLabel, FormGroup } from '@mui/material';
import { get, isEmpty, map, indexOf } from 'lodash';
import { getFieldError, getMenuOptions } from '../Utils';
export var MUICheckBox = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var _d = fieldProps.label, label = _d === void 0 ? '' : _d, helperText = fieldProps.helperText, _e = fieldProps.options, options = _e === void 0 ? [] : _e, header = fieldProps.header, headerProps = fieldProps.headerProps, checkGroupProps = fieldProps.checkGroupProps, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, formControlLabelProps = fieldProps.formControlLabelProps, _f = fieldProps.isLabelHtmlString, isLabelHtmlString = _f === void 0 ? false : _f, checkboxProps = __rest(fieldProps, ["label", "helperText", "options", "header", "headerProps", "checkGroupProps", "formControlProps", "formHelperTextProps", "formControlLabelProps", "isLabelHtmlString"]);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var value = get(formikProps, "values.".concat(fieldProps.name));
    var menuOptions = getMenuOptions(options);
    return (React.createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        (header) &&
            (React.createElement(FormLabel, __assign({}, headerProps), header)),
        React.createElement(FormGroup, __assign({}, checkGroupProps), (!isEmpty(menuOptions)) ?
            (map(menuOptions, function (item, index) { return (React.createElement(FormControlLabel, __assign({ key: "".concat(fieldConfig.id, "_check_").concat(index), control: React.createElement(Checkbox, __assign({ checked: (indexOf(value, item.value) > -1), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange, value: item.value }, __assign(__assign({}, checkboxProps), { id: "".concat(fieldConfig.id, "_check_").concat(index) }))), label: item.name || '' }, formControlLabelProps))); })) : (React.createElement(FormControlLabel, __assign({ control: React.createElement(Checkbox, __assign({ checked: (value || false), onBlur: formikProps.handleBlur, onChange: formikProps.handleChange }, checkboxProps)), label: isLabelHtmlString ? React.createElement("div", { dangerouslySetInnerHTML: { __html: label } }) : label }, formControlLabelProps)))),
        (fieldError || helperText) &&
            (React.createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || helperText))));
};
