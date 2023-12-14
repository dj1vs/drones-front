import { FC } from "react";
import { useSelector } from "react-redux";
import { Form, FormLabel, FormSelect, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store/store";
import filtersSlice from "../store/filtersSlice";
import { useAppDispatch } from "../store/store";

const FlightsFilter: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const statusRef = useRef<any>(null)

    const {flightStatus} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const applyFilters = () => {
        let status = statusRef.current.value
        dispatch(filtersSlice.actions.setFlightStatus(status))
        
        if (status == "Все") {
            status = ""
        }
        navigate('/drones-front/flights/?status=' + status)
        window.location.reload()
    }

    return (
        <div style={{border: '1px solid black'}}>
            <Form>
                <Row>
                    <Col>
                        <FormLabel>Статус:</FormLabel>
                    </Col>
                    <Col>
                        <FormSelect ref={statusRef} defaultValue={flightStatus?.toString()}>
                            <option>Черновик</option>
                            <option>Удалён</option>
                            <option>Сформирован</option>
                            <option>Завершён</option>
                            <option>Отклонён</option>
                            <option>Все</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Button onClick={applyFilters}>Применить</Button>
            </Form>
        </div>
    )
}

export default FlightsFilter