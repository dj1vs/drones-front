import {Flight} from './ds'
import axios from 'axios';

export const getFlight = async  (id = 1): Promise<Flight> => {
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
