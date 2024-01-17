import {Region} from './ds'
import axios from 'axios';

export const getRegionByName = async  (regionName = ''): Promise<Region> => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.get(
        '/api/region/' + String(regionName),
        config)
        .then((response) => response.data)
        .catch(() => (
            {
                "ID": 1,
                "District": "Неизвестно",
                "Name": "Пустой район",
                "Details": "Не удалось получить данные о районе. Связи с бэкендом нет.",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            }));
}
