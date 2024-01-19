import axios, { AxiosResponse } from 'axios';

export const modApproveFlight = async(userToken: string, flight_id : number, confirm: string): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/flight/moderator_confirm?flight_id=' + String(flight_id) + "&confirm=" + confirm,
    {},
    config

  )
  .then((response) => response);
}
