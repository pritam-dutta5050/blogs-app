import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BlogModel } from "../../models/BlogModel";
import * as BlogsApi from "../../network/blogs_api";
import BlogCard from "./BlogCard";
import AddEditBlogModal from "../modals/AddEditBlogModal";

interface loggedInContentProps {
  userId: string;
}
const LoggedInContent = ({ userId }: loggedInContentProps) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNoteLoadingError, setShowNoteLoadingError] = useState(false);
  const [showAddEditBlogModal, setShowAddEditBlogModal] = useState(false);

  async function loadNotes() {
    try {
      setNotesLoading(true);
      const blogsBuffer = await BlogsApi.fetchBlogs();
      setBlogs(blogsBuffer);
    } catch (error) {
      setShowNoteLoadingError(true);
      console.error(error);
      alert(error);
    } finally {
      setNotesLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);
  // const blogs: BlogModel[] = sampleBlogData;

  // const blogCards = (

  // );
  return (
    <Container>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNoteLoadingError && <p>Something went wrong</p>}
      <center>
        <Button
          variant="primary"
          onClick={() => setShowAddEditBlogModal(true)}
          className="m-2 w-50"
        >
          Add Blog
        </Button>
      </center>
      {showAddEditBlogModal && (
        <AddEditBlogModal
          onDismiss={() => setShowAddEditBlogModal(false)}
          onBlogAdditionSuccessful={(blog) => {
            blogs.splice(0, 0, blog);
            setShowAddEditBlogModal(false);
          }}
        />
      )}
      {blogs.map((blog: BlogModel) => (
        <BlogCard blog={blog} key={blog._id} loggedInuserId={userId} />
      ))}
    </Container>
  );
};

export default LoggedInContent;
