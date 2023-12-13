import { FC } from "react";
import { FormCheck, FormLabel, Form } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

const RegionsFilter: FC = () => {
    return (
        <>
            <div>
                <form method="GET" action="" name="search">
                <input type="text" id="region_search" name="name_pattern"/>
                <input type="submit" className="button" value="Поиск" ></input>
                </form>
            </div>
            <Form>
                <FormLabel>Статус региона:</FormLabel>
                <FormCheck>
                    <FormCheckInput type="radio" name="flexRadioDefault"></FormCheckInput>
                    <FormLabel>Действует</FormLabel>
                </FormCheck>
                <FormCheck>
                    <FormCheckInput type="radio" name="flexRadioDefault"></FormCheckInput>
                    <FormLabel>Недоступен</FormLabel>
                </FormCheck>
            </Form>
            
        </>
        
    )
}

export default RegionsFilter