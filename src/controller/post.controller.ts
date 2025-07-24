
import { Request, Response } from "express";
import Posts from '../models/post.model';
import { verifyToken } from "../services/genToken";

export const showPosts = async (req: Request, res: Response) =>{
    try {
        const posts = await Posts.find() //.sort({createdAt: 1})
        res.json(posts)
    } catch (error) {
        res.json({message: "Error Fetching data"})
        console.log(error)
    }
}

export const readPost =  async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Posts.findById(postId)
        if (!post){
            res.status(400).json({message: 'Error getting a post ! '})
            return;
        }

        res.json(post)

    } catch (error) {
        res.json('Error reading a post !')
        console.log(error)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const token = res.header('authorization');
        
        if (!token || typeof(token) !='string'){
            res.json({message: 'No Token Provided !!'}).status(403);
            return;
        }
        let payload = verifyToken(token);
        const username = payload.userName;

        let newPost = new Posts({
            author: username,
            title: req.body.title,
            content: req.body.content
        })
        await newPost.save()
        res.json(newPost)

    } catch (error) {
        throw new Error("Error "+ (error as Error).message)
    }
}



export const editPost = async (req: Request, res: Response) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.json(post)
    } catch (error) {
        res.json({message: "Error getting the post Id"})
    }
}

export const deletePost = async (req: Request, res: Response) => {
    await Posts.findByIdAndDelete(req.params.id);
    res.status(204).json()
}