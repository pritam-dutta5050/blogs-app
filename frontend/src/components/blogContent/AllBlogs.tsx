import React, { useContext } from 'react'
import { BlogListContext } from '../../store/blog-list-store';
import { BlogModel } from '../../models/BlogModel';
import BlogCard from './BlogCard';
interface AllBlogsProps{
    setBlogToEdit: (blog:BlogModel) => void;
}
const AllBlogs = ({setBlogToEdit}:AllBlogsProps) => {
    const { blogList } = useContext(BlogListContext);
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