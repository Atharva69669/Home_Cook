import blog from '../Models/blogmodel.js';

export default async function getAllBlogsVontroller(req,res){
    try{
       const blogs=await blog.find();
       res.status(201).json({"message":"Blogs found","Blogs":blogs});
       res.end();
    }
    catch(error){
       res.status(401).json({"message":"error fetching blogs"});
       res.end();
    }
}