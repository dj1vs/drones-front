import { FC } from "react";
import { useSelector } from "react-redux";
import { Form, FormLabel, FormSelect, Row, Col, Button, Container } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store/store";
import filtersSlice from "../store/filtersSlice";
import { useAppDispatch } from "../store/store";


const FlightsFilter: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const statusRef = useRef<any>(null)
    const startDateRef = useRef<any>(null)
    const endDateRef = useRef<any>(null)
    const flightCreatorRef = useRef<any>(null)

    const {flightStatus, startDate, endDate, flightCreator} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)
    const {userRole} = useSelector(
        (state: ReturnType<typeof store.getState> ) => state.auth
    )

    const applyFilters = () => {
        let status = statusRef.current.value
        let startDate = startDateRef.current.value
        let endDate = endDateRef.current.value

        if (startDate) {
            startDate += ':00Z';
        }

        if (endDate) {
            endDate += ':00Z'
        }


        dispatch(filtersSlice.actions.setFlightStatus(status))
        dispatch(filtersSlice.actions.setStartDate(startDate))
        dispatch(filtersSlice.actions.setEndDate(endDate))
        
        if (status == "Все") {
            status = ""
        }

        let url = '/drones-front/flights?status=' + status;
        url += '&startDate=' + startDate + '&endDate=' + endDate

        navigate(url)
        window.location.reload()
    }


    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <FormLabel>Статус:</FormLabel>
                        <FormSelect ref={statusRef} defaultValue={flightStatus?.toString()}>
                            <option>Черновик</option>
                            <option>Удалён</option>
                            <option>Сформирован</option>
                            <option>Завершён</option>
                            <option>Отклонён</option>
                            <option>Все</option>
                        </FormSelect>
                    </Col>
                    {userRole?.toString() == '2' && 
                        <Col>
                            <FormLabel>Создатель:</FormLabel>
                            <input
                                className="form-control"
                                defaultValue={flightCreator?.toString()}
                                ref={flightCreatorRef}
                            />
                        </Col>
                    }
                    <Col>
                        <FormLabel>Сформировано с:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={startDate?.toString().slice(0, -4)}
                            ref={startDateRef}
                        />
                    </Col>
                    <Col>
                        <FormLabel>По:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={endDate?.toString().slice(0, -4)}
                            ref={endDateRef}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FlightsFilter