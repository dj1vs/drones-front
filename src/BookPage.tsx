import { FC } from "react";
import store from "./store/store";
import {useSelector } from "react-redux/es/hooks/useSelector";

const BookPage: FC = () => {
    const {regions} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)
    console.log(regions)

    return (
        <>
        <p>{regions}</p>
        </>
    )

}

export default BookPage;