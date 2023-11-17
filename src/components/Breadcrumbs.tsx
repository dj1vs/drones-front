import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const region_name = urlParams.get('region_name')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Домашняя страница</Breadcrumb.Item>
            {region_name != null && 
                <>
                    <Breadcrumb.Item active> Район </Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{region_name}</Breadcrumb.Item>
                </>
            }
        </Breadcrumb>
    );
}

export default Breadcrumbs;