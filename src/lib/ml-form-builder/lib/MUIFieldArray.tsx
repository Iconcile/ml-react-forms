import React, { memo } from 'react';
import { IFieldProps } from '../index';
import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { get, isEqual } from 'lodash';
import { IconButton, Button, ButtonProps, IconButtonProps, TextFieldProps, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getComponentConfig } from '../index';

interface IFieldArrayProps {
    name: string
    id: string
    itemType: string
    addButtonProps?: ButtonProps
    addButtonText?: string
    addButton?: JSX.Element
    removeButton?: JSX.Element
    removeButtonProps?: IconButtonProps
    textFieldProps?: TextFieldProps
    defaultData?: any
    onRemove?: (arrayHelpers:FieldArrayRenderProps, index: number) => void
}
export interface IProps extends IFieldProps {
    fieldProps?: IFieldArrayProps
}

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

export const MUIFieldArray: React.FC<IProps> = memo((props) => {
    const { formikProps = {} as FormikValues, fieldProps = {} as IFieldArrayProps } = props;
    const { itemType, addButtonText = 'Add', addButtonProps, addButton, removeButton, removeButtonProps, textFieldProps = {}, defaultData = {}, onRemove } = fieldProps;
    const values = get(formikProps, `values.${fieldProps.name}`);
    const itemComponentConfig = getComponentConfig(itemType);

    const handleRemove = (arrayHelpers:FieldArrayRenderProps, index: number) => {
        arrayHelpers.remove(index)
        onRemove?.(arrayHelpers, index)
    }

    return (
        <FieldArray name={fieldProps.name}
            render={arrayHelpers => (
                <div>
                    {
                        (values || []).map((value: any, index: number) => (
                            <Box key={`${fieldProps.name}-${index}`} position={'relative'}>
                                {React.cloneElement(itemComponentConfig.component, { name: fieldProps.name, itemIndex: index, arrayHelpers, fieldValue: value, formikProps, ...itemComponentConfig.props, ...textFieldProps })}
                                {
                                    (removeButton) ? removeButton : (
                                        <IconButton sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '50%',
                                            transform: 'translate(0,-50%)'
                                        }} size="small" onClick={() => handleRemove(arrayHelpers, index)} {...removeButtonProps}><CloseIcon /></IconButton>
                                    )
                                }

                            </Box>
                        ))
                    }
                    <div>
                        {(addButton) ? addButton : (<Button type="button" onClick={() => arrayHelpers.push(defaultData)} {...addButtonProps}>{addButtonText}</Button>)}
                    </div>

                </div>

            )}
        />
    )
}, (p, n) => {
    p.fieldProps!.id = '1'
    n.fieldProps!.id = '1'

    const pFieldName = p.fieldProps?.name || ''
    const nFieldName = n.fieldProps?.name || ''

    // ========== Checking for getFieldError

    // Field Value
    if (!isEqual(get(p.formikProps, `values.${pFieldName}`), get(n.formikProps, `values.${nFieldName}`))) {
        return false
    }

    // Field Error
    if (!isEqual(get(p.formikProps, `errors.${pFieldName}`), get(n.formikProps, `errors.${nFieldName}`))) {
        return false
    }

    // get(formikProps, `touched.${fieldName}`)
    if (!isEqual(get(p.formikProps, `touched.${pFieldName}`), get(n.formikProps, `touched.${nFieldName}`))) {
        return false
    }

    // formikProps.submitCount
    if (!isEqual(p.formikProps?.submitCount, n.formikProps?.submitCount)) {
        return false
    }

    // Readonly Prop
    if (!isEqual(p.isReadOnly, n.isReadOnly)) {
        return false
    }

    // Field Props
    if (!isEqual(p.fieldProps, n.fieldProps)) {
        return false
    }
    return true
})