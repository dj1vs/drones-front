import {Region} from './ds'
import axios from 'axios';

import kapotnyaImage from '../assets/kapotnya.jpg'
import bogorodskoyeImage from '../assets/bogorodskoye.jpg'
import zyablikovoImage from '../assets/zyablikovo.jpg'

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
        .catch(() => {
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
                    ImageName: zyablikovoImage?.toString()
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
                    ImageName: bogorodskoyeImage?.toString()
                },
                {
                    ID: 3,
                    District: "ЮВАО",
                    Name: "Капотня",
                    Details: "Район, расположенный в Юго-Восточном административном округе и соответствующее ему одноимённое внутригородское муниципальное образование в городе Москве. В течение долгого времени считался самым экологически неблагоприятным районом Москвы из-за нахождения тут Московского нефтеперерабатывающего завода, который в 2011 начал проведение масштабной экологической модернизации",
                    Status: "Действует",
                    AreaKm: '8.06',
                    Population: 32717,
                    HeadName: "Орешкин Никита Александрович",
                    HeadEmail: "Uprava-Kapotnya@mos.ru",
                    HeadPhone: "8 (495) 355-19-01",
                    AverageHeightM: 83,
                    ImageName: kapotnyaImage?.toString()
                },];
        
                for (let region of offline_regions) {
                    if (regionName == region.Name) {
                        return region
                    }
                }
            });
}
