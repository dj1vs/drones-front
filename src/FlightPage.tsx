import { FC } from "react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Form, FormControl, FormGroup, Button, FormSelect } from "react-bootstrap";

import { getFlight } from "./modules/get-flight";
import { Flight } from "./modules/ds";
import { getFlightRegions } from "./modules/get-flight-regions";
import store from "./store/store";

const FlightPage: FC = () => {
    const [flight, setFlight] = useState<Flight>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const flightIdString = urlParams.get('flight_id')

        const loadFlight = async () => {
            if (flightIdString === null) {
                return
            }
            const flight = await getFlight(+flightIdString)
            setFlight(flight)
        }

        loadFlight()
    }, [])


    return(
        <>
        <h1>Редактирование полёта #{flight?.ID}</h1>
        <Form>
            <FormGroup>
                <label htmlFor="statusInput">Статус</label>
                <FormSelect id="statusInput" defaultValue={flight?.Status}>
                    <option>Черновик</option>
                    <option>Удалён</option>
                    <option>Сформирован</option>
                    <option>Завершён</option>
                    <option>Отклонён</option>
                </FormSelect>
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