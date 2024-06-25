import blog from '../Models/blogmodel.js';

export default async function deleteBlogController(req, res) {
    try {
        const { id } = req.params;
        const deletedBlog = await blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
