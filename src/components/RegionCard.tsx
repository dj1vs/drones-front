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

    return (
        <Card style={{width:'250px'}}>
            <Card.Img className="img-fluid" style={{ width: '225px', height: '250px' }} variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'> {regionName} </Card.Title>
                <ButtonGroup className='text-center'>
                    <Button variant="info" href={pageUrl}>Подробнее</Button>
                    {((userRole?.toString() == '2') || (userRole?.toString() == '3')) && 
                        <Button variant="warning" href={"/drones-front/region_edit?name=" + regionName}>Изменить</Button>
                    }
                    <Button variant="success" onClick={addRegionToCard}>В полёт</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
    )
    
    }

export default RegionCard;