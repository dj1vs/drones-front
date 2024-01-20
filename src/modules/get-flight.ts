import {Flight} from './ds'
import axios from 'axios';

export interface getFlightResp {
    flight: Flight,
    regions: string[]
}

export const getFlight = async  (id = 1): Promise<getFlightResp> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return axios.get(
        '/api/flight?flight_id=' + String(id),
        config)
        .then((response) => response.data);
}
