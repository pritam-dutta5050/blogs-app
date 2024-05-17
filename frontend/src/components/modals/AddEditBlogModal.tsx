import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from '../form/TextInputField'
import { useForm } from 'react-hook-form';
import { BlogInterface } from '../../interfaces/BlogInterface';
import * as BlogsApi from "../../network/blogs_api";
import { BlogModel } from '../../models/BlogModel';
import { UnauthorizedError } from '../../errors/httperrors';

interface AddEditBlogModalProps{
    onDismiss: ()=>void;
    onBlogAdditionSuccessful: (responseBlog: BlogModel)=>void;
}

const AddEditBlogModal = ({onDismiss, onBlogAdditionSuccessful}:AddEditBlogModalProps) => {
    const [errorText, setErrorText] = useState<string|null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogInterface>({
    defaultValues: {
      blogTitle: "",
      blogContent: "",
    },
  });

  async function onSubmit(blogBody:BlogInterface){
    try {
      const responseBlog = await BlogsApi.addBlog(blogBody);
      onBlogAdditionSuccessful(responseBlog);
    } catch (error) {
      if(error instanceof UnauthorizedError){
        setErrorText(error.message);
      }
      else{
        alert(error);

      }
      console.error(error);
    }
  }
  return (
    <div>
        <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorText && 
        <Alert variant='danger'>
          {errorText}
        </Alert>
        }
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField 
            label="Title"
            name="blogTitle"
            type="text"
            placeholder="Enter blog title"
            register={register}
            registerOptions={{required: "Title is required"}}
            error={errors.blogTitle}
            isFeedbackRequired = {true}
            />
            <TextInputField 
            label="Content"
            name="blogContent"
            type="text"
            placeholder="Enter content for the blog"
            register={register}
            error={errors.blogContent}
            isFeedbackRequired = {true}
            as={"textarea"}
            rows = {8}
            />
            <Button type="submit" disabled={isSubmitting} className='mt-2'>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddEditBlogModal