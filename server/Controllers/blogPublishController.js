import blog from "../Models/blogmodel.js";
import userModel from "../Models/userModel.js";

export async function blogPublishController(req, res) {
    try {
        const { title, body, author,textContent,desc,coverImage,tag} = req.body;
        const user = await userModel.findOne({ username: author });
        if (user) {
            const authorId = user._id;
            const createdBlog = await blog.create({ authorId, title, body, author,textContent,desc,coverImage,tag});
            res.status(201).json({ message: "Blog Published", blog: createdBlog });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
