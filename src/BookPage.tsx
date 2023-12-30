import { FC, useState } from "react";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { Button, ListGroup, ListGroupItem, Form, Row, Col, Modal, } from "react-bootstrap";
import cartSlice from "./store/cartSlice";
import { useRef } from "react";

import store, { useAppDispatch } from "./store/store";
import { book } from "./modules/book";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const BookPage: FC = () => {
    const arrivalDateRef = useRef<any>(null)
    const takeoffDateRef = useRef<any>(null)

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [showDatesInvalid, setShowDatesInvalid] = useState(false)
    
    const dispatch = useAppDispatch()
    
    const {userToken} = useSelector((state: ReturnType<typeof store.getState> ) => state.auth)
    const {regions} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    const deleteFromCart = (regionName = '') => {
        return (event: React.MouseEvent) => {
            dispatch(cartSlice.actions.removeRegion(regionName))
            event.preventDefault()
        }
    }

    const bookRegion = async () => {
        if (regions === undefined || userToken === null) {
            return
        }

        let arrivalDate = arrivalDateRef.current.value
        let takeoffDate = takeoffDateRef.current.value
        if (arrivalDate) {
            arrivalDate + ":00Z"
        }
        if (takeoffDate) {
            takeoffDate += ":00Z"
        }

        const result = await book(regions, userToken, arrivalDate, takeoffDate)
        if (result.status == 201) {
            setShowSuccess(true)
        } else {
            setShowError(true)
        }
    }

    const handleErrorClose = () => {
        setShowError(false)
    }
    const handleSuccessClose = () => {
        setShowSuccess(false)
    }
    const handleDatesInvalidClose = () => {
        setShowDatesInvalid(false)
    }

    return (
        <>
            <Modal show = {showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка! Не получилось осуществить бронь.</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Забронировано!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showDatesInvalid} onHide={handleDatesInvalidClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Даты записаны не в том формате. Нужный формат: YYYY-MM-DD</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDatesInvalidClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Бронирование полёта</h1>
            {regions?.length !== 0 &&
                <h3>Выбранные регионы:</h3>
            }
            {regions?.length === 0 && 
                <h5>Вы ещё не выбрали ни одного региона.</h5>
            }
            <ListGroup style={{width: '500px'}}>
                {regions?.map((regionName, regionID) => (
                    <ListGroupItem key={regionID}> {regionName}
                        <span className="pull-right button-group" style={{float: 'right'}}>
                            <Button variant="danger" onClick={deleteFromCart(regionName)}>Удалить</Button>
                        </span>
                    </ListGroupItem>
                ))
                }
            </ListGroup>
            <h4>Параметры бронирования:</h4>
            <Form style={{width: '500px'}}>
                <Row>
                    <Col>
                        <label htmlFor="takeoffDate">Время взлёта</label>
                    </Col>
                    <Col>
                        <input
                            type="datetime-local"
                            ref={takeoffDateRef}
                        />
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="arrivalDate">Время прибытия</label>
                    </Col>
                    <Col>
                        <input
                            type="datetime-local"
                            ref={arrivalDateRef}
                        />
                    </Col>
                    
                </Row>
            </Form>
            <p></p>
            <Button onClick={bookRegion}>Забронировать!</Button>
            <p></p>
            <Button href="/drones-front/">Домой</Button>
        </>
    )

}

export default BookPage;