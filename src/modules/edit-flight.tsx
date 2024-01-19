import axios from 'axios';

export const editFlight = async(userToken = '', flight_id: number, arrivalDate: string, takeoffDate: string): Promise<string> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/flight/edit',
    {
      flightID: flight_id,
      arrivalDate: arrivalDate + ":00Z",
      takeoffDate: takeoffDate + ":00Z",
    },
    config

  )
  .then((response) => response.data);
}
