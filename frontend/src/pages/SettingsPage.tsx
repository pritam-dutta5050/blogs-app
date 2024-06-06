import { useSelector } from 'react-redux'
import { BlogInterface } from '../interfaces/BlogInterface'
import { SignupInterface } from '../interfaces/SignupInterface'
import { RootState } from '../redux-store'

const SettingsPage = () => {
    const user = useSelector((state:RootState) => state.user);
    const bloglist = useSelector((state:RootState) => state.bloglist);
    console.log("Settings rendered with user");
    console.log(user);
    console.log(bloglist);
    const demoUser:SignupInterface = {
        firstName: "Demo",
        lastName: "User",
        username: "demouser",
        password: "123456",
    }
    const demoBlog:BlogInterface = {
        blogTitle: "Final run",
        blogContent: "demo c."
    }
  return (
    <div>
        
        {/* <button onClick={async()=>{
            console.log("Get user clicked");
            store.dispatch(fetchUser());
        }}>Get User</button>
        <button onClick={()=>{
            store.dispatch(signupUser(demoUser));
        }}>Signup User</button>
        <button onClick={()=>{
            store.dispatch(loginUser(demoUser))
        }}>Login User</button>
        <button onClick={()=>{
            store.dispatch(logoutUser())
        }}>Logout User</button>

<button onClick={async()=>{
            console.log("Get Blogs clicked");
            store.dispatch(fetchBlogs());
        }}>Get Blogs</button>
        <button onClick={()=>{
            store.dispatch(addBlog(demoBlog));
        }}>Add blog</button>
        <button onClick={()=>{
            store.dispatch(updateBlog({blog: demoBlog, blogId: "6660b045d832e2cd6d91d8a8"}))
        }}>Update Blog</button>
        <button onClick={()=>{
            store.dispatch(deleteblog("6660b1f3d832e2cd6d91d8e6"))
        }}>Delete blog</button>
        <button onClick={()=>{
            store.dispatch(hideBlog("664b4ded3b15bd02c258ec2c"))
        }}>Hide blog</button> */}
    </div>
  )
}

export default SettingsPage