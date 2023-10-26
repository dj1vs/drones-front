import {FC, useEffect, useState} from 'react'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { getRegions } from './modules/get-regions';

import { Card, Col, Row} from 'react-bootstrap'


const RegionsPage: FC = () => {

    const [regions, setRegions] = useState<Region[]>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('region_name')

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
                <label htmlFor="">Введите название:</label>
                <input type="text" id="region_search" name="region_name"/>
                <input type="submit" className="button" value="Поиск" ></input>
                </form>
            </div>
        </div>
        
    )
}

export default RegionsPage