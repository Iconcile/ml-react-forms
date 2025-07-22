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
import { map, isArray, uniqueId, get, isFunction, filter } from 'lodash';
import { MUITextField, MUISelectField, MUICheckBox, MUISwitch, MUIRadio, MUIPlaceSuggest, MUIAutocomplete, MUIFieldArray, MUIDropDownTimePicker, MUIPhoneField } from './lib';
import { MUIDatePicker, MUIDateTimePicker, MUITimePicker } from './lib/MUIDateTimePicker';
import { getConditionalProps } from './lib/ConditionalOperation';
import { LoadingButton } from '@mui/lab';
import styled from '@emotion/styled';
var useEffect = React.useEffect, useState = React.useState;
var ComponentMapConfig = {};
export var getComponentConfig = function (type) {
    return ComponentMapConfig[type];
};
export var attachField = function (type, component, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item] = { component: component, props: props }; });
    }
    else
        ComponentMapConfig[type] = { component: component, props: props };
};
export var setDefaultProps = function (type, props) {
    if (isArray(type)) {
        map(type, function (item) { return ComponentMapConfig[item].props = __assign(__assign({}, ComponentMapConfig[item].props), props); });
    }
    else
        ComponentMapConfig[type].props = __assign(__assign({}, ComponentMapConfig[type].props), props);
};
attachField('text', React.createElement(MUITextField, null), { type: 'text' });
attachField('password', React.createElement(MUITextField, null), { type: 'password' });
attachField('select', React.createElement(MUISelectField, null));
attachField('checkbox', React.createElement(MUICheckBox, null));
attachField('date-picker', React.createElement(MUIDatePicker, null), { variant: 'inline', label: 'Select Date' });
attachField('time-picker', React.createElement(MUITimePicker, null), { variant: 'inline', label: 'Select Time' });
attachField('location-suggest', React.createElement(MUIPlaceSuggest, null));
attachField('switch', React.createElement(MUISwitch, null));
attachField('radio', React.createElement(MUIRadio, null));
attachField('autocomplete', React.createElement(MUIAutocomplete, null));
attachField('array', React.createElement(MUIFieldArray, null));
attachField('time-picker-select', React.createElement(MUIDropDownTimePicker, null));
attachField('phone', React.createElement(MUIPhoneField, null));
attachField('phone', React.createElement(MUIDateTimePicker, null));
export var BuildFormRow = function (props) {
    var schema = props.schema, rowId = props.rowId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.settings, settings = _b === void 0 ? { horizontalSpacing: 10, verticalSpacing: 10, columnHorizontalPadding: 0, isReadOnly: false } : _b;
    var columnItems = (get(schema, 'columns'));
    var rowSettings = __assign(__assign({}, settings), (get(schema, 'settings') || {}));
    var colItems = (isArray(schema) ? schema : ((isArray(columnItems) ? columnItems : [schema])));
    var rowStyle = { marginBottom: (rowSettings.verticalSpacing || 10), display: 'flex' };
    var doNotHaveMoreElements = function (index) {
        return filter(colItems.slice(index + 1), function (item) {
            var componentConfig = ComponentMapConfig[item.type];
            var conditionalProps = getConditionalProps(item, formikProps);
            return (componentConfig && !(conditionalProps.hidden === true));
        }).length === 0;
    };
    return (React.createElement("div", { style: rowStyle }, map(colItems, function (item, index) {
        var componentConfig = ComponentMapConfig[item.type];
        var horizontalSpacing = ((index == colItems.length - 1) || doNotHaveMoreElements(index)) ? 0 : (rowSettings.horizontalSpacing || 10);
        if (!componentConfig)
            return null;
        var conditionalProps = getConditionalProps(item, formikProps);
        var fieldProps = __assign(__assign(__assign({ id: item.id, name: (item.name || item.valueKey) }, componentConfig.props), item.fieldProps), conditionalProps.finalProps);
        var Component = componentConfig.component;
        if (conditionalProps.hidden === true)
            return null;
        return (React.createElement("div", { key: "".concat(rowId, "_field_").concat(index), className: item.classNames, style: __assign({ flex: (item.flex || 1), marginRight: horizontalSpacing, paddingLeft: rowSettings.columnHorizontalPadding, paddingRight: rowSettings.columnHorizontalPadding }, item.styles) }, (settings.isReadOnly && item.readOnlyProps && isFunction(item.readOnlyProps.renderer)) ?
            (item.readOnlyProps.renderer({ formikProps: formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })) :
            React.cloneElement(Component, { fieldProps: fieldProps, formikProps: formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })));
    })));
};
var getUpdateSchema = function (schema, formId) {
    return map(schema, function (schemaItem) {
        if (isArray(schemaItem)) {
            return map(schemaItem, function (item) { return (__assign(__assign({}, item), { id: "".concat(formId, "_").concat(uniqueId()) })); });
        }
        return __assign(__assign({}, schemaItem), { id: "".concat(formId, "_").concat(uniqueId()) });
    });
};
export var MLFormContent = function (props) {
    var schema = props.schema, formId = props.formId, formikProps = props.formikProps, settings = props.settings;
    var _a = useState(schema), formSchema = _a[0], setFormSchema = _a[1];
    useEffect(function () {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema]);
    return (React.createElement(React.Fragment, null, map(formSchema, function (configRow, index) {
        var rowId = "".concat(formId, "_row_").concat(index);
        return (React.createElement(BuildFormRow, { key: rowId, rowId: rowId, schema: configRow, formikProps: formikProps, settings: settings }));
    })));
};
export var MLFormAction = function (props) {
    var formId = props.formId, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, containerClassNames = props.containerClassNames, _b = props.submitButtonLayout, submitButtonLayout = _b === void 0 ? 'center' : _b, _c = props.submitButtonText, submitButtonText = _c === void 0 ? "Submit" : _c, submitButtonProps = props.submitButtonProps;
    if (props.actionContent)
        return (React.cloneElement(props.actionContent || React.createElement("div", null), { formikProps: formikProps }));
    var ActionContainer = styled('div')(function () { return (__assign(__assign(__assign({ position: 'relative', display: 'flex', justifyContent: 'center' }, (submitButtonLayout === 'center' && {
        justifyContent: 'center'
    })), (submitButtonLayout === 'right' && {
        justifyContent: 'flex-end'
    })), { '&.action-fullWidth > button': {
            flex: 1
        } })); });
    return (React.createElement(ActionContainer, { className: containerClassNames }, (props.actionContent) ?
        (React.cloneElement(props.actionContent || React.createElement("div", null), { formikProps: formikProps, formId: formId }))
        : (React.createElement(LoadingButton, __assign({ loading: formikProps.isSubmitting, type: "submit", disabled: formikProps.isSubmitting, variant: "contained", color: "primary" }, submitButtonProps), submitButtonText))));
};
export var MLFormBuilder = function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.isInProgress, isInProgress = _b === void 0 ? false : _b, _c = props.actionConfig, actionConfig = _c === void 0 ? {} : _c;
    useEffect(function () {
        if (isInProgress === false)
            formikProps.setSubmitting(false);
    }, [isInProgress]);
    return (React.createElement("form", { onSubmit: formikProps.handleSubmit },
        React.createElement(MLFormContent, __assign({}, props)),
        (actionConfig.displayActions !== false) &&
            (React.createElement(MLFormAction, __assign({ formId: props.formId, formikProps: formikProps }, actionConfig)))));
};
export default MLFormBuilder;
