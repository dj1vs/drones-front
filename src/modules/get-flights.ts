import axios from 'axios'

import {Flight} from './ds'

export const getFlights = async (userToken = '', status = ''): Promise<Flight[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        `/api/flights?status=` + status,
        config,
    )
    .then((response) => response.data) 

}