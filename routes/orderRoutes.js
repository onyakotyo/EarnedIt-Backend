import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {addOrder, getMyOrders, getOrders, payoutOrder  } from '../controllers/orderController.js'


router.route('/:id/payout').put(protect, admin, payoutOrder )

router.route('/').get(protect, admin, getOrders)

router.route('/order').post(protect, addOrder)

router.route('/myorders').get(protect, getMyOrders)







export default router