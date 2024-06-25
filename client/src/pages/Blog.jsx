import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "../styles/Blog.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Blog = () => {
  const quillRef = useRef(null);
  const nav=useNavigate();
  const [cookies] = useCookies(["username","XYZ"]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");

  const options = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Healthy",
    "Appetizers",
    "Snacks",
    "Salads",
    "Side Dishes",
    "Soups",
    "Bread",
    "Drinks",
    "Desserts",
    "Mexican",
    "Italian",
    "Chinese",
    "Trending",
    "Indian",
    "German",
    "Greek",
    "Filipino",
    "Japanese",
    "Chicken",
    "Rice",
    "Cheese",
    "Bread",
    "Seafood",
    "Pasta",
    "Fruits",
    "Traditional",
    "Vegetables",
    "Diwali",
    "Holi",
    "Christmas",
    "New Year",
    "Onam",
    "Makar Sankranti",
    "Ganesh Chathurti"
  ];
  


  const handleTagChange = (e) => {
    setTag(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const toolbarOptions = [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ color: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleChange = (html) => {
    setValue(html);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setCoverImage(base64);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const getEditorTextContents = () => {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getText();
      return delta;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://backend2-21yc.onrender.com/blog/publish", {
        author: cookies.username,
        title: title,
        body: value,
        textContent: getEditorTextContents(),
        desc: desc,
        tag:tag,
        coverImage:coverImage,
      });
      console.log(response);
      setTitle("");
      setDesc("");
      setValue("");
      setCoverImage(null);
      toast.success('Blog published successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Error publishing blog!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if(!cookies.XYZ && !cookies.username){
      nav('/login')
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className="publish-blog">
      <div className="welcome-content">
        <p>
          Share your favorite recipes, cooking tips, and culinary adventures
          here
        </p>
      </div>
      <div className="set-title">
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          maxlength="100"
        />
      </div>

      <div className="set-desc">
        <label htmlFor="desc"></label>
        <textarea
          type="text"
          id="desc"
          value={desc}
          onChange={handleDescChange}
          placeholder="Describe your blog"
        />
      </div>

      <div className="set-coverImage">
        <label htmlFor="set-coverImage">
          <h5>Cover Image:</h5>
        </label>
        <input
          type="file"
          id="coverImage"
          accept=".jpg,.png,.jpeg"
          onChange={handleImageChange}
        />
      </div>
      <div className="set-tag">
        <label htmlFor="set-tag">
          <h5>Select a tag:</h5>
        </label>
        <select
          id="dropdown"
          value={tag}
          onChange={handleTagChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="texteditor">
        <ReactQuill
          className="quill"
          ref={quillRef}
          modules={modules}
          theme="snow"
          value={value}
          onChange={handleChange}
          placeholder="Write your blog content here..."
        />
      </div>

      <div className="submitblog">
        <button onClick={handleSubmit}>Publish</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Blog;
