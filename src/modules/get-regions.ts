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
        .then((response) => response.data);
}