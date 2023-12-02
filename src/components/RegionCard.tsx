import {FC} from 'react'
import {Button, Card} from 'react-bootstrap'
import './RegionCard.css'

interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
}



const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl}) => {

    const deleteRestoreRegion = async () => {
        await fetch('/api/region/delete_restore/' + regionName, {
            method: 'PUT'
        });
        window.location.replace('/')
    }

    return (
        <Card>
            <Card.Img className="card-img-top" variant="top" src={imageUrl}/>
            <Card.Body>
                <div className='textStyle'>
                    <Card.Title> {regionName} </Card.Title>
                </div>
            </Card.Body>
            <Card.Footer>
                <div className="btn-wrapper text-center d-flex justify-content-between">
                    <Button variant="secondary" href={pageUrl}>Подробнее</Button>
                    <Button variant="warning" onClick={deleteRestoreRegion}>Изменить статус</Button>
                </div>
            </Card.Footer>
        </Card>
        
    )
    
    }

export default RegionCard;