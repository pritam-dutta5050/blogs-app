import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MdDelete, MdEdit, MdMessage, MdThumbUp } from "react-icons/md";
import { BlogModel } from "../../models/BlogModel";
import { UserModel } from "../../models/UserModel";
import * as BlogsApi from "../../network/blogs_api";
import CommentsModal from "./CommentsModal";
import styles from "./BlogCard.module.css";
import { formatDate } from "../../utils/formatDate";
import "bootstrap/dist/css/bootstrap.min.css";
import { HttpError } from "http-errors";
import { LoggedinUserContext } from "../../store/loggedInUser-store";

interface BlogCardProps {
  blog: BlogModel;
  onDeleteButtonClicked: () => void;
  onEditButtonClicked: () => void;
}

const BlogCard = ({
  blog,
  onDeleteButtonClicked,
  onEditButtonClicked,
}: BlogCardProps) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogModel>(blog);
  const [blogUser, setBlogUser] = useState<UserModel | null>(null);

  const loggedInuserId = useContext(LoggedinUserContext)?._id;

  async function likeBlog(blogId: string) {
    try {
      const blog = await BlogsApi.likeBlog(blogId);
      setCurrentBlog(blog);
    } catch (error) {
      if (error instanceof HttpError) {
        alert(error.message);
      } else {
        alert(error + "I am here");
      }
    }
  }

  async function getUserById(userId: string) {
    const user: UserModel = await BlogsApi.getUserById(userId);
    setBlogUser(user);
  }
  useEffect(() => {
    getUserById(blog.userId);
    setCurrentBlog(blog);
  }, [blog]);

  console.log("BlogCard component rendered");

  return (
    <div>
      <Card className={`${styles.blogCard}`}>
        <Card.Header as={"h5"} className={styles.cardHeader}>
          <div className={`${styles.blogUser}`}>
            {blogUser?.firstName} {blogUser?.lastName}
            <br />
            <span className={styles.timestamp}>
              {formatDate(blog.createdAt)}
            </span>
          </div>
          {blog.userId === loggedInuserId && (
            <div className={`${styles.headerButtons}`}>
              <Button
                variant="info"
                className={`${styles.headerButton}`}
                onClick={onEditButtonClicked}
              >
                <MdEdit />
              </Button>

              <Button
                variant="danger"
                className={`${styles.headerButton}`}
                onClick={onDeleteButtonClicked}
              >
                <MdDelete />
              </Button>
            </div>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title as={"h6"}>{currentBlog.blogTitle}</Card.Title>
          <Card.Text>{currentBlog.blogContent}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Container className="m-auto">
            <Row>
              <Col xs={6}>
                <Button
                  className="me-2 w-100 h-100"
                  variant={
                    loggedInuserId !== undefined &&
                    !currentBlog.likes.includes(loggedInuserId)
                      ? "outline-primary"
                      : "primary"
                  }
                  onClick={() => {
                    if (currentBlog._id) {
                      likeBlog(currentBlog._id);
                    }
                  }}
                >
                  <MdThumbUp className="me-2" />
                  {currentBlog.likes.length}
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  className="ms-2 w-100 h-100"
                  variant={showCommentModal ? "success" : "outline-success"}
                  onClick={() => setShowCommentModal(!showCommentModal)}
                >
                  <MdMessage className="me-2" />
                  {currentBlog.comments.length}
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
      {showCommentModal && (
        <CommentsModal
          blog={currentBlog}
          comments={currentBlog.comments}
          onDismiss={() => setShowCommentModal(false)}
          onCommentsModified={(updatedBlog) => setCurrentBlog(updatedBlog)}
        />
      )}
    </div>
  );
};

export default BlogCard;
