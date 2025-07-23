import { registerUser,loginUser, logoutUser } from "../controller/user.controller";
import { registerSchema,loginSchema } from "../schemas/user.schema";
import { validateInput } from "../middleware/inputValidate";

import express from 'express'

const router = express.Router()

router.post('/register',validateInput(registerSchema), registerUser)
router.post('/login',validateInput(loginSchema), loginUser)
router.get('/logout', logoutUser)

export default router