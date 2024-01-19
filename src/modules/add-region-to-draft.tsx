import axios from 'axios';

export const addRegionToDraft = async(userToken = '', region_id : number): Promise<string> => {
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
  .then((response) => response.data);
}
