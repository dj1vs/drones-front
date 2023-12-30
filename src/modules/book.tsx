import axios, { AxiosResponse } from "axios";

export const book = async(regions: string[], userToken: string, arrivalDate: string, takeoffDate: string, status: string): Promise<AxiosResponse> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }
    return axios.put(
        '/api/book',
        {
          'regions': regions,
          'arrivalDate': arrivalDate,
          'takeoffDate': takeoffDate,
          'status': status,
        },
        config

    )
    .then((response) => response);
}