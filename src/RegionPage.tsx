import {FC, useEffect, useState} from 'react'
import './RegionPage.css'
import {getRegionByName } from './modules/get-region-by-name'
import {Region} from './modules/ds'

const RegionPage: FC = () => {

    const [region, setRegion] = useState<Region>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('region_name')
    
        const loadRegion = async () => {
            const result = await getRegionByName(String(regionName))
            setRegion(result)
        }
    
        loadRegion()

    }, []);
    
    return (
        <div>
            <img src={"data:image/jpg;base64, " + region?.Image} className="card-img-top" />
            <p>{region?.Details}</p>
            <p className="region_line"><b>Статус района: {region?.Status}</b></p>
            <p className="region_line"> Площадь: {region?.AreaKm} км^2</p>
            <p className="region_line"> Население: {region?.Population} чел.</p>
            <p className="region_line"> Глава управы: {region?.HeadName}</p>
            <p className="region_line"> Email главы управы: {region?.HeadEmail}</p>
            <p className="region_line"> Телефон главы управы: {region?.HeadPhone}</p>
            <p className="region_line"> Средняя высота: {region?.AverageHeightM}</p>
            <p className="region_line">Описание района: {region?.Details}</p>
            <a className="button page_button" href="..">Домой</a>
        </div>
    )
}

export default RegionPage