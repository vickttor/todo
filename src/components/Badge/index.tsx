import { HTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.css";

interface BadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <p className={styles.badge} {...props}>
      {children}
    </p>
  );
}
