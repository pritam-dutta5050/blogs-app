import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginInterface } from "../../interfaces/LoginInterface";
import TextInputField from "../form/TextInputField";
import { UserModel } from "../../models/UserModel";
import { UnauthorizedError } from "../../errors/httperrors";
import { useState } from "react";
import * as BlogsApi from "../../network/blogs_api";

interface LoginModalInterface {
  onDismiss: () => void;
  onLoginSuccessful: (user: UserModel) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalInterface) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInterface>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(credentials: LoginInterface) {
    try {
      const responseUser = await BlogsApi.loginUser(credentials);
      onLoginSuccessful(responseUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorText && <Alert variant="danger">{errorText}</Alert>}
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
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              register={register}
              registerOptions={{ required: "Password is required" }}
              error={errors.password}
              isFeedbackRequired={true}
            />
            <Button type="submit" disabled={isSubmitting}
            className="mt-2"
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginModal;
