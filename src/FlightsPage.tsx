import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Row, Col } from 'react-bootstrap'

import FlightCard from './components/FlightCard'
import store from './store/store'
import { getFlights } from './modules/get-flights'
import { Flight } from './modules/ds'

const FlightsPage: FC = () => {
    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flights, setFlights] = useState<Flight[]>([])

    useEffect(() => {
        const loadFlights = async()  => {
            if (userToken !== undefined) {
                const result = await getFlights(userToken?.toString(), '')
                console.log(result)
                setFlights(result)
            }

        }

        loadFlights()

    }, []);

    return (
        <>
            <h1>Полёты</h1>
            {!userToken &&
                <h3> Вам необходимо войти в систему! </h3>

            }
            {userToken && flights.length == 0 &&
                <h3> Полёты не найдены.</h3>
            }
            <Row xs={4} md={4} className='g-4' >
                {flights.map((item, index) => (
                    <Col key={index}> 
                        <FlightCard {...{
                            regionName: 'пусто',
                            flightStatus: item.Status,
                            dateCreated: item.DateCreated,
                            dateFinished: item.DateFinished,
                            takeoffDate: item.TakeoffDate,
                            arrivalDate: item.ArrivalDate
                        }}></FlightCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default FlightsPage