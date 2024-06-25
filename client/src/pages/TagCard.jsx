import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/TagCard.css';

const TagCard = ({ blog }) => {
  return (
    <Link to={`/page/${blog._id}`} className='tag-link'>
      <div className='tag-card'>
        <div className="tag-card-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
        <div className='tag-details'>
          <div className="tag-title-tag">
            <p className='tag-tag'>{blog.tag}</p>
            <p className='tag-title'>{blog.title}</p>
          </div>
          <div className='tag-actions'>
            <div className='action'>
              <FontAwesomeIcon icon={faEye} className="faEye" size='lg' />
              <span>{blog.views}</span>
            </div>
            <div className='action'>
              <FontAwesomeIcon icon={faHeart} className="faHeart" size='lg' />
              <span>{blog.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
