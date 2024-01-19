import axios, { AxiosResponse } from 'axios';

export const approveFlight = async(userToken: string, flight_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/flight/user_confirm/' + String(flight_id),
    {},
    config

  )
  .then((response) => response);
}
