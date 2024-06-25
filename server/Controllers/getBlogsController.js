import blog from "../Models/blogmodel.js";

export default async function getBlogsController(req, res) {
    try {
        const { author } = req.params;
        const blogs = await blog.find({ author })
        if(blogs.length>0){
            res.status(201).json({ message: "Blogs found",blogContent:blogs});
        }
        else{
            res.status(404).json({message:"Not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
