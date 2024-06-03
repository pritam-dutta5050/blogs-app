import { useContext, useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BlogInterface } from "../../interfaces/BlogInterface";
import { BlogModel } from "../../models/BlogModel";
import { BlogListContext } from "../../store/blog-list-store";
import AddEditBlogModal from "../modals/AddEditBlogModal";
import AllBlogs from "./AllBlogs";
import styles from "./LoggedInContent.module.css";

const LoggedInContent = () => {
  const [showAddEditBlogModal, setShowAddEditBlogModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogModel | null>(null);

  console.log("LoggedInComponent rendered");

  const { blogList, loadBlogs, isFetching, isFetchingError, addBlog, editBlog } =
    useContext(BlogListContext);

  console.log(blogList);

  useEffect(() => {
    loadBlogs();
  }, []);
  
  function onSubmitClickHandler(blogBody: BlogInterface) {
    if (!blogToEdit) {
      addBlog(blogBody);
      setShowAddEditBlogModal(false);
    } else {
      editBlog(blogBody, blogToEdit._id);
      setBlogToEdit(null);
    }
  }

  return (
    <Container className={styles.mainContainer}>
      <center>
        <Button
          variant="primary"
          onClick={() => setShowAddEditBlogModal(true)}
          className="m-2 w-50"
        >
          Add Blog
        </Button>
      </center>
      {isFetchingError && <center>Something went wrong, please refresh or try again</center>}
      {isFetching ? <Spinner animation="border" variant="primary" /> : <AllBlogs setBlogToEdit={(blog) => setBlogToEdit(blog) }/>}
      
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
    </Container>
  );
};

export default LoggedInContent;
