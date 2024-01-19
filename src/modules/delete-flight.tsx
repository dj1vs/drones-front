import axios, { AxiosResponse } from 'axios';

export const deleteFlight = async(userToken: string, flight_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.delete(
    '/api/flight/delete/' + String(flight_id),
    config

  )
  .then((response) => response);
}