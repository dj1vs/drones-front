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
    console.log(imageUrl)
    const dispatch = useAppDispatch()

    const {userRole, userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const addRegionToCard = () => {
        dispatch(cartSlice.actions.addRegion(regionName))
    }

    return (
        <Card className="rounded border-primary">
            <Card.Img className="card-img" variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'> {regionName} </Card.Title>
                <ButtonGroup className='text-center'>
                    <Button variant="info" href={pageUrl}>Подробнее</Button>
                    { userToken &&
                        <Button variant="success" onClick={addRegionToCard}>В полёт</Button>
                    }
                </ButtonGroup>
            </Card.Body>
        </Card>
        
    )
    
    }

export default RegionCard;