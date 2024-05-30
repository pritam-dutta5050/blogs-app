import { useContext, useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BlogInterface } from "../../interfaces/BlogInterface";
import { BlogModel } from "../../models/BlogModel";
import * as BlogsApi from "../../network/blogs_api";
import { BlogListContext } from "../../store/blog-list-store";
import AddEditBlogModal from "../modals/AddEditBlogModal";
import BlogCard from "./BlogCard";
import styles from "./LoggedInContent.module.css";

const LoggedInContent = () => {
  // const [notesLoading, setNotesLoading] = useState(false);
  // const [showNoteLoadingError, setShowNoteLoadingError] = useState(false);
  const [showAddEditBlogModal, setShowAddEditBlogModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogModel | null>(null);

  console.log("LoggedInComponent rendered");
  // console.log(blogs);
  
  const {blogList, loadBlogs, addBlog, editBlog} = useContext(BlogListContext);

  console.log(blogList);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function onSubmitClickHandler(blogBody: BlogInterface) {
    try {
      let responseBlog: BlogModel;
      if (!blogToEdit) {
        try {
          responseBlog = await BlogsApi.addBlog(blogBody);
          addBlog(responseBlog);
        } catch (error) {
          console.error(error);
        }
        setShowAddEditBlogModal(false);
      } else {
        try {
          responseBlog = await BlogsApi.updateBlog(blogBody, blogToEdit._id);
          editBlog(responseBlog, blogToEdit._id);
          
        } catch (error) {
          console.error(error);
        }
        setBlogToEdit(null);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Container className={styles.mainContainer}>
      {!blogList && <Spinner animation="border" variant="primary" />}
      {/* {showNoteLoadingError && <p>Something went wrong</p>} */}
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
          onSubmitButtonPressed={onSubmitClickHandler}
        />
      )}

      {showAddEditBlogModal && (
        <AddEditBlogModal
          onDismiss={() => setShowAddEditBlogModal(false)}
          onSubmitButtonPressed={onSubmitClickHandler}
        />
      )}

      {blogList.map((blog: BlogModel) => (
        <BlogCard
          blog={blog}
          key={blog._id}
          onEditButtonClicked={() => {
            setBlogToEdit(blog);
          }}
        />
      ))}
    </Container>
  );
};

export default LoggedInContent;
