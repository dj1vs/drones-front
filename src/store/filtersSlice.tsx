import { createSlice } from "@reduxjs/toolkit";

const regionStatus = localStorage.getItem('regionStatus')
    ? localStorage.getItem('regionStatus')
    : '';

const regionName = localStorage.getItem('regionName')
    ? localStorage.getItem('regionName')
    : '';

const regionDistrict = localStorage.getItem('regionDistrict')
    ? localStorage.getItem('regionDistrict')
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

const flightCreator = localStorage.getItem('flightCreator')
    ? localStorage.getItem('flightCreator')
    : '';



const initialState = {
    regionStatus,
    regionName,
    regionDistrict,
    flightStatus,
    startDate,
    endDate,
    flightCreator
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
            state.regionName = payload
            localStorage.setItem('regionName', payload)
        },
        setRegionDistrict(state, {payload}) {
            state.regionDistrict = payload
            localStorage.setItem('regionDistrict', payload)
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
        },
        setFlightCreator(state, {payload}) {
            state.flightCreator = payload
            localStorage.setItem('flightCreator', payload)
        }
    }
})

export default filtersSlice
