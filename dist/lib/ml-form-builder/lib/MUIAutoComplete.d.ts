import { InputBaseComponentProps } from '@mui/material';
import { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import * as React from 'react';
import { IFieldProps } from '..';
export interface IHighlighterProps {
    highlightText?: boolean;
    highlightColor?: string;
    highlighterStyles?: object;
}
export interface TQueries<T> {
    term: string;
    sendAt: number;
    order: number;
    options?: T[];
}
export interface IMUIAutoCompleteProps<T> extends Partial<AutocompleteProps<T, boolean, boolean, boolean>> {
    options?: T[];
    renderInputProps?: AutocompleteRenderInputParams;
    inputProps?: InputBaseComponentProps;
    highlighterProps?: IHighlighterProps;
    getQueryResponse?: (newTerm: string) => Promise<Array<T>>;
    onItemSelected?: (value: T | T[] | null) => void;
    multiple?: boolean;
    transformValues?: (values: any) => T | T[];
    idKey?: string;
    clearOnSelect?: boolean;
}
export interface IProps<T> extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps<T>;
}
export declare const MUIAutocomplete: React.MemoExoticComponent<(<T>(props: IProps<T>) => React.JSX.Element)>;
