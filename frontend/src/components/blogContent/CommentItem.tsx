import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { UserModel } from "../../models/UserModel";
import { CommentModel } from "../../models/commentModel";
import * as UsersApi from "../../network/users_api";
import { UserContext } from "../../store/loggedInUser-store";
import OptionsButton from "./OptionsButton";

interface CommentItemProps {
  comment: CommentModel;
  blogUserId: string;
  deleteComment: () => void;
  editComment: () => void;
}
const CommentItem = ({
  comment,
  blogUserId,
  deleteComment,
  editComment,
}: CommentItemProps) => {
  const [commentUser, setCommentUser] = useState<UserModel | null>(null);
  const loggedInUserId = useContext(UserContext).user?._id;

  useEffect(() => {
    async function getUserById(userId: string) {
      const user: UserModel = await UsersApi.getUserById(userId);
      setCommentUser(user);
    }
    getUserById(comment.commentBy);
  }, [comment]);

  console.log("CommentItem component rendered");
  const btnArr = [
    loggedInUserId === comment.commentBy,
    loggedInUserId === blogUserId || loggedInUserId === comment.commentBy,
  ];

  return (
    commentUser && (
      <Card className="mb-1 p-0">
        <div className="d-flex justify-content-between">
          <Card.Title as={"h6"} className="w-auto ms-1 mt-1">
            {commentUser?.firstName} {commentUser?.lastName}
          </Card.Title>
          {btnArr[1] && (
            <OptionsButton
              btnArr={btnArr}
              onEditButtonClicked={editComment}
              onDeleteButtonClicked={deleteComment}
            />
          )}
        </div>
        <Row>
          <Card.Text className="ms-1">{comment.commentText}</Card.Text>
        </Row>
      </Card>
    )
  );
};

export default CommentItem;
