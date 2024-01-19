import {FC} from 'react'
import { useSelector } from 'react-redux'
import {Button, ButtonGroup, Card} from 'react-bootstrap'
import store, { useAppDispatch } from '../store/store'

import { addRegionToDraft } from '../modules/add-region-to-draft'

import './RegionCard.css'
import cartSlice from '../store/cartSlice'
interface Props {
    imageUrl: string
    regionName: string
    pageUrl: string
    regionID: number
}

const RegionCard: FC<Props> = ({ imageUrl, regionName, pageUrl, regionID}) => {
    const dispatch = useAppDispatch()

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const addRegionToCard = () => {
        if (!userToken) {
            return;
        }
        dispatch(cartSlice.actions.addRegion(regionName))
        addRegionToDraft(userToken, regionID)
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