import {FC, useEffect, useState} from 'react'
import {Button, Card} from 'react-bootstrap'

import './RegionPage.css'
import defaultImage from './assets/empty-region.png'

import {getRegionByName } from './modules/get-region'
import {Region} from './modules/ds'

const RegionPage: FC = () => {

    const [region, setRegion] = useState<Region>()
    const [imageUrl, setImageUrl] = useState('/drones-front/src/assets/empty-region.png')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('region_name')
    
        const loadRegion = async () => {
            const result = await getRegionByName(String(regionName))
            setRegion(result)

            if (result?.ImageName.toString()) {
                setImageUrl("/region_image/" + result?.ImageName.toString())
            } else {
                setImageUrl(defaultImage?.toString())
            }
        }
    
        loadRegion()

    }, []);
    
    return (
        <div className='card_container'>
            <Card style={{width: '300px'}}>
                <Card.Img src={imageUrl} variant="top" />
                <Card.Body>
                    <p> <b>Статус: {region?.Status}</b></p>
                    <p>Округ: {region?.District}</p>
                    <p> Площадь: {region?.AreaKm} км^2</p>
                    <p> Население: {region?.Population} чел.</p>
                    <p> Глава управы: {region?.HeadName}</p>
                    <p> Email главы управы: {region?.HeadEmail}</p>
                    <p> Телефон главы управы: {region?.HeadPhone}</p>
                    <p> Средняя высота: {region?.AverageHeightM}</p>
                    <p>{region?.Details}</p>
                </Card.Body>
                <Card.Footer>
                    <Button href="/drones-front/">Домой</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default RegionPage