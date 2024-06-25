import blog from "../Models/blogmodel.js";
export default async function updateViewController(req,res){
   try{
    const {blogid}=req.params;
    const viewobj = await blog.findByIdAndUpdate(blogid, { $inc: { views: 1 } }, { new: true });
    res.status(201).json({ viewobj });
   }
   catch(error){
       res.status(400).json({message:"error updating views"})
   }
}