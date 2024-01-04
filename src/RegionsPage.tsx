import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { GetRegionsResponse, getRegions } from './modules/get-regions';

import { Row, Modal, Button } from 'react-bootstrap'
import RegionCard from './components/RegionCard';
import RegionsFilter from './components/RegionsFilter';

import store, { useAppDispatch } from './store/store';
import cartSlice from './store/cartSlice';

import ModRegionsPage from './ModRegionsPage';

const RegionsPage: FC = () => {
    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const dispatch = useAppDispatch()

    const [regions, setRegions] = useState<Region[]>([])
    const {booked} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)

    useEffect(() => {
        const loadRegions = async()  => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString)
            let regionName = urlParams.get('name_pattern')
            let status = urlParams.get('status')
            let district = urlParams.get('district') 
            if (regionName == null) {
                regionName = "";
            }
            if (status == null) {
                status = "";
            }
            if (district == null) {
                district = "";
            }
            const result : GetRegionsResponse = await getRegions(String(userToken), String(regionName), String(status), String(district))
            setRegions(result.regions)
            dispatch(cartSlice.actions.setTakeoffDate(result.draft_flight.TakeoffDate))
            dispatch(cartSlice.actions.setArrivalDate(result.draft_flight.ArrivalDate))
            dispatch(cartSlice.actions.setDraftID(result.draft_flight.ID))
            

        }

        loadRegions()

    }, []);

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableBooked())
    }

    if (userToken && (userRole?.toString() == '2' || userRole?.toString() == '3')) {
        return (
            <ModRegionsPage></ModRegionsPage>
        )
    }

    return (

        <div>
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

            <Row xs={4} md={4} className='row row-cols-4 g-4'>
                {regions.map((item, index) => (
                    <div className="col-4" key={index} > 
                        <RegionCard {...{
                             imageUrl: (item.ImageName == '' ? '/region_image/empty.webp' : "/region_image/" + item.ImageName?.toString()),
                             regionName: item.Name,
                             pageUrl: window.location.href.split('?')[0] + "region?region_name=" + item.Name
                        }}></RegionCard>
                    </div>
                ))}
            </Row>
            
            

        </div>
        
    )
}

export default RegionsPage