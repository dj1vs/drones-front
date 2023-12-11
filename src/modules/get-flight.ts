import {Flight} from './ds'

export const getFlight = async  (id = 1): Promise<Flight> => {
    return fetch('/api/flight?flight_id=' + String(id),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}
