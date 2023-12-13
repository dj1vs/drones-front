import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { getRegions } from './modules/get-regions';

import { Col, Row, Modal, Button } from 'react-bootstrap'
import RegionCard from './components/RegionCard';
import RegionsFilter from './components/RegionsFilter';

import store, { useAppDispatch } from './store/store';
import cartSlice from './store/cartSlice';

const RegionsPage: FC = () => {
    const dispatch = useAppDispatch()

    const [regions, setRegions] = useState<Region[]>([])
    const {booked} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        var regionName = urlParams.get('name_pattern')
        if (regionName == null) {
            regionName = "";
        }

        const loadRegions = async()  => {
            const result = await getRegions(String(regionName))
            console.log(result)
            setRegions(result)

        }

        loadRegions()

    }, []);

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableBooked())
    }

    return (

        <div>
            <Modal show = {booked} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Регион добавлен в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {dispatch(cartSlice.actions.disableBooked())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>

            <RegionsFilter></RegionsFilter>
            <p></p>

            <Row xs={4} md={4} className='row row-cols-3 g-4'>
                {regions.map((item, index) => (
                    <Col key={index} > 
                        <RegionCard {...{
                             imageUrl: (item.ImageName == '' ? '/region_image/empty.webp' : "/region_image/" + item.ImageName?.toString()),
                             regionName: item.Name,
                             pageUrl: window.location.href.split('?')[0] + "region?region_name=" + item.Name
                        }}></RegionCard>
                    </Col>
                ))}
            </Row>
            
            

        </div>
        
    )
}

export default RegionsPage