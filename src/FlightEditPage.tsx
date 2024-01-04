import { FC } from "react";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { Form, FormControl, FormGroup, Button, FormSelect, ListGroup, ListGroupItem, Modal, Row, Col, FormLabel } from "react-bootstrap";

import { getFlight } from "./modules/get-flight";
import { Flight } from "./modules/ds";
import { getFlightRegions } from "./modules/get-flight-regions";
import store from "./store/store";
import { setFlightRegions } from "./modules/set-flight-regions";
import { editFlight } from "./modules/edit-flight";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const FlightEditPage: FC = () => {
    const newRegionInputRef = useRef<any>(null)
    const takeoffDateRef = useRef<any>(null)
    const arrivalDateRef = useRef<any>(null)
    const statusRef = useRef<any>(null)

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [flight, setFlight] = useState<Flight>()
    const [regionNames, setRegionNames] = useState<string[]>()
    const [newRegion, setNewRegion] = useState('')

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

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

        await editFlight(userToken, {
            ID: flight_id,
            TakeoffDate: takeoffDate,
            ArrivalDate: arrivalDate,
            Status: status,
        })


        if (!regionNames || !userToken) {
            return;
        }
        const regionsResult = await setFlightRegions(flight?.ID, regionNames, userToken)
        if (regionsResult.status == 201) {
            setShowSuccess(true)
        } else {
            setShowError(true)
        }

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
        if (!newRegion) {
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

    const handleNewRegionChange = (event: InputChangeInterface) => {
        setNewRegion(event.target.value)
    }

    const handleErrorClose= () => {
        setShowError(false)
    }
    const handleSuccessClose = () => {
        setShowSuccess(false)
    }


    return(
        <>
            <Modal show = {showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Произошла ошибка, полёт не был обновлён</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Обновление полёта прошло успешно!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form style={{width: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
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
                <Row>
                    <Col>
                        <FormLabel>Добавить регион:</FormLabel>
                    </Col>
                    <Col>
                        <input ref={newRegionInputRef} onChange={handleNewRegionChange} className="form-control"></input>
                    </Col>
                    <Col>
                        <Button onClick={addRegion}>Добавить</Button>
                    </Col>
                </Row>
                <h4>Характеристики:</h4>
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
                <Row>
                    <Button onClick={sendChanges}>Сохранить изменения</Button>
                </Row>
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
        </>
    )

}

export default FlightEditPage;