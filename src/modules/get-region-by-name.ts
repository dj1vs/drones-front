import {Region} from './ds'

export const getRegionByName = async  (regionName = ''): Promise<Region> => {
    return fetch('/api/region/' + String(regionName),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch(() => (
            {
                "ID": 1,
                "District": "",
                "Name": "пусто",
                "Details": "Пустой район. Связи с бэкендом нет.",
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
