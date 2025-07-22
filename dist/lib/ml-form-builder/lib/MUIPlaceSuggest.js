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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { getFieldError } from '../Utils';
import { TextField, List, ListItem, ListItemText, InputAdornment, IconButton, Paper } from '@mui/material';
import { Close } from '@mui/icons-material';
var useState = React.useState;
var SearchField = function (props) {
    var address = props.address, fieldProps = props.fieldProps, _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, value = props.value, resetField = props.resetField, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var inputProps = (value && value.lat && value.lng) ? ({
        endAdornment: (React.createElement(InputAdornment, { position: "end" },
            React.createElement(IconButton, { "aria-label": "remove selected place", edge: "end", onClick: function () { return resetField(); } },
                React.createElement(Close, null))))
    }) : {};
    var _c = fieldProps.textFieldProps, textFieldProps = _c === void 0 ? {} : _c;
    var fieldInputProps = __assign(__assign({}, textFieldProps.InputProps), inputProps);
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var updatedProps = __assign(__assign({}, __assign(__assign({}, textFieldProps), { InputProps: fieldInputProps })), { error: !!fieldError, helperText: (fieldError || ''), name: fieldProps.name });
    return (React.createElement("div", null,
        React.createElement(TextField, __assign({ value: address || '' }, placeAutocompleteProps.getInputProps({
            label: textFieldProps.label || 'Search Places',
            className: 'location-search-input',
            onBlur: formikProps.handleBlur
        }), updatedProps))));
};
var LIST_CONTAINER_STYLES = { position: 'absolute', left: 0, top: '100%', right: 0, zIndex: 500 };
var PlaceList = function (props) {
    var _a = props.placeAutocompleteProps, placeAutocompleteProps = _a === void 0 ? {} : _a, listProps = props.listProps, listItemProps = props.listItemProps, listContainerStyle = props.listContainerStyle;
    var suggestions = placeAutocompleteProps.suggestions, getSuggestionItemProps = placeAutocompleteProps.getSuggestionItemProps;
    return (React.createElement("div", { className: "autocomplete-dropdown-container" },
        React.createElement(Paper, { style: __assign(__assign(__assign({}, LIST_CONTAINER_STYLES), listContainerStyle), { visibility: ((suggestions.length) ? 'visible' : 'hidden') }) },
            React.createElement(List, __assign({}, listProps), suggestions.map(function (suggestion) {
                var className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                var style = { cursor: 'pointer' };
                return (React.createElement(ListItem, __assign({ disableGutters: true, dense: true, selected: suggestion.active }, getSuggestionItemProps(suggestion, {
                    className: className,
                    style: style
                }), __assign({}, listItemProps)),
                    React.createElement(ListItemText, { primary: suggestion.formattedSuggestion.mainText, secondary: suggestion.formattedSuggestion.secondaryText })));
            })))));
};
var FieldLayout = function (props) {
    var currentAddress = props.currentAddress, selectedValue = props.selectedValue, placeAutocompleteProps = props.placeAutocompleteProps, name = props.name, id = props.id, textFieldProps = props.textFieldProps;
    return (React.createElement("div", null,
        React.createElement(SearchField, { resetField: props.resetField, address: currentAddress, value: selectedValue, placeAutocompleteProps: placeAutocompleteProps, formikProps: props.formikProps, fieldProps: { name: name, id: id, textFieldProps: textFieldProps } }),
        React.createElement(PlaceList, { placeAutocompleteProps: placeAutocompleteProps, listContainerStyle: props.listContainerStyle })));
};
export var MUIPlaceSuggest = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var _c = useState(''), address = _c[0], setAddress = _c[1];
    var placeAutocompleteProps = fieldProps.placeAutocompleteProps, locationNameKey = fieldProps.locationNameKey, outputResult = fieldProps.outputResult, fieldLayoutProps = __rest(fieldProps, ["placeAutocompleteProps", "locationNameKey", "outputResult"]);
    var selectedValue = formikProps.values[(fieldProps.name || '')];
    var locationName = formikProps.values[(locationNameKey || '')];
    React.useEffect(function () {
        setAddress(locationName || '');
    }, []);
    var handleChange = function (address) {
        setAddress(address);
    };
    var handleSelect = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var geoAdress, selectedAddress, latLng;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, geocodeByAddress(address)];
                case 1:
                    geoAdress = _a.sent();
                    selectedAddress = geoAdress[0];
                    if (!selectedAddress)
                        return [2 /*return*/];
                    return [4 /*yield*/, getLatLng(selectedAddress)];
                case 2:
                    latLng = _a.sent();
                    formikProps.setFieldValue(fieldProps.name, latLng);
                    setAddress(selectedAddress.formatted_address);
                    if (locationName)
                        formikProps.setFieldValue(locationNameKey, selectedAddress.formatted_address);
                    if (outputResult)
                        formikProps.setFieldValue(outputResult, selectedAddress);
                    return [2 /*return*/];
            }
        });
    }); };
    var resetField = function () {
        setAddress('');
        formikProps.setFieldValue(fieldProps.name);
    };
    return (React.createElement("div", { style: { position: 'relative' } },
        React.createElement(PlacesAutocomplete, __assign({ value: address, onChange: handleChange, onSelect: handleSelect }, placeAutocompleteProps), function (placeCompleteProps) { return (React.createElement(FieldLayout, __assign({ placeAutocompleteProps: placeCompleteProps, resetField: resetField, currentAddress: address, selectedValue: selectedValue, formikProps: formikProps }, fieldLayoutProps))); })));
};
