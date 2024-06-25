import blog from "../Models/blogmodel.js";

export default async function addLikeController(req, res) {
    try {
        const { blogId, author } = req.body;
        const blogPost = await blog.findById(blogId);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        const authorIndex = blogPost.likedBy.indexOf(author);
        if (authorIndex === -1) {
            blogPost.likes += 1;
            blogPost.likedBy.push(author);
            await blogPost.save();
        }
        res.status(200).json(blogPost);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
