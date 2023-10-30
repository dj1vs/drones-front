import {FC, useEffect, useState} from 'react'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { getRegions } from './modules/get-regions';

import { Card, Col, Row} from 'react-bootstrap'
import RegionCard from './components/RegionCard';


const RegionsPage: FC = () => {

    const [regions, setRegions] = useState<Region[]>([])

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        var regionName = urlParams.get('region_name')
        if (regionName == null) {
            regionName = "";
        }

        const loadRegions = async()  => {
            const result = await getRegions(String(regionName))
            setRegions(result)

        }

        loadRegions()

    }, []);

    let i = 0
    while (i < regions.length) {
        console.log(regions[i].Image)

        i = i + 1;
    }

    return (
        <div>
            <div>
                <form method="GET" action="" name="search">
                <label htmlFor="">Введите название:</label>
                <input type="text" id="region_search" name="region_name"/>
                <input type="submit" className="button" value="Поиск" ></input>
                </form>
            </div>

            <Row xs={4} md={4} className='g-4'>
                {regions.map((item, index) => (
                    <Col key={index}>
                        <RegionCard {...{
                             imageUrl: item.Image,
                             regionName: item.Name,
                             pageUrl: window.location.href + "region?region_name=" + item.Name
                        }}></RegionCard>
                    </Col>
                ))}
            </Row>
            
            

        </div>
        
    )
}

export default RegionsPage