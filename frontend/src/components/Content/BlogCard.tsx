import "bootstrap/dist/css/bootstrap.min.css";
import { HttpError } from "http-errors";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { MdMessage, MdThumbUp } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { BlogModel } from "../../models/BlogModel";
import { UserModel } from "../../models/UserModel";
import * as BlogsApi from "../../network/blogs_api";
import { UserContext } from "../../store/loggedInUser-store";
import { formatDate } from "../../utils/formatDate";
import styles from "./BlogCard.module.css";
import CommentsModal from "./CommentsModal";
import { BlogListContext } from "../../store/blog-list-store";

interface BlogCardProps {
  blog: BlogModel;
  onEditButtonClicked: () => void;
}

const BlogCard = ({
  blog,
  onEditButtonClicked,
}: BlogCardProps) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogModel>(blog);
  const [blogUser, setBlogUser] = useState<UserModel | null>(null);

  const loggedInuserId = useContext(UserContext).user?._id;
  const {hideBlog, deleteBlog} = useContext(BlogListContext);

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
        <span
          className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${styles.cross}`}
          onClick={() => hideBlog(blog._id)}
        >
          <RxCross1/>
        </span>

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
              <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item onClick={onEditButtonClicked}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>{deleteBlog(blog._id)}}>
                  Delete
                </Dropdown.Item>
              </DropdownButton>
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
