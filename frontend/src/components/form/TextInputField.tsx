import React from "react";
import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  label?: string,
  name: string,
  type: string,
  placeholder: string,
  register: UseFormRegister<any>,
  registerOptions?: RegisterOptions,
  error?: FieldError,
  isFeedbackRequired: boolean,
  [x:string]: any,
}

const TextInputField = ({
  label,
  name,
  type,
  placeholder,
  register,
  registerOptions,
  error,
  isFeedbackRequired,
  ...props
}: TextInputFieldProps) => {
  return (
    <Form.Group controlId={name + "-input"}>
      {label &&
      <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        isInvalid={!!error}
        {...props}
      />
      {isFeedbackRequired &&
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
}
    </Form.Group>
  );
};

export default TextInputField;
