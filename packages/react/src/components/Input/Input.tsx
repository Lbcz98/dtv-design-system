import { type InputHTMLAttributes, useId } from "react";
import { Text } from "../Text";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
}

export function Input({
  size = "md",
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  id: providedId,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy =
    [error && errorMessage ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          <Text variant="label" as="span">
            {label}
          </Text>
        </label>
      )}
      <input
        id={id}
        className={[styles.input, styles[size], error && styles.errorState]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && errorMessage && (
        <Text
          id={errorId}
          variant="caption"
          color="error"
          className={styles.helper}
        >
          {errorMessage}
        </Text>
      )}
      {!error && helperText && (
        <Text
          id={helperId}
          variant="caption"
          color="secondary"
          className={styles.helper}
        >
          {helperText}
        </Text>
      )}
    </div>
  );
}
