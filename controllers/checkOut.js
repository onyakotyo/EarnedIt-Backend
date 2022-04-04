//import stripeKey from './stripe'
import asyncHandler from 'express-async-handler'
import { stripeAPI } from './stripe.js'

export const createCheckoutSesssion = asyncHandler(async(req, res) => {
    const domainUrl = process.env.WEB_APP_URL

    const { line_items, customer_email } = req.body

    console.log('LINE BACKEND',line_items)

    if(!line_items || !customer_email) {
        return res.status(400).json({error: 'Missing required session parameters'})
    }

    const session = await stripeAPI.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        customer_email,
        success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainUrl}/cancelled`,
        shipping_address_collection: { allowed_countries: ['GB', 'US','ZW', 'UA']}




    })

    console.log('SESSION',session.success_url)

    res.status(200).json({ sessionId: session.id })



})

//export { createCheckoutSesssion }

