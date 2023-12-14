import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Table, Button} from 'react-bootstrap'

import store from './store/store'
import { getFlights } from './modules/get-flights'
import { getFlightRegions } from './modules/get-flight-regions'
import { Flight } from './modules/ds'
import FlightsFilter from './components/FlightsFilter'

const FlightsPage: FC = () => {
    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flightsArray, setFlightsArray] = useState<string[][]>([])


    useEffect(() => {
        var flights: Flight[] = []
        const loadFlights = async()  => {
            if (userToken !== undefined) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString)
                var status = urlParams.get('status')

                flights = await getFlights(userToken?.toString(), status?.toString())

                if (!userToken) {
                    return
                }

                var arr: string[][] = []
                for (let flight of flights) {
                    var flightArray:string[] = []
                    flightArray.push(flight.ID.toString())
                    flightArray.push(flight.Status)

                    const regions = await getFlightRegions(flight.ID, userToken)
                    if (regions) {
                        const region_names = []
                        for (let region of regions) {
                            region_names.push(region.Name)
                        }
                        flightArray.push(region_names.toString().replace(new RegExp(',', 'g'), '\n'))
                    } else {
                        flightArray.push('')
                    }

                    if (flight.DateCreated) {
                        flightArray.push(flight.DateCreated)
                    }
                    if (flight.DateProcessed) {
                        flightArray.push(flight.DateProcessed)
                    }
                    if (flight.DateFinished) {
                        flightArray.push(flight.DateFinished)
                    }
                    flightArray.push(flight.TakeoffDate)
                    flightArray.push(flight.ArrivalDate)


                    
                    arr.push(flightArray)
                }
                setFlightsArray(arr);
            }
                
        }

        loadFlights()
    }, []);

    if (!userToken) {
        return (
            <>
                <h3> Для просмотра полётов вам необходимо войти в систему!</h3>
            </>
        )
    } else if (flightsArray.length == 0) {
        return (
            <>
                <h1>Полёты</h1>
                <h3> Полёты не найдены.</h3>
            </>
        )
    }

    return (
        <>
            <h1>Полёты</h1>
            <FlightsFilter></FlightsFilter>
            <Table>
                <thead className='thead-dark'>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Регионы</th>
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
                                <td>
                                    <Button href={'/drones-front/flight?flight_id=' + flightsArray[rowID][0]}>Изменить</Button>
                                </td>
                            }
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    )
}

export default FlightsPage