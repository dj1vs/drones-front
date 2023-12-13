import axios from "axios";

export const setFlightRegions = async(flight_id = 0, region_names: string[], userToken='') : Promise<string> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.put(
        '/api/flight/set_regions',
        {
            flightID: flight_id,
            regions: region_names
        },
        config
    )
    .then((response) => response.data)
}