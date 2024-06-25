import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Skeleton from "react-loading-skeleton";
import { Link,useNavigate,useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Recipes.css";
import WideCard from "./WideCard";

const UserProfile = () => {
    const [Cookies, setCookies, removeCookies] = useCookies(["XYZ", "username"]);
    const [blogs, setBlogs] = useState([]);
    const [published, setpublished] = useState(true);
    const [user, setexistinguser] = useState(true);
    const [loading, setLoading] = useState(true);
    const [userdata, setUserData] = useState({});
    const nav=useNavigate();

    const Logout = () => {
        removeCookies(["XYZ"]);
        removeCookies(["username"]);
        setCookies('log','10');
        nav('/')
        
    };

    const { username } = useParams();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(
                `https://backend2-21yc.onrender.com/blog/getblogs/${username}`
            );
            const blogsData = response.data.blogContent;
            if (blogsData) {
                setBlogs(blogsData);
                setLoading(false);
            }
        } catch (error) {
            setpublished(false);
            }
    };
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`https://backend2-21yc.onrender.com/blog/user/${username}`);
            setUserData(response.data.user[0])
        } catch (error) {
            setexistinguser(false);
        }
    };


   

    useEffect(() => {
        fetchUserDetails();
        fetchBlogs();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className="outer-blog">
            {published ? (<div className="inner-blog">
                <div className="user-blogs-heading">
                    <h2>Blogs by {username}</h2>
                </div>
                {loading ? (
                    <SkeletonBlogs />
                ) : (
                    blogs.map((blog) => (
                       <div className="user-blogs">
                        <WideCard blog={blog}/>
                       </div>
                    ))
                )}
            </div>) : (
                <div className="message">No blogs Found</div>
            )}
            {user ? (<div className="profile-info">
                <div className="user-details">
                    <div className="user-pic">
                        <img
                            src={userdata.userPic}
                            alt="User Profile"
                        />
                    </div>
                    <div className="user-info">
                        <div className="editable-info">
                            <div className="user-email-username">
                                <div className="outer-span">
                                    <span className="heading">Username</span><span className="text"> : {userdata.username}</span>
                                </div>
                               {Cookies.XYZ && Cookies.username===username &&( <div className="outer-span">
                                    <span className="heading">Email</span><span className="text">:  {userdata.email}</span>
                                </div>)
}
                            </div>
                            <div className="user-about">
                                <p>
                                  {userdata.userAbout}
                                </p>
                            </div>

                            <div className="user-views-likes-published">
                                <div className="outer-span">
                                    <span className="heading">
                                        Blogs Published</span><span className="text">: {blogs.length}</span>
                                </div>
                                <div className="outer-span">
                                    <span className="heading">
                                        Total Views</span><span className="text">: {blogs.reduce((totalViews, blog) => totalViews + blog.views, 0)}</span>
                                </div>

                                <div className="outer-span">
                                    <span className="heading">
                                        Total Likes</span><span className="text">: {blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)}</span>
                                </div>
                            </div>
                        </div>
                        {Cookies.XYZ && Cookies.username === username && (
                            <div className="buttons">
                                <Link to='/editprofile'><button className="edit-profile">Edit Profile</button></Link>
                                <Link to='/blog'><button className="edit-profile">Add Recipe</button></Link>
                                <button className="logout" onClick={Logout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>) :
                (<div className="message">User not found</div>)}
        </div>
    );
};

const SkeletonBlogs = () => (
    <>
        {[...Array(10)].map((_, index) => (
            <div className="blog-content" key={index}>
                <div className="blog-image">
                    <Skeleton height={150} />
                </div>
                <div className="blog-content-inner">
                    <Skeleton height={20} width={100} />
                    <Skeleton height={20} width={50} />
                    <Skeleton height={30} width={200} />
                    <Skeleton height={80} width={200} />
                    <Skeleton height={20} width={50} />
                </div>
            </div>
        ))}
    </>
);

export default UserProfile;
