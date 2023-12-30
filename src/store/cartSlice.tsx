import { createSlice } from "@reduxjs/toolkit"

const regions = localStorage.getItem('regions')
    ? localStorage.getItem('regions')?.split(',')
    : [];

const takeoffDate = localStorage.getItem('takeoffDate')
    ? localStorage.getItem('takeoffDate')
    : '';

const arrivalDate = localStorage.getItem('arrivalDate')
    ? localStorage.getItem('arrivalDate')
    : '';
const draftID = localStorage.getItem('draftID')
    ? localStorage.getItem('draftID')
    : '';
const initialState = {
    regions,
    takeoffDate,
    arrivalDate,
    draftID,
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
        setTakeoffDate(state, {payload}) {
            state.takeoffDate = payload
            localStorage.setItem('takeoffDate', payload)
        },
        setArrivalDate(state, {payload}) {
            state.arrivalDate = payload,
            localStorage.setItem('arrivalDate', payload)
        },
        setDraftID(state, {payload}) {
            state.draftID = payload,
            localStorage.setItem('draftID', payload)
        },
        disableBooked(state) {
            state.booked = false
        }
    }
})

export default cartSlice