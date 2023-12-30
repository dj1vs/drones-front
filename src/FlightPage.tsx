import { FC } from "react";

import { useEffect, useState} from "react";
import { useSelector } from "react-redux";

import { Form,  Button,ListGroup, ListGroupItem,  FormLabel } from "react-bootstrap";

import { getFlight } from "./modules/get-flight";
import { Flight } from "./modules/ds";
import { getFlightRegions } from "./modules/get-flight-regions";
import store from "./store/store";
const FlightPage: FC = () => {

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flight, setFlight] = useState<Flight>()
    const [regionNames, setRegionNames] = useState<string[]>()

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

            if (userToken === null) {
                return
            }

            const regions = await getFlightRegions(+flightIdString, userToken)
            var regionNames: string[] = []
            if (regions) {
                for (let region of regions) {
                    regionNames.push(region.Name)
                }
                setRegionNames(regionNames)
            }
            
        }

        loadFlight()
    }, [])

    return(
        <div style={{width: '600px'}}>
            <h1>Редактирование полёта #{flight?.ID}</h1>
            <h4>Регионы:</h4>
            <ListGroup style={{width: '500px'}}>
                {regionNames?.map((regionName, regionID) => (
                    <ListGroupItem key={regionID}> {regionName}
                    </ListGroupItem>
                ))
                }
            </ListGroup>
            <h4>Характеристики:</h4>
            <Form>
                <FormLabel>Статус: {flight?.Status}</FormLabel>
                <FormLabel>Время взлёта: {flight?.TakeoffDate}</FormLabel>
                <FormLabel>Время прибытия: {flight?.ArrivalDate}</FormLabel>
            </Form>
            <Button href='/drones-front/flights'>К полётам</Button>
            <p></p>
            <Button href='/drones-front/'>Домой</Button>
            <p></p>
        </div>
    )

}

export default FlightPage;