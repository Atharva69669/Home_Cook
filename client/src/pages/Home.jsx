import React from "react";
import "../styles/Home.css";
import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageSrc from "./tag.png";
import TagCard from "./TagCard";
import WideCard from "./WideCard";
import { Link } from "react-router-dom";
import italian from "../pics/italian.jpeg";
import salads from "../pics/salads.jpg";
import greece from "../pics/greece.jpeg";
import drink from "../pics/drink.jpeg";
import dessert from "../pics/dessert.jpeg";
import japanese from "../pics/japanese.jpeg";
import snacks from "../pics/snacks.jpg";
import healthy from "../pics/healthy.jpg";
import Typewriter from "typewriter-effect/dist/core";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [wideblogs, setwideblogs] = useState([]);
  const [taggedBlogs]=useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const tags = ["Lunch", "Chinese", "Lunch"];
  const title = [
    "Explore Mouthwatering deserts",
    "Popular Indian snacks",
    "Delicious Healthy Salads",
  ];

  useEffect(() => {
    const typewriter = new Typewriter("#typewriter-text", {
      loop: true,
    });

    typewriter
      .typeString("Welcome to our culinary adventure!")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Discover mouthwatering dishes!")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Experience flavors from around the world!")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Indulge in delicious delights!")
      .pauseFor(1000)
      .start();

    return () => typewriter.stop();
  }, []);

  const fetchBlogs = async (n) => {
    try {
      const response = await axios.get(
        `https://backend2-21yc.onrender.com/blog/get/meals/Trending/${n}`
      );
      const blogsData = response.data.Blogs;
      if (blogsData) {
        setwideblogs(blogsData);
      }
    } catch (error) {
      // console.error("Error fetching blogs:", error);
    }
  };
  const getBlogs = async () => {
    try {
      const response = await axios.get("https://backend2-21yc.onrender.com/blog/getn/6");
      setBlogs(response.data);
    } catch (err) {
      // console.log(er);
    }
  };

  const getSpecificBlogs = async (n) => {
    try {
      const blogsPromises = tags.map((tag) =>
        axios.get(`https://backend2-21yc.onrender.com/blog/get/meals/${tag}/${n}`)
      );
      const blogsResponses = await Promise.all(blogsPromises);
      blogsResponses.forEach((response) => {
        taggedBlogs.push(response.data.Blogs);
      });
      console.log(taggedBlogs)
      setloading(false);
    } catch (error) {
      alert("Error fetching blogs");
    }
  };

  useEffect(() => {
    getBlogs();
    getSpecificBlogs(8);
    fetchBlogs(4);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <>
        <main>
          <div className="hero">
            <div
              className="hero-image"
              onClick={() => {
                navigate("/meals/Desserts");
              }}
            >
              <div className="image-content">
                <div className="image-content-inner">
                  <div className="heading">
                    <p>
                      Life's too short for counting calories. Experience pure
                      bliss in every heavenly slice!
                    </p>
                  </div>
                  <div className="image-content-desc">
                    Fall in love with our ultra-moist, fudgy chocolate cake!
                    Topped with rich buttercream and chips, it's a flavor
                    explosion. Switch it up to a sheet cake in a snap. Check out
                    the recipe note for more!
                  </div>
                </div>
              </div>
              <img src="https://www.southernliving.com/thmb/vcwXaFHsMVeJcNl-BsdGH3s_b-o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2552101_SaveR_020-a25f7cda378842deae37dbe085b460d8.jpg" alt="cake" />
            </div>
            <div className="hero-recipes">
              <div className="group-tag">
                <img src={imageSrc} alt="cakeImage" />
              </div>
              {blogs &&
                blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          </div>

          <div className="categories-container">
            <div id="typewriter-text"></div>
            <div className="categories-container-inner">
              <Link to="/cuisines/Indian" className="cat-link">
                <div className="category">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQazGCOlA_d9dV1l8nxin8UNJW-ATTBBNEYbdSERWXfkQ&s"
                    alt="Indian"
                  />
                  <span className="category-name">Indian</span>
                </div>
              </Link>
              <Link to="/cuisines/Italian" className="cat-link">
                <div className="category">
                  <img src={italian} alt="italian" />
                  <span className="category-name">Italian</span>
                </div>
              </Link>
              <Link to="meals/Salads" className="cat-link">
                <div className="category">
                  <img src={salads} alt="salads" />
                  <span className="category-name">Salads</span>
                </div>
              </Link>
              <Link to="/meals/Desserts" className="cat-link">
                <div className="category">
                  <img src={dessert} alt="desert" />
                  <span className="category-name">Desserts</span>
                </div>
              </Link>
              <Link to="/meals/Drinks" className="cat-link">
                <div className="category">
                  <img src={drink} alt="Drinks" />
                  <span className="category-name">Drinks</span>
                </div>
              </Link>
              <Link to="/cuisines/Japanese" className="cat-link">
                <div className="category">
                  <img src={japanese} alt="japanese" />
                  <span className="category-name">Japanese</span>
                </div>
              </Link>
              <Link to="/cuisines/Greek" className="cat-link">
                <div className="category">
                  <img src={greece} alt=" greece" />
                  <span className="category-name">Greek</span>
                </div>
              </Link>
              <Link to="/meals/Healthy" className="cat-link">
                <div className="category">
                  <img src={healthy} alt="healthy" />
                  <span className="category-name">Healthy</span>
                </div>
              </Link>
              <Link to="/meals/Snacks" className="cat-link">
                <div className="category">
                  <img src={snacks} alt="snacks" />
                  <span className="category-name">Snacks</span>
                </div>
              </Link>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            taggedBlogs.map((tagblogs, index) => (
              <div className="specific-recipes-container" key={index}>
                <div className="specific-recipes">
                  <div className="specific-title">
                    <h2>{title[index]}</h2>
                  </div>
                  <div className="specific-recipe-box">
                    {tagblogs.map((item) => (
                      <TagCard
                        key={item._id} // Assuming _id is a unique identifier
                        blog={item} // Assuming each item is a blog object
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="mid-area">
            <div className="widecards">
              <div className="trending">
                <h2>Trending News</h2>
              </div>
              {wideblogs.map((blog) => (
                <WideCard blog={blog} />
              ))}
            </div>
            <div className="sidebar">
              <section className="popular">
                <h1>Popular Recipes</h1>
                <ul>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                  <li>
                    <Link className="popular-link">
                      <article>
                        <img src="https://i.ibb.co/sgjsbjY/11.jpg" alt="Food" />
                        <div className="description">
                          <div className="tag-2">Recipe</div>
                          <h2>Steak and Fries.</h2>
                          <div className="stars">
                            <span className="fas fa-star"></span> 4.4
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default Home;
