import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SignupInterface } from "../../interfaces/SignupInterface";
import store from "../../redux-store";
import { signupUser } from "../../redux-store/userSlice";
import TextInputField from "../form/TextInputField";

interface SignupModalInterface {
  onDismiss: () => void;
  onSignupSuccessful: (isSuccessful: boolean) => void;
}

const SignupModal = ({ onDismiss, onSignupSuccessful }: SignupModalInterface) => {
  
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
    store.dispatch(signupUser(credentials));
    onSignupSuccessful(true);
  }
  console.log("SignupModal component rendered");
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {errorText && 
        <Alert variant='danger'>
          {errorText}
        </Alert>
        } */}
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
