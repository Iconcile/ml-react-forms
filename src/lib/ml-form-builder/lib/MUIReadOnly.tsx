import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IFieldProps } from '../index';

export interface IProps extends IFieldProps {
    'data-testid'?: string
    label: React.ReactNode
    value: React.ReactNode
}
export const MUIReadOnly: React.FC<IProps> = (props) => {
    return (
        <div data-testid={props['data-testid'] || `readonly-${props.fieldConfig?.name || props.fieldConfig?.valueKey || 'field'}`}>
            <Typography variant="subtitle1">{props.label || ''}</Typography>
            <Typography>{props.value || 'NA'}</Typography>
        </div>
    )
}

export default MUIReadOnly;