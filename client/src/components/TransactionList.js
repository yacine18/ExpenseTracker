import React, { useContext, useEffect } from 'react'
import Transaction from './Transaction'
import { GlobalContext } from '../context/GlobalState'

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <>
            <h3>Transactions History</h3>
            { transactions.length > 0 ? (
                <ul className="list">
                    {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}

                </ul>
            ):(
                <h6>No items found</h6>
            )}


        </>
    )

}

export default TransactionList
