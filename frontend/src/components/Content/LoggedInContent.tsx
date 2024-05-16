import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BlogModel } from "../../models/BlogModel";
import * as BlogsApi from "../../network/blogs_api";
import BlogCard from "./BlogCard";

interface loggedInContentProps{
  userId: string,
}
const LoggedInContent = ({userId}: loggedInContentProps) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNoteLoadingError, setShowNoteLoadingError] = useState(false);

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
      {blogs.map((blog: BlogModel) => (
        <BlogCard blog={blog} key={blog._id} loggedInuserId={userId} />
      ))}
    </Container>
  );
};

export default LoggedInContent;
