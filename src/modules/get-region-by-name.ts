export interface Region {
    ID: number,
    District: string,
    Name: string,
    Details: string,
    Status: string,
    AreaKm: string,
    Population: number,
    HeadName: string,
    HeadEmail: string,
    HeadPhone: string,
    AverageHeightM: number,
    Image: string 
}

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