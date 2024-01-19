import axios, { AxiosResponse } from 'axios';

export const addRegionToDraft = async(userToken = '', region_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
    '/api/region/add_to_flight/' + String(region_id),
    {},
    config

  )
  .then((response) => response);
}
