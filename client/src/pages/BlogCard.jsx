import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/page/${blog._id}`} className='blog-link'>
      <div className='blog-card'>
        <div className="blog-card-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
        <div className='blog-details'>
          <div className="blog-title-tag">
            <p className='blog-tag'>{blog.tag}</p>
            <p className='blog-title'>{blog.title}</p>
          </div>
          <div className='blog-actions'>
            <div className='action'>
              <FontAwesomeIcon icon={faEye} className="faEye" />
              <span>{blog.views}</span>
            </div>
            <div className='action'>
              <FontAwesomeIcon icon={faHeart} className="faHeart" />
              <span>{blog.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
