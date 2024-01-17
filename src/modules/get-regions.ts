import {Region, Flight} from './ds'
import axios from 'axios';

export interface GetRegionsResponse {
    regions: Region[],
    draft_flight: Flight,
}

export const getRegions = async (userToken = '', namePattern = '', status='', district='') : Promise<GetRegionsResponse> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
    }

    return axios.get(
        '/api/regions?name_pattern=' + String(namePattern) + '&status=' + String(status) + '&district=' + String(district),
        config
        )
        .then((response) => response.data)
        .catch(() => ([
            {
                "ID": 1,
                "District": "",
                "Name": "Район #1",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
            {
                "ID": 2,
                "District": "",
                "Name": "Район #2",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
            {
                "ID": 3,
                "District": "",
                "Name": "Район #3",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
        ]))
}