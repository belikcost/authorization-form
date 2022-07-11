import React, { FC, FormEventHandler, ReactNode, useCallback, useMemo, useState } from "react";
import { memoizeWith } from "ramda";

import Field, { IFieldProps } from "./components/Field";
import styles from "./index.module.css";

type FieldType = Omit<IFieldProps, "onChange" | "value" | "error"> & {
  name: string;
  validate?: (value: IFieldProps["value"]) => IFieldProps["error"];
};

type FieldsState = Record<FieldType["name"], string>;
type FieldsErrors = Record<FieldType["name"], IFieldProps["error"]>;

export type FieldsValues = FieldsState;

export interface IFormProps {
  fields: FieldType[];
  onSubmit: (values: FieldsState) => void;
  testId: string;
  children: (isFill: boolean) => ReactNode;
}

const getInitialFieldsState = (fields: FieldType[]) => {
  const initialState: FieldsState = {};
  fields.forEach(({ name }) => (initialState[name] = ""));
  return initialState;
};

const getInitialFieldsErrors = (fields: FieldType[]) => {
  const initialErrors: FieldsErrors = {};
  fields.forEach(({ name }) => (initialErrors[name] = null));
  return initialErrors;
};

const Form: FC<IFormProps> = ({ fields, onSubmit, children, testId }) => {
  const [fieldsState, setFieldsState] = useState<FieldsState>(getInitialFieldsState(fields));
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(getInitialFieldsErrors(fields));

  const onChangeField = useMemo(
    () =>
      memoizeWith(String, (fieldName: FieldType["name"]) => (value: IFieldProps["value"]) => {
        setFieldsState((prevState) => ({ ...prevState, [fieldName]: value }));
      }),
    []
  );

  const validateFields = useCallback(() => {
    const errors: FieldsErrors = {};
    let isValid = true;

    fields.forEach(({ name, validate }) => {
      if (!validate) return;

      const error = validate(fieldsState[name]);
      if (error) isValid = false;
      errors[name] = error;
    });
    setFieldsErrors(errors);

    return isValid;
  }, [fields, fieldsState]);

  const handleOnSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateFields()) return;
      onSubmit(fieldsState);
    },
    [fieldsState, onSubmit, validateFields]
  );

  const isFill = useMemo(() => Object.entries(fieldsState).every(([_, value]) => value), [fieldsState]);

  return (
    <form className={styles.form} onSubmit={handleOnSubmit} data-testid={testId}>
      {fields.map((field) => {
        return (
          <Field
            {...field}
            value={fieldsState[field.name]}
            onChange={onChangeField(field.name)}
            error={fieldsErrors[field.name]}
            key={field.name}
          />
        );
      })}
      {children(isFill)}
    </form>
  );
};

export default React.memo(Form);
