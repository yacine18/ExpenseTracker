const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const db = require('./config/database')

app.use(express.json())
app.use(cors())


app.use( (req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

const transactionsRouter = require('./routes/transactions.router')
app.use('/api/transactions', transactionsRouter)

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server up and running on port ${port}`))

