import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "./index.module.css";

interface IButtonProps extends PropsWithChildren {
    isDisabled?: boolean;
    className?: string;
    testId: string;
}

const Button: FC<IButtonProps> = ({ children, isDisabled = false, className, testId }) => {
    return (
        <button className={classNames(styles.button, className)} disabled={isDisabled} data-testid={testId}>{children}</button>
    );
};

export default React.memo(Button);