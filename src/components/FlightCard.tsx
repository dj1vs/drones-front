import { FC } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import store from '../store/store'

interface flightProps {
    regionName: string,
    flightStatus: string,
    dateCreated: string,
    dateFinished: string,
    takeoffDate: string,
    arrivalDate: string
}

const FlightCard: FC<flightProps> = ({ regionName, flightStatus, dateCreated, dateFinished, takeoffDate, arrivalDate}) => {
    const {userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    return (
        <Card>
            <Card.Body>
                <p> Регион: {regionName} </p>
                <p> Статус: {flightStatus} </p>
                <p> Заявка создана: {dateCreated}</p>
                <p> Заявка завершена: {dateFinished} </p>
                <p> Дата взлёта: {takeoffDate}</p>
                <p> Дата посадки: {arrivalDate} </p>
            </Card.Body>
            <Card.Footer>
                {userRole == '1' &&
                    <Button>Отменить</Button>
                }
                {(userRole == '2' || userRole == '3') &&
                    <Button>Изменить</Button>
                }
            </Card.Footer>
        </Card>
    )
}

export default FlightCard;
