import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, className, ...props }: Props) => {
  return (
    <button className={`${styles.button} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};
