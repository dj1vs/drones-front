import { FC,  useState } from "react";
import { FormCheck, FormLabel, Form, Button, Row, Col} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useNavigate } from "react-router-dom";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const RegionsFilter: FC = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [active, setActive] = useState(false)

    const applyFilters = () => {
        let activeString = (active ? 'Действует' : 'Недоступен')
        let filterString = '?name_pattern=' + name + '&status=' + activeString
        navigate('/drones-front/' + filterString)
        window.location.reload()
    }

    const handleNameChange = (event: InputChangeInterface) => {
        setName(event.target.value)
    }

    const handleActiveToggle = () => {
        setActive(true)
    }

    const handleDisabledToggle = () => {
        setActive(false)
    }

    return (
        <div style={{border: '1px solid black'}}>
        <Row>
            <Col>
                <Form>
                    <FormLabel>Имя:</FormLabel>
                    <input onChange={handleNameChange}></input>
                </Form>
            </Col>
            <Col>
                <Form>
                    <FormLabel>Статус региона:</FormLabel>
                    <FormCheck>
                        <FormCheckInput 
                            defaultChecked={true}
                            type="radio"
                            name="flexRadioDefault"
                            onClick={handleActiveToggle}>
                        </FormCheckInput>
                        <FormLabel>Действует</FormLabel>
                    </FormCheck>
                    <FormCheck>
                        <FormCheckInput
                            type="radio"
                            name="flexRadioDefault"
                            onClick={handleDisabledToggle}>
                        </FormCheckInput>
                        <FormLabel>Недоступен</FormLabel>
                    </FormCheck>
                </Form>
            </Col>
        </Row>
        <Button onClick={applyFilters}>Применить</Button>
        </div>
        
    )
}

export default RegionsFilter