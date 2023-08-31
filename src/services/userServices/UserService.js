/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import axios from 'axios';
import {
    ApiUrl,
    AllUserService,
    axiosInstance,
    authLogin,
    OTPProcess,
    refreshToken as refreshTokenURL,
    UserAddNotificationService
} from '../ApiRest';
import { RefreshToken } from "../RefreshToken";
import {HTTP} from "../../config/config";

export default class UserService {

    static async getAll() {
        return axios.get(ApiUrl + AllUserService).then(res => res.data);
    }

    static async get(id) {
        return axios.get(ApiUrl + AllUserService + id).then(res => res.data);
    }

    static async save(CommunityUser) {
        return axios.post(ApiUrl + AllUserService + "register", CommunityUser).then(res => res.data);
    }

    static async refreshToken() {
        const refreshToken = RefreshToken.get()
        const { data } = await axiosInstance.post(refreshTokenURL, {
            refreshToken
        })
        return data
    }

    static async post(email) {
        const {
            data,
            status
        } = await axiosInstance.post(AllUserService + "validate", { email })
        return { data, status }
    }

    static async logIn(form) {
        try {
            const { data, status } = await axiosInstance.post(authLogin, {
                ...form
            })
            return { data, status }
        } catch (error) {
            return { status: false, data: {} }
        }
    }

    async requestResetPassword(email) {
        const {
            data,
            status
        } = await axiosInstance.post("forgot_password", email)
        return { data, status }
    }

    async emailChangeRequest(email) {
        const { data, status } = await axiosInstance.post(AllUserService + "new-email", email)
        return { data, status }
    }

    async updatePassword(form) {
        const { data, status } = await axiosInstance.put(AllUserService + "password", form)
        return { data, status }
    }

    async requestPasswordRecovery(token, form) {
        const {
            data,
            status
        } = await axiosInstance.post(`reset_password/${token}`, form)
        return { data, status }
    }

    static async logInOTP(token) {
        const { data } = await axiosInstance.get(OTPProcess + token)
        return data
    }

    static async delete(id) {
        return axios.delete(ApiUrl + AllUserService + id).then(res => res.data);
    }
    /**
     * Updates a notification.
     * @param {Object} notification - The notification object to be updated.
     * @returns {Object} - The response data and status.
     */
    static async updateNotification(notification = {}){
        try
        {
            const {data, status} = await axiosInstance.post(UserAddNotificationService, notification);
            return {data, status}
        }
        catch (error)
        {
            console.log(error)
            return {data:null, status:HTTP.INTERNAL_ERROR}
        }
    }
}
