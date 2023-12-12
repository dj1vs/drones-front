import {Flight} from './ds'
import axios from 'axios';

export const editFlight = async(userToken = '', flight: Flight): Promise<string> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }
    return axios.put(
        '/api/flight/edit',
        {
          'arrivalDate': flight.ArrivalDate,
          'dateCreated': flight.DateCreated,
          'dateFinished': flight.DateFinished,
          'dateProcessed': flight.DateProcessed,
          'takeoffDate': flight.TakeoffDate,
        },
        config

    )
    // return fetch('/api/flight.edit' + String(id),{
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then((response) => response.json());
}
