import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import './RegionsPage.css'
import defaultImage from './assets/empty-region.png'

import { Region } from './modules/ds'
import { GetRegionsResponse, getRegions } from './modules/get-regions';

import { Row, Col, Modal, Button, Container } from 'react-bootstrap'
import RegionCard from './components/RegionCard';
import RegionsFilter from './components/RegionsFilter';

import store, { useAppDispatch } from './store/store';
import cartSlice from './store/cartSlice';
import { getFlight, getFlightResp } from './modules/get-flight'


const RegionsPage: FC = () => {
    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const dispatch = useAppDispatch()

    const [regions, setRegions] = useState<Region[]>([])
    const {booked} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)
    const {regionName, regionDistrict} = useSelector((state: ReturnType<typeof store.getState> ) => state.filters)

    useEffect(() => {
        const loadRegions = async()  => {
            const result : GetRegionsResponse = await getRegions(String(userToken), String(regionName), 'Действует', String(regionDistrict))

           if (result.regions) {
               setRegions(result.regions)
           }

           if (!result.draft_flight || !userToken) {
                return;
           }

           const flight_result : getFlightResp = await getFlight(userToken, result.draft_flight)

            if (flight_result.Flight && flight_result.Flight.ID != 0) {
                console.log(flight_result.Flight.ID)
                dispatch(cartSlice.actions.setTakeoffDate(flight_result.Flight.TakeoffDate))
                dispatch(cartSlice.actions.setArrivalDate(flight_result.Flight.ArrivalDate))
                dispatch(cartSlice.actions.setDraftID(flight_result.Flight.ID))
            } else {
                dispatch(cartSlice.actions.setTakeoffDate(null))
                dispatch(cartSlice.actions.setArrivalDate(null))
                dispatch(cartSlice.actions.setDraftID(null))
            }

        }

        loadRegions()

    }, [regionName, regionDistrict, booked]);
    

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableBooked())
    }

    return (

        <div >
            <Modal show = {booked} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Район добавлен в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {dispatch(cartSlice.actions.disableBooked())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>

            <RegionsFilter></RegionsFilter>
            <p></p>

            <Container className="mt-5">
                <Row xs={4} md={4} className='justify-content-center'>
                    {regions.map((item, index) => (
                        <Col key={index} md={3} className="mb-4"> 
                            <RegionCard {...{
                                 imageUrl: (item.ImageName == '' ? defaultImage?.toString() : "/region_image/" + item.ImageName?.toString()),
                                 regionName: item.Name,
                                 pageUrl: window.location.href.split('?')[0] + "region?region_name=" + item.Name,
                                 regionID: item.ID
                            }}></RegionCard>
                        </Col>
                    ))}
                </Row>
            </Container>

            
            
            

        </div>
        
    )
}

export default RegionsPage