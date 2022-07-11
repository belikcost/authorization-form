import React, { ChangeEventHandler, FC, useCallback } from "react";

import styles from "./index.module.css";
import classNames from "classnames";

export enum FieldTypesEnum {
    password = "password"
}

export interface IFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: FieldTypesEnum;
    label: string;
    error: string | null;
    testId: string;
}

const Field: FC<IFieldProps> = ({ value, onChange, placeholder, type, label, error, testId }) => {
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => onChange(e.target.value),
        [onChange]
    );

    return (
        <label className={styles.field}>
            <span className={styles.label}>{label}</span>
            <input
                className={classNames(styles.input, { [styles.hasError]: error })}
                type={type}
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                data-testid={testId}
            />
            {error && (
                <span className={styles.error}>{error}</span>
            )}
        </label>
    );
};

export default React.memo(Field);