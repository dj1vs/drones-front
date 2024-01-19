import { FC } from "react";
import { FormLabel, Button, Row} from "react-bootstrap";
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
        <Row className="row justify-content-start">
            <div className="col-2">
                    <FormLabel>Имя:</FormLabel>
            </div>
            <div className="col-2">
                    <input ref={nameRef} defaultValue={regionName?.toString()} className="form-control"></input>
            </div>
            <div className="col-2">
                    <FormLabel>Округ:</FormLabel>
            </div>
            <div className="col-2">
                    <input ref={districtRef} defaultValue={regionDistrict?.toString()} className="form-control"></input>
            </div>
        </Row>
        <Button onClick={applyFilters}>Поиск</Button>
        </div>
        
    )
}

export default RegionsFilter