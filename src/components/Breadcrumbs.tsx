import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const region_name = urlParams.get('region_name')
    const name_pattern = urlParams.get('name_pattern')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Домашняя страница</Breadcrumb.Item>
            {(region_name != null && name_pattern === null) && 
                <>
                    <Breadcrumb.Item active> Район </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{region_name}</Breadcrumb.Item>
                </>
            }
            {(name_pattern != null && region_name === null) &&
                <>
                    <Breadcrumb.Item active> Поиск </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{name_pattern}</Breadcrumb.Item>
                </>

            }
        </Breadcrumb>
    );
}

export default Breadcrumbs;