import axios from 'axios';
import { ApiUrl, CMSTown, axiosInstance } from '../ApiRest';

export default class TownService {
  
    // getAll(){
    //     return axios.get(ApiUrl + CMSTown ).then(res => res.data);
    // }

    static async getAll(){
        const {
            data,
            status
        } = await axiosInstance.get(CMSTown)
        return {data, status}
    }
 
    get(id) {
        return axios.get(ApiUrl + CMSTown  +id).then(res => res.data);
    }

    save(town) {
        return axios.post(ApiUrl + CMSTown, town).then(res => res.data);
    }

    delete(id) {
        return axios.delete(ApiUrl + CMSTown +id).then(res => res.data);
    }
}