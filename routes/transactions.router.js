const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')


router.get('/', (req, res) => {
    Transaction.find((err, transactions) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    })
})
router.post('/', (req, res) => {
    const { text, amount } = req.body
    const createTransaction = new Transaction({
        text,
        amount,
        createdAt: Date.now()
    })

    createTransaction.save((err, transaction) => {

        if (!err) {
            return res.status(201).json({
                success: true,
                data: transaction
            })
        }

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }

    })
})
router.delete('/:id', (req, res) => {
    const transaction = Transaction.findById(req.params.id)

    if (!transaction) {
        return res.status(404).json({
            success: false,
            error: 'No Transaction Found!'
        })
    }

    transaction.deleteOne((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
        return res.status(200).json({
            success: true,
            data: {}
        })
    })


})


module.exports = router