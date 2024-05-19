import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BlogModel } from "../../models/BlogModel";
import * as BlogsApi from "../../network/blogs_api";
import AddEditBlogModal from "../modals/AddEditBlogModal";
import BlogCard from "./BlogCard";

interface loggedInContentProps {
  userId: string;
}

const LoggedInContent = ({ userId }: loggedInContentProps) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNoteLoadingError, setShowNoteLoadingError] = useState(false);
  const [showAddEditBlogModal, setShowAddEditBlogModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogModel | null>(null);

  console.log("LoggedInComponent rendered");
  console.log(blogs);

  async function loadNotes() {
    try {
      setNotesLoading(true);
      const blogsBuffer = await BlogsApi.fetchBlogs();
      setBlogs(blogsBuffer);
      // console.log("I not rendered yet");
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

  async function deleteBlog(blogId: string) {
    try {
      await BlogsApi.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  // async function onSubmitClickHandler(blogBody: BlogInterface) {
  //   try {
  //     let responseBlog: BlogModel;
  //     if (!blogToEdit) {
  //       responseBlog = await BlogsApi.addBlog(blogBody);
  //       setBlogs([responseBlog, ...blogs]);
  //       setShowAddEditBlogModal(false);
  //     } else {
  //       responseBlog = await BlogsApi.updateBlog(blogBody, blogToEdit._id);
  //       setBlogs(
  //         blogs.map((existingBlog) =>
  //           existingBlog._id === responseBlog._id ? responseBlog : existingBlog
  //         )
  //       );
  //       setBlogToEdit(null);
  //     }
  //   } catch (error) {
  //     alert(error);
  //     console.error(error);
  //   }
  // }

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

      {blogToEdit && (
        <AddEditBlogModal
          onDismiss={() => setBlogToEdit(null)}
          blogToEdit={blogToEdit}
          onBlogSaved={(updatedBlog: BlogModel) => {
            setBlogs(
              blogs.map((existingBlog) =>
                existingBlog._id === updatedBlog._id
                  ? updatedBlog
                  : existingBlog
              )
            );
            setBlogToEdit(null);
          }}
        />
      )}

      {showAddEditBlogModal && (
        <AddEditBlogModal
          onDismiss={() => setShowAddEditBlogModal(false)}
          onBlogSaved={(blog) => {
            setBlogs([blog, ...blogs]);
            setShowAddEditBlogModal(false);
          }}
        />
      )}

      {blogs.map((blog: BlogModel) => (
        <BlogCard
          blog={blog}
          key={blog._id}
          loggedInuserId={userId}
          onDeleteButtonClicked={() => deleteBlog(blog._id ? blog._id : "")}
          onEditButtonClicked={() => {
            setBlogToEdit(blog);
          }}
        />
      ))}
    </Container>
  );
};

export default LoggedInContent;
