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

const startDate = localStorage.getItem('startDate')
    ? localStorage.getItem('startDate')
    : '';

const endDate = localStorage.getItem('endDate')
    ? localStorage.getItem('endDate')
    : '';



const initialState = {
    regionStatus,
    regionName,
    flightStatus,
    startDate,
    endDate
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
        },
        setStartDate(state, {payload}) {
            state.startDate = payload
            localStorage.setItem('startDate', payload)
        },
        setEndDate(state, {payload}) {
            state.endDate = payload
            localStorage.setItem('endDate', payload)
        }
    }
})

export default filtersSlice
