import blog from '../Models/blogmodel.js';

export default async function getBlogController(req, res) {
  try {
    const blogId = req.params.blogId;
    const response = await blog.findById(blogId); // Use await to wait for the asynchronous operation to complete
    res.status(200).json({ blog: response }); // Correct status code for successful response is 200
  } catch (error) {
    res.status(500).json({ message: "Error" }); // Internal Server Error status code is more appropriate for unexpected errors
  }
}
