import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'


//initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//create context
export const GlobalContext = createContext(initialState)

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //actions

    const getTransactions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/transactions')
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error

            })

        }
    }

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error

            })
        }

    }

    const addTransaction = async (transaction) => {
        try {
            const res = axios.post('http://localhost:5000/api/transactions', transaction, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: (await res).data.data
            })

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error

            })
        }

    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            deleteTransaction,
            getTransactions,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}