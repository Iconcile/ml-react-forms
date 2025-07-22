import { FormikValues } from "formik";
import { FormConfig } from "../..";
export type TFieldConditions = {
    hidden?: boolean;
    logicOpn?: string;
    defaultProps?: object;
    postEffectProps?: object;
    values?: ConditionCompareItem[];
};
type compareValueType = string | number | boolean | null;
interface ConditionCompareItem {
    key: string;
    compareValue: compareValueType;
    operator: string;
}
export interface IConditionalProps {
    hidden?: boolean;
    finalProps?: object;
}
export declare const getConditionalProps: (itemConfig: FormConfig, formikProps: FormikValues) => {
    finalProps: object | undefined;
    hidden?: undefined;
} | {
    finalProps: object | undefined;
    hidden: boolean;
};
export {};
