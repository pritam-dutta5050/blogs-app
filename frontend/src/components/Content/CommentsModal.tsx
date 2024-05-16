import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CommentModel } from "../../models/commentModel";
import TextInputField from "../form/TextInputField";
import CommentItem from "./CommentItem";
import { useState } from "react";
import * as BlogsApi from "../../network/blogs_api";
import { CommentInterface } from "../../interfaces/CommentInterface";
import { BlogModel } from "../../models/BlogModel";

interface CommentsModalProps {
  blog: BlogModel;
  comments: CommentModel[];
  onDismiss: () => void;
  onCommentsModified: (updatedBlog: BlogModel) => void;
  loggedInUserId: string;
}

const CommentsModal = ({
  blog,
  comments,
  onDismiss,
  onCommentsModified,
  loggedInUserId,
}: CommentsModalProps) => {

  const [currentComments, setCurrentComments] = useState<CommentModel[]>(comments);
  const [isAdding, setIsAdding] = useState(true);
  const [commentId, setCommentId] = useState("");

  const { register, handleSubmit, formState: { isSubmitting, errors }, setValue, } = useForm<CommentInterface>();
  
  async function onSubmit(commentBody: CommentInterface) {
    if (isAdding) {
      console.log(JSON.stringify(commentBody));
      await addComment(commentBody, blog._id ? blog._id : "");
    } else {
      commentBody.commentId = commentId;
      // console.log(JSON.stringify(commentBody));
      await editComment(commentBody, blog._id ? blog._id : "");
    }
  }

  async function addComment(commentBody: CommentInterface, blogId: string) {
    try {
      const updatedBlog = await BlogsApi.addComment(commentBody, blogId);
      setCurrentComments(updatedBlog.comments);
      onCommentsModified(updatedBlog);
      setValue("commentText", "");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteComment(commentId: string, blogId: string) {
    try {
      const blog = await BlogsApi.deleteComment(commentId, blogId);
      setCurrentComments(blog.comments);
      onCommentsModified(blog);
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(comment: CommentInterface, blogId: string) {
    try {
      const blog = await BlogsApi.editComment(comment, blogId);
      setCurrentComments(blog.comments);
      onCommentsModified(blog);
      setIsAdding(true);
      setValue("commentText", "");
    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment._id}
              blogUserId={blog.userId}
              loggedInUserId={loggedInUserId}
              deleteComment={() => {
                deleteComment(comment._id, blog._id ? blog._id : "");
              }}
              editComment={() => {
                setIsAdding(false);
                setValue("commentText", comment.commentText);
                setCommentId(comment._id);
              }}
            />
          ))
        ) : (
          <div className="text-center">No comments yet</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <Row className="m-1">
            <Col xs={10}>
              <TextInputField
                name="commentText"
                placeholder="Add comment here"
                register={register}
                registerOptions={{ required: "Blank comment not allowed" }}
                error={errors.commentText}
                type="text"
                isFeedbackRequired={true}
                as="textarea"
                rows={3}
              />
            </Col>
            <Col xs={2}>
              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={isSubmitting}
              >
                {isAdding ? "ADD" : "Update"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
