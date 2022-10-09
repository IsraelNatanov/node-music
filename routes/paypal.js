const express = require("express");
const paypal = require('@paypal/checkout-server-sdk')
const router = express.Router();
require("dotenv").config()
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const Environment =
    process.env.NODE_ENV === "production" ?
    paypal.core.LiveEnvironment :
    paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    )
)

app.post("/create-order", async(req, res) => {
    const request = new paypal.orders.OrdersCreateRequest()
    const total = "15"
    request.prefer("return=representation")
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: {
            amount: {
                currency_code: "USD",
                value: total,
                breakdown: [{
                    item_total: {
                        currency_code: "USD",
                        value: "1.00",
                    },
                }, ],
            },

        },

    })

    try {
        const order = await paypalClient.execute(request)
        res.json({ id: order.result.id })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = router;