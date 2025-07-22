import * as React from 'react';
import Typography from '@mui/material/Typography';
export var MUIReadOnly = function (props) {
    return (React.createElement("div", null,
        React.createElement(Typography, { variant: "subtitle1" }, props.label || ''),
        React.createElement(Typography, null, props.value || 'NA')));
};
export default MUIReadOnly;
