import { FC } from "react";

import { useEffect, useState } from "react";

import { Form, FormControl, FormGroup, Button } from "react-bootstrap";

import { getFlight } from "./modules/get-flight";
import { Flight } from "./modules/ds";

const FlightPage: FC = () => {

    const [flightId, setFlightId] = useState(0)
    const [flight, setFlight] = useState<Flight>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const flightIdString = urlParams.get('flight_id')
        if (flightIdString != null) {
            setFlightId(+flightIdString)
        }

        const loadFlight = async () => {
            const flight = await getFlight(flightId)
            setFlight(flight)
        }

        loadFlight()


    })


    return(
        <>
        <h1>Редактирование полёта #{flightId}</h1>
        <Form>
            <FormGroup>
                <label htmlFor="statusInput">Статус</label>
                <FormControl type='text' id="statusInput" defaultValue={flight?.Status}></FormControl>
                <small id="statusHelp">Возможные статусы: Черновик, Удалён, Сформирован, Завершён, Отклонён</small>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateCreatedInput">Дата создания</label>
                <FormControl id="dateCreatedInput" defaultValue={flight?.DateCreated}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateProcessedInput">Дата обработки</label>
                <FormControl id="dateProcessedInput" defaultValue={flight?.DateProcessed}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateFinishedInput">Дата завершения</label>
                <FormControl id="dateFinishedInput" defaultValue={flight?.DateFinished}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="takeoffDate">Время взлёта</label>
                <FormControl id="takeoffDate" defaultValue={flight?.TakeoffDate}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="arrivalDate">Время прибытия</label>
                <FormControl id="arrivalDate" defaultValue={flight?.ArrivalDate}></FormControl>
            </FormGroup>
        </Form>
        <Button>Сохранить изменения</Button>
        <p></p>
        <Button href='/drones-front/flights'>К полётам</Button>
        <p></p>
        <Button href='/drones-front/'>Домой</Button>
        <p></p>
        </>
    )

}

export default FlightPage;