import axios, { AxiosResponse } from 'axios';

export const removeRegionFromFlight = async(userToken: string, region_id : number, flight_id: number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/flight_to_region/delete/',
    {
        FlightID: flight_id,
        RegionID: region_id
    },
    config

  )
  .then((response) => response);
}
