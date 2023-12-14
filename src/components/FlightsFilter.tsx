import { FC, useState } from "react";
import { Form, FormLabel, FormSelect, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const FlightsFilter: FC = () => {
    const navigate = useNavigate()
    const statusRef = useRef<any>(null)

    const applyFilters = () => {
        navigate('/drones-front/flights/?status=' + statusRef.current.value)
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
                        <FormSelect ref={statusRef}>
                            <option>Черновик</option>
                            <option>Удалён</option>
                            <option>Сформирован</option>
                            <option>Завершён</option>
                            <option>Отклонён</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Button onClick={applyFilters}>Применить</Button>
            </Form>
        </div>
    )
}

export default FlightsFilter