

import Stripe from 'stripe';

const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY);

export { stripeAPI }

