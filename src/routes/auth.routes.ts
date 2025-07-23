import express from 'express'
import { tokenRefresher } from '../controller/auth.controller'

const router = express.Router()

router.post('/refresh-token', tokenRefresher)

export default router