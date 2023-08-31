/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {axiosInstance, CalendarServicePath, CalendarUserServicePath} from "../ApiRest";

export class CalendarService {

    static async getEvents(options = {}) {

        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(options)) {
            params.append(key, value)
        }

       return await axiosInstance.get(CalendarServicePath, {params})
    }

    static async getEventsUser(options = {}) {

        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(options)) {
            params.append(key, value)
        }

        return await axiosInstance.get(CalendarUserServicePath, {params})
    }

    static async registerForEvent(id) {
        return await axiosInstance
            .post(`${CalendarServicePath}/${id}/provider-employee`)
    }
}
