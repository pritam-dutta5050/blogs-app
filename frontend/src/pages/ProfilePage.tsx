import { useContext, useState } from "react";
import {
  Button,
  Card,
  Form
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import TextInputField from "../components/form/TextInputField";
import stylesTIF from "../components/form/TextInputField.module.css";
import { UserModel } from "../models/UserModel";
import { UserContext } from "../store/loggedInUser-store";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user,updateUser } = useContext(UserContext);
  const [editDisabled, setEditDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserModel>({
    defaultValues: {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      bio: user ? user.bio : "",
      gender: user ? user.gender : "",
      country: user ? user.country : "",
      proffesion: user? user.proffesion : "",
    },
  });

  const onSubmit = (data: UserModel) => {
    console.log(data);
    updateUser(data, user?._id ? user._id : "")
    setEditDisabled(true);
  };
  return (
    <div className={`${styles.container}`}>
      {!user && <Card className={`${styles.msgCard}`}>Please login first</Card>}
      {user && (
        <>
          <div className={`${styles.heading}`}>
            Profile
            <Button
              className={`${styles.headingButton}`}
              variant={editDisabled ? "warning" : "danger"}
              onClick={() => setEditDisabled(!editDisabled)}
            >
              {editDisabled ? (
                <div>
                  <FaEdit className="me-2" />
                  <span>Edit</span>
                </div>
              ) : (
                <div>
                  <MdCancel className="me-2" />
                  <span>Cancel</span>
                </div>
              )}
            </Button>
          </div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles.fieldContainer}`}
          >
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="First Name"
                name="firstName"
                type="text"
                placeholder=""
                register={register}
                error={errors.firstName}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                register={register}
                error={errors.lastName}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Email"
                name="email"
                type="email"
                placeholder=""
                register={register}
                error={errors.email}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Phone"
                name="phone"
                type="number"
                placeholder=""
                register={register}
                error={errors.phone}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Bio"
                name="bio"
                type="text"
                as="textarea"
                rows="4"
                placeholder="Describe yourself"
                register={register}
                error={errors.bio}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <Form.Group className="mb-3">
                <Form.Label className={`${stylesTIF.label}`}>Gender</Form.Label>
                <Form.Select
                  disabled={editDisabled}
                  {...register("gender")}
                >
                  <option>Female</option>
                  <option>Male</option>
                </Form.Select>
              </Form.Group>
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Country"
                name="country"
                type="text"
                placeholder=""
                register={register}
                error={errors.country}
                isFeedbackRequired={false}
              />
            </Card>
            <Card className={`${styles.fieldCard}`}>
              <TextInputField
                disabled={editDisabled}
                label="Profession"
                name="proffesion"
                type="text"
                placeholder=""
                register={register}
                error={errors.proffesion}
                isFeedbackRequired={false}
              />
            </Card>
            {!editDisabled && (
              <Button
                variant="success"
                type="submit"
                className={`${styles.updateBtn}`}
                disabled={isSubmitting}
              >
                Update
              </Button>
            )}
          </Form>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
