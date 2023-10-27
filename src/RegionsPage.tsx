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

    let regionCards = []

    let i = 0
    while (i < regions.length) {
        regionCards.push(RegionCard({
            imageUrl: regions[i].Image,
            regionName: regions[i].Name,
            pageUrl: window.location.href + "/region?region_name=" + regions[i].Name
        }));
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
            

        </div>
        
    )
}

export default RegionsPage