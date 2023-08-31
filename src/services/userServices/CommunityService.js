import axios from 'axios';
import {ApiUrl, UserCommunityServicePath} from 'services/ApiRest';

export default class CommunityService {
    
  
    getAll(){
        return axios.get(ApiUrl + UserCommunityServicePath ).then(res => res.data);
    }

    get(id) {
        return axios.get(ApiUrl + UserCommunityServicePath  +id).then(res => res.data);
    }

    save(CommunityUser) {
        return axios.post(ApiUrl + UserCommunityServicePath + "register", CommunityUser).then(res => res.data);
    }

    delete(id) {
        return axios.delete(ApiUrl + UserCommunityServicePath +id).then(res => res.data);
    }
}