import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Table, Button} from 'react-bootstrap'

import store from './store/store'
import { getFlights } from './modules/get-flights'
import { Flight } from './modules/ds'

const FlightsPage: FC = () => {
    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flightsArray, setFlightsArray] = useState<string[][]>([])

    useEffect(() => {
        var flights: Flight[] = []
        const loadFlights = async()  => {
            if (userToken !== undefined) {
                flights = await getFlights(userToken?.toString(), '')
                var arr: string[][] = []
                for (let flight of flights) {
                    var flightArray:string[] = []
                    flightArray.push(flight.ID.toString())
                    flightArray.push(flight.Status)
                    flightArray.push(flight.DateCreated)
                    flightArray.push(flight.DateProcessed)
                    flightArray.push(flight.DateFinished)
                    flightArray.push(flight.TakeoffDate)
                    flightArray.push(flight.ArrivalDate)
                
                    arr.push(flightArray)
                }
                setFlightsArray(arr);
            }
                
        }

        loadFlights()
        console.log(userRole?.toString() == '2')

        

    }, []);

    return (
        <>
            <h1>Полёты</h1>
            {!userToken &&
                <h3> Вам необходимо войти в систему! </h3>

            }
            {userToken && flightsArray.length == 0 &&
                <h3> Полёты не найдены.</h3>
            }
            <Table>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Дата создания</th>
                        <th scope='col'>Дата обработки</th>
                        <th scope='col'>Дата завершения</th>
                        <th scope='col'>Время взлёта</th>
                        <th scope='col'>Время прибытия</th>
                        {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                            <th scope='col'></th>
                        }
                    </tr>
                    
                </thead>
                <tbody>
                    {flightsArray.map((rowContent, rowID) => (
                        <tr key={rowID}>
                            {rowContent.map((val, rowID) => (
                                <td key={rowID}>{val}</td>
                            ))
                            }
                            {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                                <Button href={'/drones-front/flight?flight_id=' + flightsArray[rowID][0]}>Изменить</Button>
                            }
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    )
}

export default FlightsPage