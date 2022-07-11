import Stripe from 'stripe'
import { getSession } from '@auth0/nextjs-auth0'

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

export default async function handler(req, res) {
    const session = getSession(req, res)
    const user = session?.user
    if(user){
        const stripeId = user['http://localhost:3000/stripe_customer_id']
        if (req.method === "POST") {
            try {
                // CREATE CHECKOUT SESSION 
                const session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    customer: stripeId,
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['AR', 'AU', 'AT', 'BE', 'BO', 'BR', 'BG', 'CA', 'CL', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DO', 'EG', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IS', 'IN', 'ID', 'IE', 'IL', 'IT', 'JP', 'LV', 'LI', 'LT', 'LU', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PY', 'PE', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH', 'TH', 'TT', 'AE', 'GB', 'US', 'UY']
                    },
                    allow_promotion_codes: true,
                    shipping_options: [
                        { shipping_rate: 'shr_1LK50NL8pWws0dPrY4wPUK1u' },
                        { shipping_rate: 'shr_1LK5F4L8pWws0dPrxaxVy4Hx' }
                    ],
                    line_items: req.body.map(item => {
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.title,
                                    images: [item.image.data.attributes.formats.thumbnail.url]
                                },
                                unit_amount: item.price * 100
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 0,
                            },
                            quantity: item.quantity
                        }
                    }),
                    // BRING CUSTOMER TO SUCCESS OR FAIL URL 
                    success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled`
    
                })
                res.status(200).json(session)
            } catch (error) {
                res.status(error.statusCode || 500).json(error.message)
            }
        }

    } else{
        if (req.method === "POST") {
            try {
                // CREATE CHECKOUT SESSION 
                const session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    // customer: stripeId,
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['AR', 'AU', 'AT', 'BE', 'BO', 'BR', 'BG', 'CA', 'CL', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DO', 'EG', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IS', 'IN', 'ID', 'IE', 'IL', 'IT', 'JP', 'LV', 'LI', 'LT', 'LU', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PY', 'PE', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH', 'TH', 'TT', 'AE', 'GB', 'US', 'UY']
                    },
                    allow_promotion_codes: true,
                    shipping_options: [
                        { shipping_rate: 'shr_1LK50NL8pWws0dPrY4wPUK1u' },
                        { shipping_rate: 'shr_1LK5F4L8pWws0dPrxaxVy4Hx' }
                    ],
                    line_items: req.body.map(item => {
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.title,
                                    images: [item.image.data.attributes.formats.thumbnail.url]
                                },
                                unit_amount: item.price * 100
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 0,
                            },
                            quantity: item.quantity
                        }
                    }),
                    // BRING CUSTOMER TO SUCCESS OR FAIL URL 
                    success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled`
    
                })
                res.status(200).json(session)
            } catch (error) {
                res.status(error.statusCode || 500).json(error.message)
            }
        }
    }


  
}