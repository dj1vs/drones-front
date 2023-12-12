import {FC} from 'react'
import { useSelector } from 'react-redux'
import {Button, ButtonGroup, Card} from 'react-bootstrap'
import store, { useAppDispatch } from '../store/store'

import './RegionCard.css'
import cartSlice from '../store/cartSlice'
interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
}

const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl}) => {
    const dispatch = useAppDispatch()

    const {userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const addRegionToCard = () => {
        dispatch(cartSlice.actions.addRegion(regionName))
    }


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
                    <Button variant="success" onClick={addRegionToCard}>В полёт</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
    )
    
    }

export default RegionCard;