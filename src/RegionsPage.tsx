import {FC, useEffect, useState} from 'react'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { getRegions } from './modules/get-regions';

import { Col, Row} from 'react-bootstrap'
import RegionCard from './components/RegionCard';

import defaultImage from './assets/react.svg'

const RegionsPage: FC = () => {

    const [regions, setRegions] = useState<Region[]>([])

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

    return (
        <div>
            <div>
                <form method="GET" action="" name="search">
                <input type="text" id="region_search" name="name_pattern"/>
                <input type="submit" className="button" value="Поиск" ></input>
                </form>
            </div>

            <Row xs={5} md={5} className='g-5' >
                {regions.map((item, index) => (
                    <Col key={index}> 
                        <RegionCard {...{
                             imageUrl: (item.ImageName == '' ? defaultImage?.toString() : "http://127.0.0.1:9000/regionimages/" + item.ImageName?.toString()),
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