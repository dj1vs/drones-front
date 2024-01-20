import { FC } from "react";

import { useEffect, useState, useRef} from "react";
import { useSelector } from "react-redux";

import { Col, Form,  Button,ListGroup, ListGroupItem,  FormLabel, Row } from "react-bootstrap";

import { getFlight, getFlightResp } from "./modules/get-flight";
import { FlightNoUser } from "./modules/ds";
import store from "./store/store";
import cartSlice from './store/cartSlice'
import { useAppDispatch } from "./store/store";

import { addRegionToDraft } from "./modules/add-region-to-draft";
import { getRegionByName } from "./modules/get-region";
import { removeRegionFromFlight } from "./modules/remove-region-from-flight";
import { approveFlight } from "./modules/approve-flight"

import { useNavigate } from "react-router-dom";
import { editFlight } from "./modules/edit-flight";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const FlightPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    
    const {userToken, userName, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flight, setFlight] = useState<FlightNoUser>()
    const [regionNames, setRegionNames] = useState<string[]>()
    const [wrongFlight, setWrongFlight] = useState(false)

    const [newRegion, setNewRegion] = useState('')

    const newRegionInputRef = useRef<any>(null)
    const takeoffDateRef = useRef<any>(null)
    const arrivalDateRef = useRef<any>(null)


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const flightIdString = urlParams.get('flight_id')

        if (!flightIdString || (flightIdString && !parseInt(flightIdString, 10))) {
            setWrongFlight(true)
        }

        const loadFlight = async () => {
            if (!flightIdString || !userToken) {
                return
            }
            const result : getFlightResp = await getFlight(userToken, +flightIdString)
            console.log(result)
            setFlight(result.Flight)

            if (userToken === null) {
                return
            }

            setRegionNames(result.Regions)
            
        }

        loadFlight()
    }, [])

    const approve = async () => {
        if (!userToken || !flight?.ID) {
            return
        }


        const result = await approveFlight(userToken, flight?.ID)
        if (result.status == 200) {
            dispatch(cartSlice.actions.setTakeoffDate(null))
            dispatch(cartSlice.actions.setArrivalDate(null))
            dispatch(cartSlice.actions.setDraftID(null))
            navigate('/drones-front/flights')
        }


        let arrivalDate = arrivalDateRef.current.value
        let takeoffDate = arrivalDateRef.current.value

        if (!arrivalDate) {
            arrivalDate = ""
        } 
        if (!takeoffDate) {
            takeoffDate = ""
        }

        await editFlight(userToken, flight?.ID, arrivalDate, takeoffDate)

        
    }

    const removeRegion = async(event: React.MouseEvent<HTMLButtonElement>) => {
        let removedRegionName = event.currentTarget.id

        if (!regionNames || !userToken || !flight?.ID) {
            return
        }

        let result = await getRegionByName(removedRegionName)
        if (!result.Name) {
            return
        }

        let deletion_result = await removeRegionFromFlight(userToken, result.ID, flight?.ID)
        if (deletion_result.status != 201) {
            return
        }

        setRegionNames(regionNames.filter(function(regionName) {
            return regionName !== removedRegionName
        }))

    }

    const handleNewRegionChange = (event: InputChangeInterface) => {
        setNewRegion(event.target.value)
    }

    const addRegion = async () => {
        if (!newRegion || !userToken) {
            return
        }

        if (regionNames?.indexOf(newRegion) !== -1) {
            return
        }

        const result = await getRegionByName(newRegion)
        if (!result.Name) {
            return
        }

        const addition_result = await addRegionToDraft(userToken, result.ID);
        if (addition_result.status != 200) {
            return
        }


        if (!regionNames) {
            setRegionNames([newRegion.toString()]);
        }

        if (regionNames === undefined) {
            return;
        }

        setRegionNames(regionNames.concat([newRegion]))
        setNewRegion('')

        if (newRegionInputRef.current != null) {
            newRegionInputRef.current.value = ""
        }
    }

    if (wrongFlight) {
        return (
            <h1>Добавьте в полёт хотя бы один район!</h1>
        )
    }

    return(
        <Form style={{width: '600px', marginRight: 'auto', marginLeft: 'auto'}}>
            <h1>Информация о полёте #{flight?.ID}</h1>
            <h4>Районы:</h4>
            {(flight?.Status == "Черновик" && (flight.User == userName || userRole == "2")) &&
                <>
                    <ListGroup style={{width: '500px'}}>
                        {regionNames?.map((regionName, regionID) => (
                            <ListGroupItem key={regionID}> {regionName}
                                <span className="pull-right button-group" style={{float: 'right'}}>
                                    <Button variant="danger" id={regionName} onClick={removeRegion}>Удалить</Button>
                                </span>
                            </ListGroupItem>
                        ))
                        }
                    </ListGroup>
                    <Row>
                        <Col>
                            <FormLabel>Добавить район:</FormLabel>
                        </Col>
                        <Col>
                            <input ref={newRegionInputRef} onChange={handleNewRegionChange} className="form-control"></input>
                        </Col>
                        <Col>
                            <Button onClick={addRegion}>Добавить</Button>
                        </Col>
                    </Row>
                </>
            }
            {

            }
            {!(flight?.Status == "Черновик" && (flight.User == userName || userRole == "2")) && 
                <ListGroup style={{width: '500px'}}>
                    {regionNames?.map((regionName, regionID) => (
                        <ListGroupItem key={regionID}> {regionName}
                        </ListGroupItem>
                    ))
                    }
                </ListGroup>
            }
            <h4>Характеристики:</h4>
            <p></p>
            <FormLabel>Статус: {flight?.Status}</FormLabel>
            <p></p>
            <FormLabel>Разрешённое время полёта: {flight?.AllowedHours}</FormLabel>
            <p></p>
            {(flight?.Status == "Черновик" && (flight.User == userName || userRole == "2")) && 
                <>
                    <FormLabel>Время взлёта:</FormLabel>
                    <input
                        type="datetime-local"
                        className="form-control"
                        ref={takeoffDateRef}
                    />
                    <FormLabel>Время прибытия:</FormLabel>
                    <input
                        type="datetime-local"
                        className="form-control"
                        ref={arrivalDateRef}
                    />
                </>
            }
            {!(flight?.Status == "Черновик" && (flight.User == userName || userRole == "2")) && 
                <>
                    <FormLabel>Время взлёта: {flight?.TakeoffDate}</FormLabel>
                    <p></p>
                    <FormLabel>Время прибытия: {flight?.ArrivalDate}</FormLabel>
                </>
            }
           
            {(flight?.Status == "Черновик" && flight.User == userName) &&
                <Row>
                    <p></p>
                    <Button onClick={approve} variant="success">Сформировать</Button>
                </Row>
            }
            <p></p>
            <Row>
                <Button href='/drones-front/flights'>К полётам</Button>
            </Row>
            <p></p>
            <Row>
                <Button href='/drones-front/'>Домой</Button>
            </Row>
            <p></p>
        </Form>
    )

}

export default FlightPage;