import { FC } from "react";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { Button, ListGroup, ListGroupItem, Form, FormGroup, FormSelect, FormControl } from "react-bootstrap";
import cartSlice from "./store/cartSlice";

import store, { useAppDispatch } from "./store/store";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const BookPage: FC = () => {
    const dispatch = useAppDispatch()

    const {regions} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    const deleteFromCart = (regionName = '') => {
        return (event: React.MouseEvent) => {
            dispatch(cartSlice.actions.removeRegion(regionName))
            event.preventDefault()
        }
    }

    return (
        <>
            <h1>Бронирование полёта</h1>
            {regions?.length !== 0 &&
                <h3>Выбранные регионы:</h3>
            }
            {regions?.length === 0 && 
                <h4>Вы ещё не выбрали ни одного региона!</h4>
            }
            <ListGroup style={{width: '500px'}}>
                {regions?.map((regionName, regionID) => (
                    <ListGroupItem> {regionName}
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
                    <label htmlFor="statusInput">Статус</label>
                    <FormSelect id="statusInput">
                        <option>Черновик</option>
                        <option>Удалён</option>
                        <option>Сформирован</option>
                        <option>Завершён</option>
                        <option>Отклонён</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateCreatedInput">Дата создания</label>
                    <FormControl id="dateCreatedInput"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateProcessedInput">Дата обработки</label>
                    <FormControl id="dateProcessedInput"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateFinishedInput">Дата завершения</label>
                    <FormControl id="dateFinishedInput"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="takeoffDate">Время взлёта</label>
                    <FormControl id="takeoffDate"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="arrivalDate">Время прибытия</label>
                    <FormControl id="arrivalDate"></FormControl>
                </FormGroup>
            </Form>
            <p></p>
            <Button>Забронировать!</Button>
            <p></p>
            <Button href="/drones-front/">Домой</Button>
        </>
    )

}

export default BookPage;