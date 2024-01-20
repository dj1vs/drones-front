import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Container, Table, Button, Row, Col, Form, FormLabel, FormSelect} from 'react-bootstrap'

import store from './store/store'
import { getFlights } from './modules/get-flights'
import { getFlightRegions } from './modules/get-flight-regions'
import { Flight } from './modules/ds'
import filtersSlice from './store/filtersSlice'
import { useAppDispatch } from "./store/store";
import { useRef } from "react";
import { deleteFlight } from './modules/delete-flight'
import { useNavigate } from 'react-router-dom'


const FlightsPage: FC = () => {
    const {userToken, userRole, userName} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const {flightStatus, startDate, endDate, flightCreator} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const [flightsArray, setFlightsArray] = useState<string[][]>([])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const statusRef = useRef<any>(null)
    const startDateRef = useRef<any>(null)
    const endDateRef = useRef<any>(null)
    const flightCreatorRef = useRef<any>(null)

    useEffect(() => {
        const applyFilters = () => {
            let status = statusRef.current.value
            let startDate = startDateRef.current.value
            let endDate = endDateRef.current.value
            // let creator = flightCreatorRef.current.value
    
            dispatch(filtersSlice.actions.setFlightStatus(status))
            dispatch(filtersSlice.actions.setStartDate(startDate))
            dispatch(filtersSlice.actions.setEndDate(endDate))
            // dispatch(flitersSlice.actions.setFli) setFlightCreator
            
            if (status == "Все") {
                status = ""
            }
        }

        const loadFlights = async()  => {

            applyFilters()

            let status = statusRef.current.value
            let startDate = startDateRef.current.value
            let endDate = endDateRef.current.value

            if (status == "Все") {
                status = ""
            }

            var flights: Flight[] = []
            if (userToken) {

                if (flightStatus == null) { //todo
                    return;
                }
                
                console.log(status)
                flights = await getFlights(userToken, status, startDate, endDate) // add flight creator
                console.log(flights)

                if (!userToken) {
                    return
                }

                let arr: string[][] = []
                for (let flight of flights) {
                    let flightArray:string[] = []

                    if (userRole?.toString() == '2') {
                        if (flight.User && flight.User["name"]) {
                            flightArray.push(flight.User["name"])
                        } else {
                            flightArray.push('-')
                        }
                    }
                    


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
                        flight.DateCreated = flight.DateCreated.substring(0,  flight.DateCreated.indexOf('+'));
                        flightArray.push(flight.DateCreated.replace('T', ' '))
                    }
                    if (flight.DateProcessed) {
                        if (flight.DateProcessed == "0001-01-01T00:00:00Z") {
                            flightArray.push("-")
                        } else {
                            flight.DateProcessed = flight.DateProcessed.substring(0,  flight.DateProcessed.indexOf('+'));
                            flightArray.push(flight.DateProcessed.replace('T', ' '))
                        }
                    }
                    if (flight.DateFinished) {
                        if (flight.DateFinished == "0001-01-01T00:00:00Z") {
                            flightArray.push("-")
                        } else {
                            flight.DateFinished = flight.DateFinished.substring(0,  flight.DateFinished.indexOf('+'));
                            flightArray.push(flight.DateFinished.replace('T', ' '))
                        }
                    }

                    if (flight.TakeoffDate) {
                        if (flight.TakeoffDate == "0001-01-01T00:00:00Z") {
                            flightArray.push("-")
                        } else {
                            flight.TakeoffDate = flight.TakeoffDate.substring(0,  flight.TakeoffDate.indexOf('+'));
                            flightArray.push(flight.TakeoffDate.replace('T', ' '))
                        }
                    }
                    if (flight.ArrivalDate) {
                        if (flight.ArrivalDate == "0001-01-01T00:00:00Z") {
                            flightArray.push("-")
                        } else {
                            flight.ArrivalDate = flight.ArrivalDate.substring(0,  flight.ArrivalDate.indexOf('+'));
                            flightArray.push(flight.ArrivalDate.replace('T', ' '))
                        }
                    }

                   

                    
                    arr.push(flightArray)
                }
                setFlightsArray(arr);
            }
                
        }

        loadFlights()

        const intervalId = setInterval(() => {
            loadFlights();
        }, 1000);
    
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

    const cancelFlight = async(event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.id)
        const flight_id = parseInt(event.currentTarget.id, 10)
        if (!flight_id) {
            return
        }

        const result = await deleteFlight(userToken, flight_id)
        if (result.status == 200) {
            navigate('/drones-front/flights')
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <h1 className="text-center">Полёты</h1>
                  </Col>
                </Row>
            </Container>
            <p></p>
            <div>
            <Form>
                <Row>
                    <Col>
                        <FormLabel>Статус:</FormLabel>
                        <FormSelect ref={statusRef} defaultValue={flightStatus?.toString()}>
                            <option>Черновик</option>
                            <option>Удалён</option>
                            <option>Сформирован</option>
                            <option>Завершён</option>
                            <option>Отклонён</option>
                            <option>Все</option>
                        </FormSelect>
                    </Col>
                    {userRole?.toString() == '2' && 
                        <Col>
                            <FormLabel>Создатель:</FormLabel>
                            <input
                                className="form-control"
                                defaultValue={flightCreator?.toString()}
                                ref={flightCreatorRef}
                            />
                        </Col>
                    }
                    <Col>
                        <FormLabel>Сформировано с:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={startDate?.toString().slice(0, -4)}
                            ref={startDateRef}
                        />
                    </Col>
                    <Col>
                        <FormLabel>По:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={endDate?.toString().slice(0, -4)}
                            ref={endDateRef}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
            <p></p>
            <Table>
                <thead className='thead-dark'>
                    <tr>
                        {(userRole?.toString() == '2') &&
                            <th scope='col'>Создатель</th>
                        }
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Районы</th>
                        <th scope='col'>Дата создания</th>
                        <th scope='col'>Дата обработки</th>
                        <th scope='col'>Дата завершения</th>
                        <th scope='col'>Дата взлёта</th>
                        <th scope='col'>Дата прибытия</th>
                        <th scope='col'></th>
                        {(userRole?.toString() == '1') && 
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
                                    <Button href={'/drones-front/flight_edit?flight_id=' + flightsArray[rowID][1]}>Изменить</Button>
                                </td>
                            }
                            {(userRole?.toString() == '1') && 
                                <td>
                                    <Button href={'/drones-front/flight?flight_id=' + flightsArray[rowID][0]}>Просмотр</Button>
                                </td>
                            }
                            {(((userRole?.toString() == '1') || (userName == flightsArray[rowID][0])) && ((flightsArray[rowID][1 + Number(userRole?.toString() == '2')] == "Черновик") || (flightsArray[rowID][1 + Number(userRole?.toString() == '2')] == "Сформирован")) ) && 
                            <td>
                                <Button variant='danger'
                                id={flightsArray[rowID][Number((userRole?.toString() == '2'))]}
                                onClick={cancelFlight}>
                                    Отменить
                                </Button>
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