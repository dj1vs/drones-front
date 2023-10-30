import {FC} from 'react'
import {Button, Card} from 'react-bootstrap'
import './RegionCard.css'

interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
}

const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl }) => (
    <Card className='card'>
        <Card.Img className="cardImage" variant="top" src={"data:image/jpg;base64, " + imageUrl}/>
        <Card.Body>
            <div className='textStyle'>
                <Card.Title> {regionName} </Card.Title>
            </div>
        <Button className='cardButton' href={pageUrl}> Подробнее </Button>
        </Card.Body>
    </Card>
)

export default RegionCard;