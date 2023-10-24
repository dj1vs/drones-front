import {FC} from 'react'
import './RegionsPage.css'

const RegionsPage: FC = () => {
    return (
        <div>
            <form method="GET" action="region" name="search">
            <label htmlFor="region_name">Введите название:</label>
            <input type="text" id="region_name" name="region_name"/>
            <input type="submit" className="button" value="Поиск" ></input>
            </form>
        </div>
    )
}

export default RegionsPage