import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const region_name = urlParams.get('region_name')
    const name = urlParams.get('name')
    const flight_id = urlParams.get('flight_id')

    return (
        <Breadcrumb>
            {(window.location.pathname == "/drones-front/"
            || window.location.pathname == "/drones-front/mod_regions"
            || window.location.pathname == "/drones-front/region"
            || window.location.pathname == "/drones-front/region_edit") &&
                <Breadcrumb.Item href="/drones-front/">Районы</Breadcrumb.Item>
            }
            {(window.location.pathname == "/drones-front/region"
            || window.location.pathname == "/drones-front/region_edit") &&
                <Breadcrumb.Item active>{region_name ? region_name : name}</Breadcrumb.Item>
            }
            
            {window.location.pathname == '/drones-front/auth' &&
                <Breadcrumb.Item>Вход</Breadcrumb.Item>
            }
            {window.location.pathname == '/drones-front/register' &&
                <Breadcrumb.Item>Регистрация</Breadcrumb.Item>
            }

            {window.location.pathname == '/drones-front/account' &&
                <Breadcrumb.Item>Аккаунт</Breadcrumb.Item>
            }
            {(window.location.pathname == '/drones-front/flights'
            || window.location.pathname == '/drones-front/flight'
            || window.location.pathname == '/drones-front/flight_edit') &&
                <Breadcrumb.Item href="/drones-front/flights">Полёты</Breadcrumb.Item>
            }
            {(window.location.pathname == '/drones-front/flight'
            || window.location.pathname == '/drones-front/flight_edit') &&
                <Breadcrumb.Item active>{flight_id}</Breadcrumb.Item>
            }
            {window.location.pathname == '/drones-front/book' &&
                <Breadcrumb.Item>Корзина</Breadcrumb.Item>
            }
        </Breadcrumb>
    );
}

export default Breadcrumbs;