import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    
})


const Posts = mongoose.model('Post', postSchema)

export default Posts