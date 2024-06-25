import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/AllBlogs.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [done, setdone] = useState(true);
  const [loading, setLoading] = useState(true);

  const BlogCardSkeleton = () => (
    <div className="blog-card-skeleton">
      <div className="skeleton-image">
        <Skeleton width={270} height={180} />
      </div>
      <div className="skeleton-details">
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={100} height={20} />
      </div>
    </div>
  );

  const getBlogs = async () => {
    try {
      const response = await axios.get("https://backend2-21yc.onrender.com/blog/getall");
      setBlogs(response.data.Blogs);
      setLoading(false);
    } catch (err) {
      setdone(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      {done ? (
        loading ? (
          <div className="all-blogs">
            {[...Array(10)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="all-blogs">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )
      ) : (
        <div>Blogs not Found</div>
      )}
    </div>
  );
};

export default AllBlogs;
