import * as React from 'react';
import Typography from '@mui/material/Typography';
export var MUIReadOnly = function (props) {
    var _a, _b;
    return (React.createElement("div", { "data-testid": props['data-testid'] || "readonly-".concat(((_a = props.fieldConfig) === null || _a === void 0 ? void 0 : _a.name) || ((_b = props.fieldConfig) === null || _b === void 0 ? void 0 : _b.valueKey) || 'field') },
        React.createElement(Typography, { variant: "subtitle1" }, props.label || ''),
        React.createElement(Typography, null, props.value || 'NA')));
};
export default MUIReadOnly;
