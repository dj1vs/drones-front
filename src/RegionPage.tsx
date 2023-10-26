import {FC, useState} from 'react'
import './RegionPage.css'
import {Region, getRegionByName } from './modules/get-region-by-name'

const RegionPage: FC = () => {

    const [region, setRegion] = useState<Region>()
    
    const test = async () => {
        const result = await getRegionByName('Кузьминки')
        setRegion(result)
    }

    test()
    
    return (
        <div>
            <h2> Округ: {region?.Name} </h2>
        </div>
    )
}

export default RegionPage