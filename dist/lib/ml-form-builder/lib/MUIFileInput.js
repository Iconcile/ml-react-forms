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
import React from 'react';
import _ from 'lodash';
export var MUIFileInput = function (props) {
    var multiple = props.multiple, accept = props.accept, disableDefaultTooltip = props.disableDefaultTooltip, invisible = props.invisible, disabled = props.disabled, onChange = props.onChange, _a = props.inputProps, inputProps = _a === void 0 ? {} : _a;
    var handleChange = function (event) {
        var selectedFiles = event.target.files;
        if (selectedFiles) {
            var allFiles_1 = [];
            _.each(selectedFiles, function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var fileInfo = {
                        name: file.name,
                        type: file.type,
                        size: Math.round(file.size / 1000) + ' kB',
                        base64: reader.result,
                        file: file,
                    };
                    allFiles_1.push(fileInfo);
                    if (allFiles_1.length === (selectedFiles && selectedFiles.length)) {
                        if (multiple)
                            onChange === null || onChange === void 0 ? void 0 : onChange(allFiles_1[0]);
                        else
                            onChange === null || onChange === void 0 ? void 0 : onChange(allFiles_1);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    return (React.createElement("input", __assign({ type: "file", disabled: disabled, multiple: multiple, style: invisible ? { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' } : {}, title: disableDefaultTooltip ? " " : undefined, accept: accept, onChange: handleChange }, inputProps)));
};
