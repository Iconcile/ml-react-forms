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
import { Box, FormControl, InputLabel, Select, TextField, Typography } from "@mui/material";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { getFieldError } from "../Utils";
import { COUNTRY_LIST } from "./Constants";
export var MUIPhoneField = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b, fieldConfig = props.fieldConfig;
    var _c = useState(""), code = _c[0], setCode = _c[1];
    var value = (get(formikProps, "values.".concat(fieldProps.name)) || "");
    useEffect(function () {
        if (value) {
            setCode(value.split('-')[0] || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldProps.name]);
    var countryCodeProps = fieldProps.countryCodeProps, phoneNumberProps = fieldProps.phoneNumberProps, countryCodeLabel = fieldProps.countryCodeLabel, phoneLabel = fieldProps.phoneLabel, countryCodeFormControlProps = fieldProps.countryCodeFormControlProps, countryCodeContainerProps = fieldProps.countryCodeContainerProps, phoneContainerProps = fieldProps.phoneContainerProps, emptyItem = fieldProps.emptyItem, emptyItemText = fieldProps.emptyItemText;
    var onChange = function (event) {
        event.preventDefault();
        var number = event.target.value.replace("-", "");
        formikProps.setFieldValue("".concat(fieldProps.name), "".concat(code, "-").concat(number));
    };
    var codeChange = function (e) {
        var number = value.split("-");
        formikProps.setFieldValue("".concat(fieldProps.name), "".concat(e.target.value, "-").concat(number[1] || ''));
        setCode(e.target.value);
    };
    var handleBlur = function (e) {
        if (formikProps && formikProps.handleBlur)
            formikProps === null || formikProps === void 0 ? void 0 : formikProps.handleBlur(e);
    };
    var newError = getFieldError(fieldProps.name || '', formikProps); //formikProps.errors[`${fieldProps.name}`];
    var error = !!newError;
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { width: "100%", display: "flex", alignItems: "flex-end" },
            React.createElement(Box, __assign({ width: "30%" }, countryCodeContainerProps),
                React.createElement(FormControl, __assign({ fullWidth: true }, countryCodeFormControlProps, { error: error }),
                    React.createElement(InputLabel, { id: fieldProps.name }, countryCodeLabel || "Country code"),
                    React.createElement(Select, __assign({ labelId: fieldProps.name, value: code, onChange: codeChange }, countryCodeProps, { native: true }),
                        (emptyItem) &&
                            (React.createElement("option", { value: '' }, emptyItemText)),
                        COUNTRY_LIST.map(function (country, index) {
                            if (!country.dial_code)
                                return null;
                            return (React.createElement("option", { key: index, value: country.dial_code }, "".concat(country.name, " (").concat(country.dial_code, ")")));
                        })))),
            React.createElement(Box, __assign({ width: "70%", marginLeft: "5px" }, phoneContainerProps),
                React.createElement(TextField, __assign({ fullWidth: true, label: phoneLabel || "Phone", InputProps: {
                        name: fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.valueKey,
                    }, onBlur: handleBlur, autoComplete: "nope", type: "tel", value: value.split("-")[1] || "", error: error, onChange: onChange }, phoneNumberProps)))),
        error && (React.createElement(Typography, { variant: "overline", style: newError ? {
                color: "#B71840",
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "none",
            } : {} }, newError))));
};
export default MUIPhoneField;
