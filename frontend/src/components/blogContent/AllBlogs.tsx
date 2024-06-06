import { useSelector } from 'react-redux';
import { BlogModel } from '../../models/BlogModel';
import { RootState } from '../../redux-store';
import BlogCard from './BlogCard';
interface AllBlogsProps{
    setBlogToEdit: (blog:BlogModel) => void;
}
const AllBlogs = ({setBlogToEdit}:AllBlogsProps) => {
  
    const blogList = useSelector((state:RootState)=> state.bloglist).BlogList;

    // console.log("All blogs rendered");
  return (
    <div>
    {blogList.map((blog: BlogModel) => (
        <BlogCard
          blog={blog}
          key={blog._id}
          onEditButtonClicked={() => {
            setBlogToEdit(blog);
          }}
        />
      ))}
      </div>
  )
}

export default AllBlogs