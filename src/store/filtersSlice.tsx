import { createSlice } from "@reduxjs/toolkit";

const regionStatus = localStorage.getItem('regionStatus')
    ? localStorage.getItem('regionStatus')
    : '';

const regionName = localStorage.getItem('regionName')
    ? localStorage.getItem('regionName')
    : '';
const flightStatus = localStorage.getItem('flightStatus')
    ? localStorage.getItem('flightStatus')
    : '';

const initialState = {
    regionStatus,
    regionName,
    flightStatus,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRegionStatus(state, {payload}) {
            state.regionStatus = payload
            localStorage.setItem('regionStatus', payload)
        },
        setRegionName(state, {payload}) {
            console.log('setRegionName got regionName: ' + payload)
            state.regionName = payload
            localStorage.setItem('regionName', payload)
        },
        setFlightStatus(state, {payload}) {
            state.flightStatus = payload
            localStorage.setItem('flightStatus', payload)
        }
    }
})

export default filtersSlice
