import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCheckoutSesssion } from "../controllers/checkOut.js"


router.route('/stripe').post(protect, createCheckoutSesssion )



export default router