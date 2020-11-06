const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true, 'Please Enter Some Text'],
        trim: true
    },
    amount:{
        type: Number,
        required: [true, 'Please Enter a Positive or Negative Number']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Transaction = mongoose.model('transactions', TransactionSchema)

module.exports = Transaction