import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "../styles/Page.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie"



const Page = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [userdata, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [cookies]=useCookies(['XYZ','username'])
  const navigate=useNavigate();

  const getDate = (blogDate) => {
    const date = new Date(blogDate);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[date.getMonth()];
    const formattedDateTime = `${monthName} ${day}, ${year}`;
    return formattedDateTime;
  };


  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://backend2-21yc.onrender.com/blog/getblog/${blogId}`
      );
      setBlog(response.data.blog);
      await fetchUserDetails(response.data.blog.author);
    } catch (error) {
      // console.error("Error fetching blog:", error);
    }
  };

  const fetchUserDetails = async (author) => {
    try {
        const response = await axios.get(`https://backend2-21yc.onrender.com/blog/user/${author}`);
        setUserData(response.data.user[0])
        setLoading(false);
    } catch (error) {
      // console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBlog();
      await updateViews();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateViews = async () => {
    try {
      await axios.put(
        `https://backend2-21yc.onrender.com/blog/updateview/${blogId}`
      );
    } catch (error) {
      // console.error(error);
    }
  };
 
  const handleLike=async(author)=>{
    try {
      if(!cookies.username && !cookies.XYZ){
         navigate('/login');
      }
      await axios.put(
        'https://backend2-21yc.onrender.com/blog/addlike',{
          blogId:blogId,
          author:author
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="post-container">
      {loading ? (
        <div className="post-container-content">
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={150} />
          <Skeleton height={30} width={400} />
          <Skeleton height={80} width={400} />
          <Skeleton height={20} width={400} />
          <Skeleton height={80} width={600} />
          <Skeleton height={80} width={600} />
          <Skeleton height={80} width={600} />
          <Skeleton height={80} width={600} />
        </div>
      ) : (
        <div className="post-container-content">
          <div className="post-blog-title">
            <p align="left">{blog.title}</p>
          </div>
          <hr />
          <div className="post-blog-data">
            <div className="post-blog-author">
              <Link to={`/userprofile/${blog.author}`}>
                <img
                  src={userdata.userPic}
                  alt="Author"
                />
                {blog.author}
              </Link>
            </div>
            <div className="post-blog-date">
              2 min read . {getDate(blog.Date)}
            </div>
            <div className="post-actions">
            <div className="post-like" onClick={()=>{handleLike(blog.author)}}>
              <FontAwesomeIcon icon={faHeart} className="faHeart" />
              <span>{blog.likes}</span>
            </div>
            <div className="post-view">
              <FontAwesomeIcon icon={faEye} className="faEye" />
              <span>{blog.views}</span>
            </div>
            </div>
          </div>
          <hr />
          <div
            className="post-blog-body"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
