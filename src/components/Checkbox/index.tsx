import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  label?: ReactNode;
  onToggle: (state: boolean) => void;
}

export function Checkbox({
  checked,
  label,
  onToggle,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked ?? false);

  useEffect(() => {
    onToggle(isChecked);
  }, [isChecked]);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={styles.container}>
      <input
        {...props}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.checkbox}
      ></input>
      {label && (
        <label className={styles.checkboxLabel} htmlFor={props.id}>
          {label}
        </label>
      )}
    </div>
  );
}
