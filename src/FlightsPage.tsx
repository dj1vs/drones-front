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
    const [usersArray, setUsersArray] = useState<string[]>([])


    useEffect(() => {
        const loadFlights = async()  => {
            var flights: Flight[] = []
            if (userToken !== undefined) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString)
                let status = urlParams.get('status')
                let startDate = urlParams.get('startDate')
                let endDate = urlParams.get('endDate')


                flights = await getFlights(userToken?.toString(), status?.toString(), startDate?.toString(), endDate?.toString())

                console.log(flights)

                if (!userToken) {
                    return
                }

                let arr: string[][] = []
                let usersArr: string[] = []
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

                    if (flight.User["name"]) {
                        usersArr.push(flight.User["name"])
                    } else {
                        usersArr.push('Пропуск')
                    }

                    
                    arr.push(flightArray)
                }
                setFlightsArray(arr);
                setUsersArray(usersArr);
            }
                
        }

        loadFlights()

        const intervalId = setInterval(() => {
            loadFlights();
        }, 5000);
    
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    if (!userToken) {
        return (
            <>
                <h3> Для просмотра полётов вам необходимо войти в систему!</h3>
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
                        {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                            <th scope='col'>Создатель</th>
                        }
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Регионы</th>
                        <th scope='col'>Дата создания</th>
                        <th scope='col'>Дата обработки</th>
                        <th scope='col'>Дата завершения</th>
                        <th scope='col'>Время взлёта</th>
                        <th scope='col'>Время прибытия</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {flightsArray.map((rowContent, rowID) => (
                        <tr key={rowID}>
                            {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                                <td key={rowID}>{usersArray[rowID]}</td>
                            }
                            {rowContent.map((val, rowID) => (
                                <td key={rowID}>{val}</td>
                            ))
                            }
                            {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                                <td>
                                    <Button href={'/drones-front/flight_edit?flight_id=' + flightsArray[rowID][0]}>Изменить</Button>
                                </td>
                            }
                            {(userRole?.toString() == '1') && 
                                <td>
                                    <Button href={'/drones-front/flight?flight_id=' + flightsArray[rowID][0]}>Просмотр</Button>
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