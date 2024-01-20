import {Region} from './ds'
import axios, { AxiosResponse } from 'axios';

export const createRegion = async(userToken = '', region: Region): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
    '/api/region/add',
    {
        ID: region.ID,
        District: region.District,
        Name: region.Name,
        Details: region.Details,
        Status: region.Status,
        AreaKm: region.AreaKm,
        Population: region.Population,
        HeadName: region.HeadName,
        HeadEmail: region.HeadEmail,
        HeadPhone: region.HeadPhone,
        AverageHeightM: region.AverageHeightM,
        ImageName: region.ImageName,
    },
    config

  )
  .then((response) => response);
}
