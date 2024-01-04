import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const region_name = urlParams.get('region_name')
    const name_pattern = urlParams.get('name_pattern')
    const name = urlParams.get('name')
    const flight_id = urlParams.get('flight_id')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/drones-front/">Домашняя страница</Breadcrumb.Item>
            {window.location.pathname == '/drones-front/auth' &&
                <Breadcrumb.Item>Вход</Breadcrumb.Item>
            }
            {window.location.pathname == '/drones-front/account' &&
                <Breadcrumb.Item>Аккаунт</Breadcrumb.Item>
            }
            {window.location.pathname == '/drones-front/flights' &&
                <Breadcrumb.Item>Полёты</Breadcrumb.Item>
            }
            {(region_name != null && name_pattern === null) || (name != null) && 
                <>
                    <Breadcrumb.Item active> Район </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{region_name ? region_name : name}</Breadcrumb.Item>
                </>
            }
            {(name_pattern != null && region_name === null) &&
                <>
                    <Breadcrumb.Item active> Поиск </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{name_pattern}</Breadcrumb.Item>
                </>
            }
            { (flight_id) &&
                <>
                    <Breadcrumb.Item active> Заявка </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{flight_id}</Breadcrumb.Item>
                </>
            }
            {window.location.pathname == '/drones-front/book' &&
                <Breadcrumb.Item>Бронирование</Breadcrumb.Item>
            }
        </Breadcrumb>
    );
}

export default Breadcrumbs;