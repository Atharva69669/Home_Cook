import blog from "../Models/blogmodel.js";
// Controller function to get n blogs
export default async function homePageController (req, res) {
  const { n } = req.params; // Assuming you're passing the number of blogs as a parameter

  try {
    const blogs = await blog.find({tag:"Traditional"}).limit(parseInt(n)); // Fetch 'n'
    res.status(201).json(blogs); // Send the fetched blogs as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle 
  }
};

  