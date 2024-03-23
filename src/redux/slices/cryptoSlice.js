import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('/crypto', async () => {

    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates')

    console.log('respnse in thunk ', response);

    return await response.json();

})

const cryptoSlice = createSlice({
    name: 'cryptoSlice',
    initialState: {
        cryptoData: [],
        status: 'idle',
        error: null
    },
    reducers: {
        loadData: (state, action) => {
            state.cryptoData = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchData.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchData.fulfilled, (state, action) => {
            state.cryptoData = action.payload
            state.status = 'success'
        }).addCase(fetchData.rejected, (state, action) => {
            state.error = action.error.message
        })
    }

})

export default cryptoSlice.reducer

export const { loadData } = cryptoSlice.actions