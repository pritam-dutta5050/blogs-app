import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CommentInterface } from "../../interfaces/CommentInterface";
import { BlogModel } from "../../models/BlogModel";
import { CommentModel } from "../../models/commentModel";
import * as CommentsApi from "../../network/comments_api";
import CommentItem from "../blogContent/CommentItem";
import TextInputField from "../form/TextInputField";

interface CommentsModalProps {
  blog: BlogModel;
  comments: CommentModel[];
  onDismiss: () => void;
  onCommentsModified: (updatedBlog: BlogModel) => void;
}

const CommentsModal = ({
  blog,
  comments,
  onDismiss,
  onCommentsModified,
}: CommentsModalProps) => {
  const [currentComments, setCurrentComments] =
    useState<CommentModel[]>(comments);
  const [isAdding, setIsAdding] = useState(true);
  const [commentId, setCommentId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<CommentInterface>();

  async function onSubmit(commentBody: CommentInterface) {
    if (isAdding) {
      console.log(JSON.stringify(commentBody));
      await addComment(commentBody, blog._id ? blog._id : "");
    } else {
      commentBody.commentId = commentId;
      await editComment(commentBody, blog._id ? blog._id : "");
    }
  }

  async function addComment(commentBody: CommentInterface, blogId: string) {
    try {
      const updatedBlog = await CommentsApi.addComment(commentBody, blogId);
      setCurrentComments(updatedBlog.comments);
      onCommentsModified(updatedBlog);
      setValue("commentText", "");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteComment(commentId: string, blogId: string) {
    try {
      const blog = await CommentsApi.deleteComment(commentId, blogId);
      setCurrentComments(blog.comments);
      onCommentsModified(blog);
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(comment: CommentInterface, blogId: string) {
    try {
      const blog = await CommentsApi.editComment(comment, blogId);
      setCurrentComments(blog.comments);
      onCommentsModified(blog);
      setIsAdding(true);
      setValue("commentText", "");
    } catch (error) {
      console.error(error);
    }
  }

  console.log("CommentsModal component rendered");

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <Row className="m-1">
            <Col xs={9} className="m-0">
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
            <Col xs={3} className="m-0">
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
        {currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment._id}
              blogUserId={blog.userId}
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
    </Modal>
  );
};

export default CommentsModal;
