import { createSlice } from "@reduxjs/toolkit"

const regions = localStorage.getItem('regions')
    ? localStorage.getItem('regions')?.split(',')
    : [];

const initialState = {
    regions,
    booked: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addRegion(state, {payload}) {
            if (state.regions == null) {
                state.regions = []
            }

            if (state.regions.indexOf(payload.toString()) === -1) {
                state.regions.push(payload.toString())
                localStorage.setItem('regions', state.regions.toString())
            }
            state.booked = true
            
        },
        removeRegion(state, {payload}) {
            if (state.regions == null) {
                state.regions = []
            }

            if (state.regions.length == 0) {
                return
            }
            
            const regionIndex = state.regions.indexOf(payload.toString())
            if (regionIndex > -1) {
                state.regions.splice(regionIndex, 1)
                localStorage.setItem('regions', state.regions.toString())
            }
        },
        disableBooked(state) {
            state.booked = false
        }
    }
})

export default cartSlice