import axios, { AxiosResponse } from "axios";

export const sendImage = async (userToken = '', region_id: string, file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('Authorization', 'Bearer ' + userToken)
    

    return axios.post(
        `/api/region/add_image/` + region_id,
        formData
    )
    .then((response) => response.data) 

}