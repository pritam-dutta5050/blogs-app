import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { UserModel } from "../../models/UserModel";
import { CommentModel } from "../../models/commentModel";
import * as BlogsApi from "../../network/blogs_api";
import styles from "./CommentItem.module.css";

interface CommentItemProps {
  comment: CommentModel;
  loggedInUserId: string;
  blogUserId: string;
  deleteComment: () => void;
  editComment: () => void;
}
const CommentItem = ({
  comment,
  loggedInUserId,
  blogUserId,
  deleteComment,
  editComment,
}: CommentItemProps) => {
  const [commentUser, setCommentUser] = useState<UserModel | null>(null);

  useEffect(() => {
    async function getUserById(userId: string) {
      const user: UserModel = await BlogsApi.getUserById(userId);
      setCommentUser(user);
    }
    getUserById(comment.commentBy);
  }, [comment]);

  console.log("CommentItem component rendered");

  return (
    <Card className="mb-1 p-0">
      <Row>
        <Col>
          <Card.Title as={"h6"} className="w-auto ms-1 mt-1">
            {commentUser?.firstName} {commentUser?.lastName}
          </Card.Title>
        </Col>
        <Col xs={3} className="d-flex">
          {loggedInUserId === comment.commentBy && (
            <Col>
              <Button variant="outline-info" className="p-0 m-0 w-100" onClick={editComment}>
                <MdEdit />
              </Button>
            </Col>
          )}
          {(loggedInUserId === blogUserId ||
            loggedInUserId === comment.commentBy) && (
            <Col>
              <Button
                variant="outline-danger"
                className="p-0 m-0 w-100"
                onClick={deleteComment}
              >
                <MdDelete />
              </Button>
            </Col>
          )}
        </Col>
      </Row>
      <Row>
        <Card.Text className="ms-1">{comment.commentText}</Card.Text>
      </Row>
    </Card>
  );
};

export default CommentItem;
