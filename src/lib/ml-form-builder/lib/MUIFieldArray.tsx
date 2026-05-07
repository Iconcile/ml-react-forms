import React, { memo } from 'react';
import { IFieldProps } from '../index';
import { FieldArray, FieldArrayRenderProps, FormikValues} from 'formik';
import { get, isEqual } from 'lodash';
import { IconButton, Button, ButtonProps, IconButtonProps, TextFieldProps, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getComponentConfig } from '../index';
import VirtualList from 'rc-virtual-list';

interface IFieldArrayProps {
    'data-testid'?: string
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
    virtualized?: boolean
    virtualizedHeight?: number
    virtualizedWidth?: number | string
    virtualizedItemHeight?: number
    virtualizedItemKey?: string | ((item: any) => React.Key)
    virtualizedAlwaysShowScrollbar?: boolean
    virtualizedContainerStyle?: React.CSSProperties
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
    const { itemType, addButtonText = 'Add', addButtonProps, addButton, removeButton, removeButtonProps, textFieldProps = {}, defaultData = {}, onRemove, virtualized = false, virtualizedHeight = 720, virtualizedWidth = '100%', virtualizedItemHeight = 88, virtualizedItemKey, virtualizedAlwaysShowScrollbar = false, virtualizedContainerStyle } = fieldProps;
    const values = get(formikProps, `values.${fieldProps.name}`) || [];
    const itemComponentConfig = getComponentConfig(itemType);
    const virtualListRef = React.useRef<any>(null);
    const addButtonItem = React.useMemo(() => ({ __mlFormFieldArrayAddButton: true }), []);
    const virtualizedValues = React.useMemo(() => virtualized ? [...values, addButtonItem] : values, [addButtonItem, values, virtualized]);

    const handleRemove = (arrayHelpers:FieldArrayRenderProps, index: number) => {
        arrayHelpers.remove(index)
        onRemove?.(arrayHelpers, index)
    }

    const handleAdd = (arrayHelpers: FieldArrayRenderProps) => {
        arrayHelpers.push(defaultData);
        window.setTimeout(() => {
            virtualListRef.current?.scrollTo?.({ index: values.length, align: 'top' });
        });
    }

    const getItemKey = (item: any) => {
        if (item?.__mlFormFieldArrayAddButton) return `${fieldProps.name}-add-button`;
        if (typeof virtualizedItemKey === 'function') return virtualizedItemKey(item);
        if (virtualizedItemKey) return item?.[virtualizedItemKey];
        return item?.TEMP_ID ?? item?.CONTRACT_SRV_RATE_ID ?? `${fieldProps.name}-${values.indexOf(item)}`;
    }

    const renderAddButton = (arrayHelpers: FieldArrayRenderProps, style?: React.CSSProperties) => (
        <Box key={`${fieldProps.name}-add-button`} style={style} padding={virtualized ? 1 : 0}>
            {(addButton) ? addButton : (<Button type="button" onClick={() => handleAdd(arrayHelpers)} {...addButtonProps} data-testid={fieldProps['data-testid'] || `field-array-add-${fieldProps.name}`}>{addButtonText}</Button>)}
        </Box>
    )

    const renderItem = (value: any, index: number, arrayHelpers: FieldArrayRenderProps, style?: React.CSSProperties) => (
        <Box key={getItemKey(value)} style={style} data-testid={fieldProps['data-testid'] ? `${fieldProps['data-testid']}-item-${index}` : `field-array-item-${fieldProps.name}-${index}`}>
            <Box position={'relative'} minHeight={virtualized ? virtualizedItemHeight : undefined} paddingRight={removeButton ? undefined : 5}>
                {React.cloneElement(itemComponentConfig.component, { name: fieldProps.name, itemIndex: index, arrayHelpers, fieldValue: value, formikProps, ...itemComponentConfig.props, ...textFieldProps })}
                {
                    (removeButton) ? removeButton : (
                        <IconButton sx={{
                            position: 'absolute',
                            right: 4,
                            top: '50%',
                            transform: 'translate(0,-50%)',
                            zIndex: 2,
                            backgroundColor: 'background.paper',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }} size="small" onClick={() => handleRemove(arrayHelpers, index)} {...removeButtonProps} data-testid={fieldProps['data-testid'] ? `${fieldProps['data-testid']}-remove-${index}` : `field-array-remove-${fieldProps.name}-${index}`}><CloseIcon /></IconButton>
                    )
                }
            </Box>
        </Box>
    )

    return (
        <FieldArray name={fieldProps.name}
            render={arrayHelpers => (
                <div>
                    {
                        virtualized ? (
                            <VirtualList
                                ref={virtualListRef}
                                data={virtualizedValues}
                                height={virtualizedHeight}
                                style={{ width: virtualizedWidth, ...virtualizedContainerStyle }}
                                itemHeight={virtualizedItemHeight}
                                itemKey={getItemKey}
                                fullHeight={false}
                                styles={virtualizedAlwaysShowScrollbar ? {
                                    verticalScrollBar: { visibility: 'visible' },
                                } : undefined}
                            >
                                {(value: any, index: number, { style }) => value?.__mlFormFieldArrayAddButton ? renderAddButton(arrayHelpers, style) : renderItem(value, index, arrayHelpers, style)}
                            </VirtualList>
                        ) : (
                            values.map((value: any, index: number) => renderItem(value, index, arrayHelpers))
                        )
                    }
                    {!virtualized ? <div>{renderAddButton(arrayHelpers)}</div> : null}

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
