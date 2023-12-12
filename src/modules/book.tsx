import axios from "axios";

export const book = async(regions: string[], userToken: string,
    arrivalDate: string, takeoffDate: string, dateFinished: string,
    dateCreated: string, dateProcessed: string): Promise<string> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }
    return axios.put(
        '/api/flight/edit',
        {
          'arrivalDate': arrivalDate,
          'dateCreated': dateCreated,
          'dateFinished': dateFinished,
          'dateProcessed': dateProcessed,
          'takeoffDate': takeoffDate,
        },
        config

    )
    .then((response) => response.data);
}