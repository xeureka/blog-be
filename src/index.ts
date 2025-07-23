import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectdb } from './utils/db.connect'
import userRoute from './routes/users.routes'
import postRoute from './routes/post.routes'
import authRoute from './routes/auth.routes'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute)

connectdb()
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})

export default app