import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SignupInterface } from "../../interfaces/SignupInterface";
import TextInputField from "../form/TextInputField";
import { ConflictError } from "../../errors/httperrors";
import * as BlogsApi from "../../network/blogs_api";
import { UserModel } from "../../models/UserModel";

interface SignupModalInterface {
  onDismiss: () => void;
  onSignupSuccessful: (user: UserModel) => void;
}

const SignupModal = ({ onDismiss, onSignupSuccessful }: SignupModalInterface) => {
  const [errorText, setErrorText] = useState<string|null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInterface>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function onSubmit(credentials: SignupInterface) {
    try {
      const responseUser = await BlogsApi.signupUser(credentials);
      onSignupSuccessful(responseUser);
      
    } catch (error) {
      if(error instanceof ConflictError){
        setErrorText(error.message);
      }
      else{
        alert(error);
      }
    }
  }
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorText && 
        <Alert variant='danger'>
          {errorText}
        </Alert>
        }
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Username"
              register={register}
              registerOptions={{ required: "Username is required" }}
              error={errors.username}
              isFeedbackRequired={true}
            />
            <TextInputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              register={register}
              registerOptions={{ required: "First name is required" }}
              error={errors.firstName}
              isFeedbackRequired={true}
            />
            <TextInputField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              register={register}
              error={errors.lastName}
              isFeedbackRequired={true}
            />
            <TextInputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              register={register}
              registerOptions={{ required: "Password is required" }}
              error={errors.password}
              isFeedbackRequired={true}
            />
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignupModal;
