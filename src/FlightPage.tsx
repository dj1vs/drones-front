import { FC } from "react";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { Form, FormControl, FormGroup, Button, FormSelect, ListGroup, ListGroupItem, FormLabel } from "react-bootstrap";

import { getFlight } from "./modules/get-flight";
import { Flight, Region } from "./modules/ds";
import { getFlightRegions } from "./modules/get-flight-regions";
import store from "./store/store";
import { setFlightRegions } from "./modules/set-flight-regions";
import { editFlight } from "./modules/edit-flight";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const FlightPage: FC = () => {
    const newRegionInputRef = useRef<any>(null)
    const takeoffDateRef = useRef<any>(null)
    const arrivalDateRef = useRef<any>(null)
    const statusRef = useRef<any>(null)

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flight, setFlight] = useState<Flight>()
    const [regionNames, setRegionNames] = useState<string[]>()
    const [newRegion, setNewRegion] = useState('')

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
            for (let region of regions) {
                regionNames.push(region.Name)
            }
            setRegionNames(regionNames)
        }

        loadFlight()
    }, [])

    const sendChanges = async() => {
        if (!userToken) {
            return;
        }

        var flight_id = 0
        var takeoffDate = ''
        var arrivalDate = ''
        var status = ''

        if (flight?.ID !== undefined) {
            flight_id = flight?.ID
        }
        if (takeoffDateRef.current != null) {
            takeoffDate = takeoffDateRef.current.value
        }
        if (arrivalDateRef.current != null) {
            arrivalDate = arrivalDateRef.current.value
        }
        if (statusRef.current != null) {
            status = statusRef.current.value
        }

        const editResult = await editFlight(userToken, {
            ID: flight_id,
            TakeoffDate: takeoffDate,
            ArrivalDate: arrivalDate,
            Status: status,
        })
        console.log(editResult)


        if (!regionNames || !userToken) {
            return;
        }
        const regionsResult = await setFlightRegions(flight?.ID, regionNames, userToken)
        console.log(regionsResult)

    }

    const removeRegion = (removedRegionName: string) => {
        return (event: React.MouseEvent) => {
            if (!regionNames) {
                return
            }
    
            setRegionNames(regionNames.filter(function(regionName) {
                return regionName !== removedRegionName
            }))

            event.preventDefault()
        }
    }

    const addRegion = () => {
        if (!regionNames || !newRegion) {
            return
        }

        setRegionNames(regionNames.concat([newRegion]))
        setNewRegion('')

        if (newRegionInputRef.current != null) {
            newRegionInputRef.current.value = ""
        }
    }

    const handleNewRegionChange = (event: InputChangeInterface) => {
        setNewRegion(event.target.value)
    }


    return(
        <>
        <h1>Редактирование полёта #{flight?.ID}</h1>
        <h4>Регионы:</h4>
        <ListGroup style={{width: '500px'}}>
            {regionNames?.map((regionName, regionID) => (
                <ListGroupItem key={regionID}> {regionName}
                    <span className="pull-right button-group" style={{float: 'right'}}>
                        <Button variant="danger" onClick={removeRegion(regionName)}>Удалить</Button>
                    </span>
                </ListGroupItem>
            ))
            }
        </ListGroup>
        <span>
            <input ref={newRegionInputRef} onChange={handleNewRegionChange}></input>
            <Button onClick={addRegion}>Добавить</Button>
        </span>
        <h4>Характеристики:</h4>
        <Form>
            <FormGroup>
                <label htmlFor="statusInput">Статус</label>
                <FormSelect id="statusInput" defaultValue={flight?.Status} ref={statusRef}>
                    <option>Черновик</option>
                    <option>Удалён</option>
                    <option>Сформирован</option>
                    <option>Завершён</option>
                    <option>Отклонён</option>
                </FormSelect>
            </FormGroup>
            <FormGroup>
                <label htmlFor="takeoffDate">Время взлёта</label>
                <FormControl id="takeoffDate" defaultValue={flight?.TakeoffDate} ref={takeoffDateRef}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="arrivalDate">Время прибытия</label>
                <FormControl id="arrivalDate" defaultValue={flight?.ArrivalDate} ref={arrivalDateRef}></FormControl>
            </FormGroup>
        </Form>
        <Button onClick={sendChanges}>Сохранить изменения</Button>
        <p></p>
        <Button href='/drones-front/flights'>К полётам</Button>
        <p></p>
        <Button href='/drones-front/'>Домой</Button>
        <p></p>
        </>
    )

}

export default FlightPage;