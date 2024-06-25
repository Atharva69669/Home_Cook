import blog from "../Models/blogmodel.js";

export default async function getBlogsByTagController(req, res) {
  try {
    const { tag,n} = req.params;
    
    let blogs;

    if (n !== undefined) {
      blogs = await blog.find({ tag: tag }).limit(parseInt(n));
    } else {
      blogs = await blog.find({ tag: tag });
      console.log(blogs)
    }
    
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found with the specified tag" });
    }

    res.status(200).json({ message: "Blogs found", Blogs: blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
