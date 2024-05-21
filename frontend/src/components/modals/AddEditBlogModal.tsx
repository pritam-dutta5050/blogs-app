import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BlogInterface } from "../../interfaces/BlogInterface";
import { BlogModel } from "../../models/BlogModel";
import TextInputField from "../form/TextInputField";
import styles from "./AddEditBlogModal.module.css";

interface AddEditBlogModalProps {
  onDismiss: () => void;
  onSubmitButtonPressed: (blogBody: BlogInterface) => void;
  blogToEdit?: BlogModel | null;
}

const AddEditBlogModal = ({
  onDismiss,
  onSubmitButtonPressed,
  blogToEdit,
}: AddEditBlogModalProps) => {
  // const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogInterface>({
    defaultValues: {
      blogTitle: blogToEdit?.blogTitle || "",
      blogContent: blogToEdit?.blogContent || "",
    },
  });

  function onSubmit(blogBody: BlogInterface) {
    onSubmitButtonPressed(blogBody);
  }

  console.log("AddEditBlogModal component rendered");
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>{blogToEdit ? "Update Blog" : "Add Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {errorText && <Alert variant="danger">{errorText}</Alert>} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              label="Title"
              name="blogTitle"
              type="text"
              placeholder="Enter blog title"
              register={register}
              registerOptions={{ required: "Title is required" }}
              error={errors.blogTitle}
              isFeedbackRequired={true}
            />
            <TextInputField
              label="Content"
              name="blogContent"
              type="text"
              placeholder="Enter content for the blog"
              register={register}
              error={errors.blogContent}
              isFeedbackRequired={true}
              as={"textarea"}
              rows={8}
            />
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {blogToEdit ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddEditBlogModal;
