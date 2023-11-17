import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './BreadcrumbPage.css'

function BreadcrumbsPage() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const region_name = urlParams.get('region_name')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {region_name != null && 
            <Breadcrumb.Item href = {window.location.search}>{region_name}</Breadcrumb.Item>
            }
        </Breadcrumb>
    );
}

export default BreadcrumbsPage;