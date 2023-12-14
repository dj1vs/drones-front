import { FC,  useState, useEffect } from "react";
import { FormCheck, FormLabel, Form, Button, Row, Col} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../store/store";
import filtersSlice from "../store/filtersSlice";
import { useAppDispatch } from "../store/store";

interface InputChangeInterface {
    target: HTMLInputElement;
}

const RegionsFilter: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {regionName, regionStatus} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [statusClicked, setStatusClicked] = useState(false)

    useEffect(() => {
        console.log('Filters page got regionName: ' + regionName)
    }, [])

    const applyFilters = () => {
        dispatch(filtersSlice.actions.setRegionName(name))
        dispatch(filtersSlice.actions.setRegionStatus(status))

        let filterString = '?name_pattern=' + name
        if (statusClicked) {
            filterString += '&status=' + status
        }
        
        navigate('/drones-front/' + filterString)
        window.location.reload()
    }

    const handleNameChange = (event: InputChangeInterface) => {
        setName(event.target.value)
    }

    const handleActiveToggle = () => {
        setStatus('Действует')
        setStatusClicked(true);
    }

    const handleDisabledToggle = () => {
        setStatus('Недоступен')
        setStatusClicked(true)
    }

    const handleAllToggle = () => {
        setStatus('')
        setStatusClicked(true)
    }

    return (
        <div style={{border: '1px solid black'}}>
        <Row>
            <Col>
                <Form>
                    <FormLabel>Имя:</FormLabel>
                    <input onChange={handleNameChange} defaultValue={regionName?.toString()}></input>
                </Form>
            </Col>
            <Col>
                <Form>
                    <FormLabel>Статус региона:</FormLabel>
                    <FormCheck>
                        <FormCheckInput 
                            defaultChecked={regionStatus?.toString() == "Действует"}
                            type="radio"
                            name="flexRadioDefault"
                            onClick={handleActiveToggle}>
                        </FormCheckInput>
                        <FormLabel>Действует</FormLabel>
                    </FormCheck>
                    <FormCheck>
                        <FormCheckInput
                            defaultChecked={regionStatus?.toString() == "Недоступен"}
                            type="radio"
                            name="flexRadioDefault"
                            onClick={handleDisabledToggle}>
                        </FormCheckInput>
                        <FormLabel>Недоступен</FormLabel>
                    </FormCheck>
                    <FormCheck>
                        <FormCheckInput
                            defaultChecked={regionStatus?.toString() == ""}
                            type="radio"
                            name="flexRadioDefault"
                            onClick={handleAllToggle}>
                        </FormCheckInput>
                        <FormLabel>Все</FormLabel>
                    </FormCheck>
                </Form>
            </Col>
        </Row>
        <Button onClick={applyFilters}>Применить</Button>
        </div>
        
    )
}

export default RegionsFilter