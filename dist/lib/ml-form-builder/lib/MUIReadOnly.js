import * as React from 'react';
import Typography from '@mui/material/Typography';
export var MUIReadOnly = function (props) {
    var _a;
    return (React.createElement("div", { "data-testid": props['data-testid'] || "readonly-".concat(((_a = props.fieldProps) === null || _a === void 0 ? void 0 : _a.name) || 'field') },
        React.createElement(Typography, { variant: "subtitle1" }, props.label || ''),
        React.createElement(Typography, null, props.value || 'NA')));
};
export default MUIReadOnly;
