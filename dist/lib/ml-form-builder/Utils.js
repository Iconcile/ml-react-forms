import { map, isString, get } from 'lodash';
export var getMenuOptions = function (options) {
    return map(options, function (item) {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
};
export var getFieldError = function (fieldName, formikProps, checkTouched) {
    if (checkTouched === void 0) { checkTouched = true; }
    var fieldError = get(formikProps, "errors.".concat(fieldName));
    var isTouched = get(formikProps, "touched.".concat(fieldName));
    if (formikProps.submitCount < 1)
        if (checkTouched && !isTouched)
            return '';
    return fieldError;
};
