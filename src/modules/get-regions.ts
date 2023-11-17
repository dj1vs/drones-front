import {Region} from './ds'

export const getRegions = async (namePattern = '') : Promise<Region[]> => {
    return fetch('/api/regions?name_pattern=' + String(namePattern))
        .then((response) => response.json())
        .catch(() => ({ resultCount: 2, results:[{Name: 'test-region-1'}, {Name: 'test-region-2'}]}));
}