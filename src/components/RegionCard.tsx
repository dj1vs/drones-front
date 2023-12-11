import {FC} from 'react'
import { useSelector } from 'react-redux'
import {Button, ButtonGroup, Card} from 'react-bootstrap'
import store from '../store/store'

import './RegionCard.css'

interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
}

const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl}) => {
    const {userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const deleteRestoreRegion = async () => {
        await fetch('/api/region/delete_restore/' + regionName, {
            method: 'PUT'
        });
        window.location.replace('/')
    }

    return (
        <Card className='w-75 h-100'>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'> {regionName} </Card.Title>
                <ButtonGroup className='text-center'>
                    <Button variant="info" href={pageUrl}>Подробнее</Button>
                    {((userRole?.toString() == '2') || (userRole?.toString() == '3')) && 
                        <Button variant="warning" onClick={deleteRestoreRegion}>Удалить</Button>
                    }
                    <Button variant="success">Бронь</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
    )
    
    }

export default RegionCard;