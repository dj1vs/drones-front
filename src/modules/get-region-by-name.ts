export interface Region {
    id: number,
    district: string,
    name: string,
    details: string,
    status: string,
    areaKm: string,
    population: number,
    headName: string,
    headEmail: string,
    headPhone: string,
    AverageHeightM: number,
    image: string 
}

export interface RegionResult {
    resultCount: number
    results: Region[]
}

export const getRegionByName = async  (name = ''): Promise<RegionResult> => {
    return fetch('127.0.0.1:8000/region', {
        method: 'GET',
        body: JSON.stringify({name: {name}})
    })
           .then((response) => response.json())
           .catch(() => ({resultCount:0, results:[]}))
}