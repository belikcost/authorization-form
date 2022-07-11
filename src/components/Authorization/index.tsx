import React, { FC, useCallback } from "react";

import Form, { FieldsValues, IFormProps } from "./components/Form";
import { FieldTypesEnum } from "./components/Form/components/Field";
import Button from "./components/Button";

import styles from "./index.module.css";

const validateEmail = (value: string) => {
  const haveEmailSign = value.split("").some((symbol) => symbol === "@");
  if (!haveEmailSign) return "Введите корректный Email.";
  return null;
};

const validatePassword = (value: string) => {
  if (value.length < 8) return "Пароль должен содержать 8 или более символов.";
  return null;
};

const FORM_FIELDS = [
  {
    name: "email",
    label: "Email",
    placeholder: "Введите Email",
    validate: validateEmail,
    testId: "emailField",
  },
  {
    name: "password",
    type: FieldTypesEnum.password,
    label: "Пароль",
    placeholder: "Введите пароль",
    validate: validatePassword,
    testId: "passwordField",
  },
];

export interface IAuthorizationProps {
  onSubmit: IFormProps["onSubmit"];
}

const Authorization: FC<IAuthorizationProps> = ({ onSubmit }) => {
  return (
    <div className={styles.authorization} data-testid="authorization">
      <div className={styles.modal}>
        <h1 className={styles.title}>Авторизация</h1>
        <Form fields={FORM_FIELDS} onSubmit={onSubmit} testId="authorizationForm">
          {(isFill) => (
            <Button className={styles.submitButton} isDisabled={!isFill} testId="authorizationButton">
              Войти
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Authorization;
