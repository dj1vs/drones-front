import {FC, useEffect, useState} from 'react'
import './RegionPage.css'
import {Region, getRegionByName } from './modules/get-region-by-name'

const RegionPage: FC = () => {

    const [region, setRegion] = useState<Region>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('region_name')
    
        const getRegion = async () => {
            const result = await getRegionByName(String(regionName))
            console.log(result)
            setRegion(result)
        }
    
        getRegion()

    }, []);
    
    return (
        <div>
            <img src={"data:image/jpg;base64, " + region?.Image} className="card_image" />
            <p>{region?.Details}</p>
            <p className="region_line"><b>Статус района: {region?.Status}</b></p>
            <p className="region_line"> Площадь: {region?.AreaKm} км^2</p>
            <p className="region_line"> Население: {region?.Population} чел.</p>
            <p className="region_line"> Глава управы: {region?.HeadName}</p>
            <p className="region_line"> Email главы управы: {region?.HeadEmail}</p>
            <p className="region_line"> Телефон главы управы: {region?.HeadPhone}</p>
            <p className="region_line"> Средняя высота: {region?.AverageHeightM}</p>
            <p className="region_line">Описание района: {region?.Details}</p>
            <form method="POST" action="delete_region/{{ .Name }}" name="delete_region">
                <input type="hidden" name="card_title" id="card_title" value="{{ .Name }}" />
                <input type="submit" className="button page_button" value="Сменить статус" />
            </form>
            <a className="button page_button" href="..">Домой</a>
        </div>
    )
}

export default RegionPage