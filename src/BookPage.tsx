import { FC, useState } from "react";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { Button, ListGroup, ListGroupItem, Form, FormGroup, Modal, FormControl } from "react-bootstrap";
import cartSlice from "./store/cartSlice";

import store, { useAppDispatch } from "./store/store";
import { book } from "./modules/book";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const BookPage: FC = () => {
    const [arrivalDate, setArrivalDate] = useState('')
    const [takeoffDate, setTakeoffDate] = useState('')

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

        if (arrivalDate.match("\\d\\d\\d\\d-\\d\\d-\\d\\d") == null || takeoffDate.match("dddd-dd-dd")) {
            setShowDatesInvalid(true)
            return
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
                <h4>Вы ещё не выбрали ни одного региона!</h4>
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
                <FormGroup>
                    <label htmlFor="takeoffDate">Время взлёта</label>
                    <FormControl
                        onChange={e => setTakeoffDate(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="arrivalDate">Время прибытия</label>
                    <FormControl
                        onChange={e => setArrivalDate(e.target.value)}
                    />
                    <small>Формат даты: YYYY-MM-DD</small>
                </FormGroup>
            </Form>
            <p></p>
            <Button onClick={bookRegion}>Забронировать!</Button>
            <p></p>
            <Button href="/drones-front/">Домой</Button>
        </>
    )

}

export default BookPage;