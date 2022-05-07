import { Request, Response } from "express";
import { Post, Comment } from "../models/post.model";

const PostsController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const limit: number = 25;
      const offset: any = req.query["page"];
  
      const result = await Post.find({}, "id title")
        .skip(offset*limit)
        .limit(limit)
  
      if(result)
        return res.status(200).json(result);
  
      return res.status(500).json({"error": "could not find any docs"});
    } catch (error){
      res.status(500).json({"message": "could not find any docs"});
    }
  },
  findOne: async (req: Request, res: Response) => {
    try {
      const result = await Post.findById(req.params.id);
  
      if(result)
        return res.status(200).json(result);
  
      return res.status(500).json({"error": "could not find the doc"});
    } catch (error){
      res.status(500).json({"message": "could not find the doc"});
    }
  },
  create: async (req: Request, res: Response) => {
    try{
      const newPost = new Post({
        "title": req.body.title,
        "body": req.body.body
      })
  
      const result = await newPost.save()
  
      if(result)
        return res.status(200).json(result);
      
      return res.status(500).json({"error": "could not save doc!"});
    }catch (error){
      res.status(500).json({"message": "could not save doc"});
    }
  },
  createComment: async (req: Request, res: Response) => {
    try {
      const comment = new Comment({body: req.body.body});
      const post = await Post.findById(req.params.id,"comments").exec();
  
      if(!post)
        res.status(500).json("could not add comment")
      
      post.comments.push(comment);
      
      const result = await post.save();
  
      if(result)
        return res.status(200).json(result)
      
      return res.status(500).json({"error": "could not create comment"})
    } catch(error) {
      res.status(500).json({"message": "could not create comment"});
    }
  }
}

export default PostsController;