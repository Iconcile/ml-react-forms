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
import React, { memo } from 'react';
import { FieldArray } from 'formik';
import { get, isEqual } from 'lodash';
import { IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getComponentConfig } from '../index';
import VirtualList from 'rc-virtual-list';
/* interface IArrayItemProps extends TextFieldProps {
    fieldValue?: string
    formikProps?: FormikValues
    name?: string
    itemIndex?: number

} */
/* export const ArrayItem:React.FC<IArrayItemProps> = (props) => {
    const {fieldValue='',} = props;
    return (
        <div>
            <TextField/>
        </div>
    )
} */
export var MUIFieldArray = memo(function (props) {
    var _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var itemType = fieldProps.itemType, _c = fieldProps.addButtonText, addButtonText = _c === void 0 ? 'Add' : _c, addButtonProps = fieldProps.addButtonProps, addButton = fieldProps.addButton, removeButton = fieldProps.removeButton, removeButtonProps = fieldProps.removeButtonProps, _d = fieldProps.textFieldProps, textFieldProps = _d === void 0 ? {} : _d, _e = fieldProps.defaultData, defaultData = _e === void 0 ? {} : _e, onRemove = fieldProps.onRemove, _f = fieldProps.virtualized, virtualized = _f === void 0 ? false : _f, _g = fieldProps.virtualizedHeight, virtualizedHeight = _g === void 0 ? 720 : _g, _h = fieldProps.virtualizedItemHeight, virtualizedItemHeight = _h === void 0 ? 88 : _h, virtualizedItemKey = fieldProps.virtualizedItemKey;
    var values = get(formikProps, "values.".concat(fieldProps.name)) || [];
    var itemComponentConfig = getComponentConfig(itemType);
    var handleRemove = function (arrayHelpers, index) {
        arrayHelpers.remove(index);
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(arrayHelpers, index);
    };
    var getItemKey = function (item) {
        var _a, _b;
        if (typeof virtualizedItemKey === 'function')
            return virtualizedItemKey(item);
        if (virtualizedItemKey)
            return item === null || item === void 0 ? void 0 : item[virtualizedItemKey];
        return (_b = (_a = item === null || item === void 0 ? void 0 : item.TEMP_ID) !== null && _a !== void 0 ? _a : item === null || item === void 0 ? void 0 : item.CONTRACT_SRV_RATE_ID) !== null && _b !== void 0 ? _b : "".concat(fieldProps.name, "-").concat(values.indexOf(item));
    };
    var renderItem = function (value, index, arrayHelpers, style) { return (React.createElement(Box, { key: getItemKey(value), style: style, position: 'relative', "data-testid": fieldProps['data-testid'] ? "".concat(fieldProps['data-testid'], "-item-").concat(index) : "field-array-item-".concat(fieldProps.name, "-").concat(index) },
        React.cloneElement(itemComponentConfig.component, __assign(__assign({ name: fieldProps.name, itemIndex: index, arrayHelpers: arrayHelpers, fieldValue: value, formikProps: formikProps }, itemComponentConfig.props), textFieldProps)),
        (removeButton) ? removeButton : (React.createElement(IconButton, __assign({ sx: {
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(0,-50%)'
            }, size: "small", onClick: function () { return handleRemove(arrayHelpers, index); } }, removeButtonProps, { "data-testid": fieldProps['data-testid'] ? "".concat(fieldProps['data-testid'], "-remove-").concat(index) : "field-array-remove-".concat(fieldProps.name, "-").concat(index) }),
            React.createElement(CloseIcon, null))))); };
    return (React.createElement(FieldArray, { name: fieldProps.name, render: function (arrayHelpers) { return (React.createElement("div", null,
            virtualized ? (React.createElement(VirtualList, { data: values, height: virtualizedHeight, itemHeight: virtualizedItemHeight, itemKey: getItemKey, fullHeight: false }, function (value, index, _a) {
                var style = _a.style;
                return renderItem(value, index, arrayHelpers, style);
            })) : (values.map(function (value, index) { return renderItem(value, index, arrayHelpers); })),
            React.createElement("div", null, (addButton) ? addButton : (React.createElement(Button, __assign({ type: "button", onClick: function () { return arrayHelpers.push(defaultData); } }, addButtonProps, { "data-testid": fieldProps['data-testid'] || "field-array-add-".concat(fieldProps.name) }), addButtonText))))); } }));
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
