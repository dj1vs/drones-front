import { FC } from "react";
import { FormLabel, Button, Row, Col, Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import store from "../store/store";
import filtersSlice from "../store/filtersSlice";
import { useAppDispatch } from "../store/store";
import { useRef } from "react";

const RegionsFilter: FC = () => {
    const dispatch = useAppDispatch()

    const nameRef = useRef<any>(null)
    const districtRef = useRef<any>(null)

    const {regionName, regionDistrict} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const applyFilters = () => {
        let name = nameRef.current.value
        let district = districtRef.current.value
        
        dispatch(filtersSlice.actions.setRegionName(name))
        dispatch(filtersSlice.actions.setRegionDistrict(district))
    }

    return (
        <div>
        <Container className="mt-3">
            <Row xs={2} md={2} className="row justify-content-start">
                <Col>
                        <FormLabel>Название района:</FormLabel>
                        <input ref={nameRef} defaultValue={regionName?.toString()} className="form-control"></input>
                </Col>
                <Col>
                        <FormLabel>Округ:</FormLabel>
                        <input ref={districtRef} defaultValue={regionDistrict?.toString()} className="form-control"></input>
                </Col>
                <Col className="justify-content-start">
                    <Button onClick={applyFilters}>Поиск</Button>
                </Col>
                
            </Row>
        </Container>
        
        
        </div>
        
    )
}

export default RegionsFilter