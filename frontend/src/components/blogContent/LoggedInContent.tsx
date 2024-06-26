import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BlogInterface } from "../../interfaces/BlogInterface";
import { BlogModel } from "../../models/BlogModel";
import store, { RootState } from "../../redux-store";
import { addBlog, editBlog, fetchBlogs } from "../../redux-store/blogListSlice";
import AddEditBlogModal from "../modals/AddEditBlogModal";
import AllBlogs from "./AllBlogs";
import styles from "./LoggedInContent.module.css";

const LoggedInContent = () => {
  const [showAddEditBlogModal, setShowAddEditBlogModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogModel | null>(null);

  console.log("LoggedInComponent rendered");

  const blogList = useSelector((state:RootState)=>state.bloglist.BlogList);

  console.log(blogList);

  useEffect(() => {
    store.dispatch(fetchBlogs());
  }, []);
  
  function onSubmitClickHandler(blogBody: BlogInterface) {
    if (!blogToEdit) {
      store.dispatch(addBlog(blogBody));
      setShowAddEditBlogModal(false);
    } else {
      store.dispatch(editBlog({blog:blogBody, blogId:blogToEdit._id}));
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
      {/* {isFetchingError && <center>Something went wrong, please refresh or try again</center>} */}
      {/* {isFetching ? <Spinner animation="border" variant="primary" /> : <AllBlogs setBlogToEdit={(blog) => setBlogToEdit(blog) }/>} */}
      <AllBlogs setBlogToEdit={(blog) => setBlogToEdit(blog) }/>
      
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
