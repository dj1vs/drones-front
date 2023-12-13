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
      flightID: flight.ID,
      status: flight.Status,
      arrivalDate: flight.ArrivalDate,
      takeoffDate: flight.TakeoffDate,
    },
    config

  )
  .then((response) => response.data);
}
