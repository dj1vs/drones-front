import {FC, useState} from 'react'

import './RegionsPage.css'

const RegionsPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        await setLoading(true)
        
    }


    return (
        <h1>Тест</h1>
    )
}

export default RegionsPage