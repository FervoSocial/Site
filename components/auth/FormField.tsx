import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type SharedProps = {
  error?: string;
  hint?: string;
  id: string;
  label: string;
};

type InputFieldProps = SharedProps &
  InputHTMLAttributes<HTMLInputElement> & {
    children?: never;
    kind?: "input";
  };

type SelectFieldProps = SharedProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    children: ReactNode;
    kind: "select";
  };

type FormFieldProps = InputFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { error, hint, id, label, kind = "input", ...fieldProps } = props;
  const descriptionId = hint || error ? `${id}-description` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {kind === "select" ? (
        <select
          {...(fieldProps as SelectHTMLAttributes<HTMLSelectElement>)}
          id={id}
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error)}
        />
      )}
      {hint || error ? (
        <p id={descriptionId} className={error ? "field-message field-error" : "field-message"}>
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}
