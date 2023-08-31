import { axiosInstance, ServiceCategory } from '../ApiRest';

export default class ServiceCategoryService {

    static async getAll(){
        const {
            data,
            status
        } = await axiosInstance.get(ServiceCategory + "list")
        return {data, status}
    }


} 