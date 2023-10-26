import {FC, useEffect} from 'react'
import './RegionsPage.css'

const RegionsPage: FC = () => {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('region_name')

        console.log(regionName)
    }, []);

    return (
        <div>
            <form method="GET" action="region_search" name="search">
            <label htmlFor="region_name">Введите название:</label>
            <input type="text" id="region_name" name="region_name"/>
            <input type="submit" className="button" value="Поиск" ></input>
            </form>
        </div>
    )
}

export default RegionsPage