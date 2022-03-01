import axios from 'axios'
import express from 'express'

const router = express.Router()

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body
    const allItems = orderData.cart.items.map((item: any) => {
      return {
        quantity: item.quantity,
        price: {
          amount: (item.product.price / 100).toFixed(2),
          currency: item.product.currency,
        },
        name: item.product.name,
        category: item.product.category,
        sku: item.product.sku,
      }
    })

    const orderFormatted = {
      totalAmount: {
        amount: (orderData.cart.total / 100).toFixed(2),
        currency: orderData.cart.items[0].product.currency,
      },
      consumer: {
        givenNames: orderData.userData.firstName,
        surname: orderData.userData.lastName,
        email: orderData.userData.email,
      },
      shipping: {
        countryCode: orderData.userData.countryCode,
        name: `${orderData.userData.firstName} ${orderData.userData.lastName}`,
        postcode: orderData.userData.postcode,
        line1: orderData.userData.address,
      },
      items: allItems,
      merchant: {
        redirectCancelUrl: 'https://portal.staging.scalapay.com/failure-url',
        redirectConfirmUrl: 'https://portal.staging.scalapay.com/success-url',
      },
    }

    const response = await axios
      .post('https://staging.api.scalapay.com/v2/orders', orderFormatted, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer qhtfs87hjnc12kkos',
        },
      })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.error(error)
        return error
      })
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

export default router
