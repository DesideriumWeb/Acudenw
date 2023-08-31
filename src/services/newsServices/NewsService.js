/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, NewsServices} from "../ApiRest";
import {buildRequestParams} from "../../components/utils";

export class NewsService {
    static async getAll(options = {}) {

        const params = buildRequestParams(options)

        return await axiosInstance.get(NewsServices, {params})
    }

    static async getNewsById(id) {
        const {data} = await axiosInstance.get(`${NewsServices}${id}`)
        return data
    }

    async getNewsImage(id) {
        try{
            const {data} = await axiosInstance.get(`${NewsServices}${id}/image`, {
                responseType:'blob'
            })

            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}
