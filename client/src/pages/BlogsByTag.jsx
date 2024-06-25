import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import '../styles/AllBlogs.css';
import { useParams } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"

const BlogsByTag = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [published, setPublished] = useState(true);
    const { category, tag } = useParams();

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
            
            const response = await axios.get(`https://backend2-21yc.onrender.com/blog/get/${category}/${tag}/n`);
            setBlogs(response.data.Blogs);
            setLoading(false);
        } catch (err) {
            setPublished(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="all-blogs">
            {[...Array(10)].map((_, index) => (
                <BlogCardSkeleton key={index} />
            ))}
        </div>;
    }

    return (
        <div>
            {published ? (
                <div className='all-blogs'>
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className='message'>No blogs found</div>
            )}
        </div>
    );
}

export default BlogsByTag;
