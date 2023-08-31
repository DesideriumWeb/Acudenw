/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, ProviderEmployeesService} from '../ApiRest';

export default class ProviderService {

    static async getEmployeeDetail(id){
        //TODO Need end point...
        const {
            data,
            status
        } = await axiosInstance.get(`employee/${id}/profile`)
        return {data, status}
    }
}