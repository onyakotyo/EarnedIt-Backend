import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
//const stripe = require("stripe")(sk_test_DIeLvFU6F4MVTluMPrwu9lDL00OEVoDGsO);
//import stripe  from 'stripe'; {process.env.STRIPE_SECRET_KEY};
import stripe  from 'stripe'; 'sk_test_DIeLvFU6F4MVTluMPrwu9lDL00OEVoDGsO';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = asyncHandler(async (req, res) => {
  const { 
    senderEmail,
    isPaid,
    orderAmount,
    shippingAmount,
    recipientAddress,
    totalAmount, 
    exchangeRate,
    sendCountry,
    collectionMethod
    
  } = req.body

  console.log('Controller',req.body)



  if (orderAmount && orderAmount.length === 0) {
    res.status(400)
    throw new Error('No transaction amount entered')
    return
  } else {
    const order = new Order({
   
      user: req.user._id,
      senderEmail,
      isPaid,
      orderAmount,
      shippingAmount,
      recipientAddress,
      totalAmount, 
      exchangeRate,
      sendCountry,
      collectionMethod
     
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)

    console.log(order)
}

})


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})



const payoutOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  console.log('ORDER', order)

  if (order) {
    order.isCollected = true
    order.collectedAt = Date.now()
    order.payoutResult = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      payoutSignature: req.body.payoutSignature,
      clientNameCheck: req.body.clientNameCheck,
      collectionNumber: req.body.collectionNumber,
      clientIdCheck: req.body.clientIdCheck,
    }

    const payoutOrder = await order.save()

    res.json(payoutOrder)
  } else {
    res.status(404)
    throw new Error('PayOut Order not found')
  }
})


export { addOrder, getMyOrders, getOrders, payoutOrder  }






