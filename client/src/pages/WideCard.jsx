import React from 'react'
import { Link ,useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import axios from "axios";

const WideCard = ({ blog }) => {
    const { username } = useParams();
    const [cookies] = useCookies(["XYZ", "username"]);
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
    const handleDeleteBlog = async (blogId) => {
        try {
            await axios.delete(`https://backend2-21yc.onrender.com/blog/delete/${blogId}`);
            // window.document.reload();
        } catch (error) {
            // console.error("Error deleting blog:", error);
        }
    };
    return (
        <>  <div className="blog-content" key={blog._id}>
            <div className="blog-image">
                <img src={blog.coverImage} alt={blog.title} />
            </div>
            <div className="blog-content-inner">
                <h6 className="Date">{getDate(blog.Date)}</h6>
                <h6 className="Author">Penned by {blog.author}</h6>
                <h4>{blog.title}</h4>
                <p>{blog.desc}</p>
                <Link to={`/page/${blog._id}`} className="blog-link">
                    Continue Reading...
                </Link>
                <div className="delete-button">
                    {cookies.XYZ && cookies.username === username &&
                        (<>
                            <button onClick={() => handleDeleteBlog(blog._id)}>
                                <FontAwesomeIcon icon={faTrash} size="lg" />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faEdit} size="lg" />
                            </button>
                        </>)
                    }
                </div>
            </div>
        </div></>
    )
}

export default WideCard