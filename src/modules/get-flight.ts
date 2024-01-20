import {Flight} from './ds'
import axios from 'axios';

export interface getFlightResp {
    Flight: Flight,
    Regions: string[]
}

export const getFlight = async  (userToken: string, id = 1): Promise<getFlightResp> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
    }

    return axios.get(
        '/api/flight?flight_id=' + String(id),
        config)
        .then((response) => response.data);
}
