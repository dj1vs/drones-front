import { Region } from "./ds"

import axios from "axios"

export const getFlightRegions = async(flight_id = 0, userToken = ''): Promise<Region[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        '/api/flight_regions/' +  String(flight_id),
        config)
        .then((response) => {
            const {data} = response

            return data;
        })
}