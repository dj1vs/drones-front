import {Region, Flight} from './ds'
import axios from 'axios';

export interface GetRegionsResponse {
    regions: Region[],
    draft_flight: Flight,
}

export const getRegions = async (userToken = '', namePattern = '', status='', district='') : Promise<GetRegionsResponse> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
    }

    const offline_regions: Region[] =  [
        {
            ID: 1,
            District: "ЮАО",
            Name: "Зябликово",
            Details: "Район на юго-востоке Москвы, в Южном административном округе, и одноимённый муниципальный округ. Район и муниципальное образование названы по бывшей деревне Зябликово, включённой в состав Москвы в 1960 году.",
            Status: "Действует",
            AreaKm: '4.3795',
            Population: 133651,
            HeadName: "Князев Константин Игоревич",
            HeadEmail: "sozbk@uao.mos.ru",
            HeadPhone: "8 499 725 43 94",
            AverageHeightM: 174,
            ImageName: "zyablikovo.png"
        },
        {
            ID: 2,
            District: "ВАО",
            Name: "Богородское",
            Details: "Район в Восточном административном округе города Москвы, а также одноимённое внутригородское муниципальное образование.",
            Status: "Действует",
            AreaKm: '10.24',
            Population: 108657,
            HeadName: "Ланько Елена Борисовна",
            HeadEmail: "vao-bog@mos.ru",
            HeadPhone: "8(499)162-52-61",
            AverageHeightM: 156,
            ImageName: "bogorodskoye.png"
        },
        {
            ID: 3,
            District: "ЮВАО",
            Name: "Капотня",
            Details: "район, расположенный в Юго-Восточном административном округе и соответствующее ему одноимённое внутригородское муниципальное образование в городе Москве. В течение долгого времени считался самым экологически неблагоприятным районом Москвы из-за нахождения тут Московского нефтеперерабатывающего завода, который в 2011 начал проведение масштабной экологической модернизации",
            Status: "Действует",
            AreaKm: '8.06',
            Population: 32717,
            HeadName: "Орешкин Никита Александрович",
            HeadEmail: "Uprava-Kapotnya@mos.ru",
            HeadPhone: "8 (495) 355-19-01",
            AverageHeightM: 83,
            ImageName: "kapotnya.png"
        },];

    return axios.get(
        '/api/regions?name_pattern=' + String(namePattern) + '&status=' + String(status) + '&district=' + String(district),
        config
        )
        .then((response) => response.data)
        .catch(() => {
            let result_regions : Region[] = []
            for (const region of offline_regions) {
                if (region.Name.toLowerCase().indexOf(namePattern.toLowerCase()) == -1) {
                    continue;
                }

                if (status != '' && region.Status != status) {
                    continue;
                }

                if (district != '' && region.District.toLowerCase().indexOf(district.toLowerCase()) == -1) {
                    continue;
                }
                
                result_regions.push(region);
            }

            return {
                "regions" : result_regions
            }
        })
}