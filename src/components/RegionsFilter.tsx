import { FC,  useEffect } from "react";
import { FormLabel, Button, Row, FormSelect} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../store/store";
import filtersSlice from "../store/filtersSlice";
import { useAppDispatch } from "../store/store";
import { useRef } from "react";

const RegionsFilter: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const nameRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const districtRef = useRef<any>(null)

    const {regionName, regionStatus, regionDistrict} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const applyFilters = () => {
        let name = nameRef.current.value
        let status = statusRef.current.value
        let district = districtRef.current.value

        dispatch(filtersSlice.actions.setRegionName(name))
        dispatch(filtersSlice.actions.setRegionStatus(status))
        dispatch(filtersSlice.actions.setRegionDistrict(district))
        
        
        let filterString = '?name_pattern=' + name
        if (status) {
            filterString += '&status=' + status
        }
        
        if (district) {
            filterString += "&district=" + district
        }
        
        navigate('/drones-front/' + filterString)
        window.location.reload()
    }

    return (
        <div>
        <Row className="row justify-content-start">
            <div className="col-1">
                    <FormLabel>Имя:</FormLabel>
            </div>
            <div className="col-1">
                    <input ref={nameRef} defaultValue={regionName?.toString()} className="form-control"></input>
            </div>
            <div className="col-1">
                    <FormLabel>Округ:</FormLabel>
            </div>
            <div className="col-1">
                    <input ref={districtRef} defaultValue={regionDistrict?.toString()} className="form-control"></input>
            </div>
            <div className="col-1">
                    <FormLabel>Статус региона:</FormLabel>
            </div>
            <div className="col-1">
                    <FormSelect ref={statusRef} defaultValue={regionStatus?.toString()}>
                        <option>Действует</option>
                        <option>Недоступен</option>
                        <option>Все</option>
                        div</FormSelect>
            </div>
        </Row>
        <Button onClick={applyFilters}>Применить</Button>
        </div>
        
    )
}

export default RegionsFilter