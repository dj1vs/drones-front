import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    regions: ['']
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addRegion(state, {payload}) {
            if (state.regions == null) {
                state.regions = []
            }
            state.regions.push(payload)
            localStorage.setItem('regions', state.regions.toString())
        }
    }
})

export default cartSlice 