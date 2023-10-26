import {Region} from './ds'

export const getRegionByName = async  (regionName = ''): Promise<Region> => {
    return fetch('/api/region/' + String(regionName),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}
