import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginInterface } from "../../interfaces/LoginInterface";
import store from "../../redux-store";
import { loginUser } from "../../redux-store/userSlice";
import TextInputField from "../form/TextInputField";

interface LoginModalInterface {
  onDismiss: () => void;
  onLoginSuccessful: (isSuccessful: boolean) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalInterface) => {

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
    store.dispatch(loginUser(credentials));
    onLoginSuccessful(true);
  }

  console.log("LoginModal component rendered");
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {errorText && <Alert variant="danger">{errorText}</Alert>} */}
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
