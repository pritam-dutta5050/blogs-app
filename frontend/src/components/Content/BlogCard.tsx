import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MdMessage, MdThumbUp } from "react-icons/md";
import { BlogModel } from "../../models/BlogModel";
import { UserModel } from "../../models/UserModel";
import * as BlogsApi from "../../network/blogs_api";
import CommentsModal from "./CommentsModal";

interface BlogCardProps {
  blog: BlogModel;
  loggedInuserId: string;
}

const BlogCard = ({ blog, loggedInuserId }: BlogCardProps) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogModel>(blog);
  const [blogUser, setBlogUser] = useState<UserModel | null>(null);

  async function likeBlog(blogId: string) {
    const blog = await BlogsApi.likeBlog(blogId);
    setCurrentBlog(blog);
  }

  useEffect(() => {
    async function getUserById(userId: string) {
      const user: UserModel = await BlogsApi.getUserById(userId);
      setBlogUser(user);
    }
    getUserById(blog.userId);
  }, []);

  return (
    <div>
      <Card className="m-auto mt-2 w-80">
        <Card.Header as={"h5"}>
          {blogUser?.firstName} {blogUser?.lastName}
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
          loggedInUserId={loggedInuserId}
        />
      )}
    </div>
  );
};

export default BlogCard;
