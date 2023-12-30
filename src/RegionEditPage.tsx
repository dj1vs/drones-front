import { FC, useEffect, useState, useRef } from "react";
import { Card, Form, FormGroup, FormSelect, FormControl, Button, Modal, Row, Col } from "react-bootstrap";
import { Region } from "./modules/ds";
import { getRegionByName } from "./modules/get-region";
import { useSelector } from "react-redux/es/hooks/useSelector";
import store from "./store/store";
import { editRegion } from "./modules/edit-region";

const RegionEditPage: FC = () =>{
    const districtRef = useRef<any>(null)
    const detailsRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const areaRef = useRef<any>(null)
    const populationRef = useRef<any>(null)
    const headNameRef = useRef<any>(null)
    const headEmailRef = useRef<any>(null)
    const headPhoneRef = useRef<any>(null)
    const averageHeightRef = useRef<any>(null)
    const imageNameRef = useRef<any>(null)

    const [region, setRegion] = useState<Region>()

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const regionName = urlParams.get('name')

        const loadRegion = async () => {
            const result = await getRegionByName(String(regionName))
            setRegion(result)
        }

        loadRegion()
        
    }, [])

    const sendChanges = async () => {
        if (!userToken || region?.ID == undefined) {
            return;
        }

        var district = districtRef.current.value
        var details = detailsRef.current.value
        var area = areaRef.current.value
        var population = populationRef.current.value
        var headName = headNameRef.current.value
        var headPhone = headPhoneRef.current.value
        var headEmail = headEmailRef.current.value
        var averageHeight = averageHeightRef.current.value
        var imageName = imageNameRef.current.value
        var status = statusRef.current.value

        const editResult = await editRegion(userToken,
            {
                ID: region?.ID,
                District: district ? district : region?.District,
                Details: details ? details : region?.Details,
                AreaKm: area ? area : region?.AreaKm,
                Population: population ? population : region?.Population,
                HeadName: headName ? headName : region?.HeadName,
                HeadPhone: headPhone ? headPhone : region?.HeadPhone,
                HeadEmail: headEmail ? headEmail : region?.HeadEmail,
                AverageHeightM: averageHeight ? averageHeight : region?.AverageHeightM,
                ImageName: imageName ? imageName : region?.ImageName,
                Name: region?.Name,
                Status: status ? status : region?.Status
            });
        if (editResult.status == 201) {
            setShowSuccess(true);
        } else {
            setShowError(true);
        }
    }

    const handleErrorClose= () => {
        setShowError(false)
    }
    const handleSuccessClose = () => {
        setShowSuccess(false)
    }

    return (
        <>
            <Modal show = {showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Произошла ошибка, регион не был обновлён</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование региона прошло успешно!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{width: '500px'}}>
            
            <h1>Редактирование региона</h1>
            <Card.Img
                src={(region?.ImageName == '' ? '/region_image/empty.webp' : "/region_image/" + region?.ImageName)}
                variant="top"
                />
            <Form>
            <h2>{region?.Name}</h2>
                <FormGroup>
                    <label htmlFor="status">Статус</label>
                    <FormSelect id="status" defaultValue={region?.Status} ref={statusRef}>
                        <option>Действует</option>
                        <option>Недоступен</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="district">Округ</label>
                    <FormControl id="district" defaultValue={region?.District} ref={districtRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="details">Описание</label>
                    <FormControl id="details" defaultValue={region?.Details} ref={detailsRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="area">Площадь (км)</label>
                    <FormControl id="area" defaultValue={region?.AreaKm} ref={areaRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="population">Население</label>
                    <FormControl id="population" defaultValue={region?.Population} ref={populationRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="headName">Глава управы</label>
                    <FormControl id="headName" defaultValue={region?.HeadName} ref={headNameRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="headPhone">Телефон главы управы</label>
                    <FormControl id="headPhone" defaultValue={region?.HeadPhone} ref={headPhoneRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="headEmail">Почта главы управы</label>
                    <FormControl id="headEmail" defaultValue={region?.HeadEmail} ref={headEmailRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="averageHeight">Средняя высота (М)</label>
                    <FormControl id="averageHeight" defaultValue={region?.AverageHeightM} ref={averageHeightRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <label htmlFor="imageName">Изображение</label>
                        </Col>
                        <Col>
                            <input id="imageName" defaultValue={region?.ImageName} ref={imageNameRef} type="file"  accept="image/*"></input>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
            <Button onClick={sendChanges}>Сохранить изменения</Button>
            <p></p>
            <Button href='/drones-front/'>Домой</Button>
            <p></p>

        </div>
        </>
        
    )
}

export default RegionEditPage;