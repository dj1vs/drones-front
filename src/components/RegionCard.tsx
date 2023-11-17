import {FC} from 'react'
import {Button, Card} from 'react-bootstrap'
import './RegionCard.css'

interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
}

const deleteRegion = async (region_name: string) => {
    console.log('/api/region/delete/' + region_name)
    await fetch('/api/region/delete/' + region_name, {
        method: 'PUT'
    });
    window.location.replace('/')
} 

const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl}) => (
    <Card className='card'>
        <Card.Img className="card-img-top" variant="top" src={"data:image/jpg;base64, " + imageUrl}/>
        <Card.Body>
            <div className='textStyle'>
                <Card.Title> {regionName} </Card.Title>
            </div>
        </Card.Body>
        <Card.Footer>
            <div className="btn-wrapper text-center d-flex justify-content-between">
                <Button variant="secondary" href={pageUrl}>Подробнее</Button>
                <Button variant="warning" onClick={(e:any) => deleteRegion(regionName)}> Удалить</Button>
            </div>
        </Card.Footer>
    </Card>
)

export default RegionCard;