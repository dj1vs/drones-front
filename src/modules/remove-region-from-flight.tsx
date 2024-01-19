import axios, { AxiosResponse } from 'axios';

export const removeRegionFromFlight = async(userToken: string, region_id : number, flight_id: number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.delete(
    '/api/flight_to_region/delete?region_id=' + region_id + '&flight_id=' + flight_id,
    config

  )
  .then((response) => response);
}
