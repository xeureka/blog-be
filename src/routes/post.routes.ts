import { showPosts,readPost,createPost,editPost,deletePost } from "../controller/post.controller";
import express from 'express'
import { createPostSchema } from "../schemas/post.schema";
import { validateInput } from "../middleware/inputValidate";
import { loggedInAuth } from "../middleware/auth";


const router = express.Router()

router.get('/',showPosts)
router.get('/:id', readPost)
router.post('/upload',loggedInAuth,validateInput(createPostSchema), createPost)
router.put('/:id',loggedInAuth, editPost)
router.delete('/:id',loggedInAuth, deletePost)

export default router;