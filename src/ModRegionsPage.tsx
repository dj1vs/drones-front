import { FC, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

import store from "./store/store";
import { getRegions } from "./modules/get-regions";
import { useAppDispatch } from "./store/store";
import cartSlice from "./store/cartSlice";
import RegionsFilter from "./components/RegionsFilter";

import defaultImage from './assets/empty-region.png'

const ModRegionsPage : FC = () => {
    const dispatch = useAppDispatch()

    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const {booked} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)
    
    const [regionsArray, setRegionsArray] = useState<string[][]>([])
    
    useEffect(() =>  {
        const loadRegions = async()  => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString)
            let regionName = urlParams.get('name_pattern')
            let status = urlParams.get('status')
            let district = urlParams.get('district')

            if (regionName == null) {
                regionName = "";
            }
            if (status == null) {
                status = "";
            }
            if (district == null) {
                district = "";
            }
            const result = await getRegions(String(regionName), String(status), String(district))

            var arr: string[][] = []
            for (let region of result.regions) {
                var regionArray:string[] = []
                regionArray.push(region.ImageName.toString())
                regionArray.push(region.ID.toString())
                regionArray.push(region.Name)
                regionArray.push(region.Status)

                arr.push(regionArray)
            }
            setRegionsArray(arr);

        }

        loadRegions()

    }, [])

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableBooked())
    }

    const addRegionToCard = (regionName: string) => {
        dispatch(cartSlice.actions.addRegion(regionName))
    }

    if (!userToken || !userRole || (userRole?.toString() != '2' && userRole?.toString() != '3') ) {
        return (
            <>
                <p>У вас недостатоно прав для просмотра данной страницы.</p>
            </>
        )
    }
    return (
        <>
            <Modal show = {booked} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Район добавлен в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {dispatch(cartSlice.actions.disableBooked())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Районы</h1>
            <RegionsFilter></RegionsFilter>
            <Table>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Изображение</th>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Статус</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {regionsArray.map((rowContent, rowID) => (
                        <tr key={rowID}>
                            <td>
                                <img 
                                    src={(rowContent[0] == '' ? defaultImage.toString() : "/region_image/" + rowContent[0])}
                                    style={{width: '100px'}}
                                />
                            </td>
                            {rowContent.slice(1).map((val, rowID) => (

                                <td key={rowID + 1}>{val}</td>
                            ))
                            }
                            <td>
                                <Button href={"/drones-front/region_edit?name=" + rowContent[2]}>
                                    Изменить
                                </Button>
                            </td>
                            <td>
                                <Button variant="success" onClick={() => {addRegionToCard(rowContent[2])}}>В полёт</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )
}

export default ModRegionsPage;