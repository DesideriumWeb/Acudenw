/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import axios from "axios";
import {AuthToken} from "./AuthToken";
import {RefreshToken} from "./RefreshToken";

 export const ApiUrl = "https://acudenqs-api.inprende.com/api/v1/";
export const UploadFile = "/uploadfile"
export const authLogin = "auth/login";
export const refreshToken = "auth/refreshtoken";
export const CMSTown = "cms/town";
export const CMSProviderCategory = "cms/providercategory/";
export const ServiceCategory = "cms/servicecategory/";
export const UserCommunityServicePath = "community/";
export const EducationServicePath = 'education'
export const CertificatesServicePath = 'certificates'
export const UserProviderService = "cms/provider/register";
export const UserProviderList = "cms/provider/list";
export const UserProviderByStatus = "cms/provider/status";
export const ProviderProfilePath = "cms/provider/profile"
export const UserEmployeeService = "employee/";
export const UserWorkExperienceService = "work-experience/";
export const AddWorkExperienceServicePath = 'work-experience'
export const ProviderEmployeeService = 'cms/provider/employees'
export const ProviderRemoveEmployeeService = 'cms/provider/employee'
export const ProviderEmployeesService = 'cms/provider/employee/'
export const OTPProcess = "otp/process"
export const AllUserService = "user/"
export const UserAddNotificationService = "user/addnotification"
export const NewsServices = 'cms/news/'
export const InvitationsPath = 'invitations/'
export const InvitationRefuse = "invitations/refuse"
export const NotificationServices = 'notification/'
export const CalendarServicePath = 'cms/event'
export const CalendarUserServicePath = 'cms/event/user'
export const GalleryServicePath = 'gallery/'
export const LibraryServicePath = 'cms/libraryitems'
export const AplicationServicePath = '/accesa/application'
export const CDFServicePath = 'cdf/'
export const LMSServicePath = 'lms/'
export const IsPeriodOpenServicePath = '/accesa/application/period/validate'
export const EmployeeApplicationsServicePath = '/accesa/application/employee'
export const AmendmentEmployeeApplicationsServicePath = '/accesa/amendment/application'
export const EmployeeApplicationsDocumentsServicePath = '/accesa/application/document/upload'
export const EmployeeApplicationsDocumentsByIdServicePath = '/accesa/application/documents'
export const IdDocumentRequired = '/accesa/application/file'
export const AmendmentMyRequestAccesaAplicationServicePath = '/accesa/amendment'
export const HelpCenterFrequentQuestionsServicePath = '/cms/faq/list'

//TODO Validate application storage... valid URL - lcn 06/28/2023
export const ApplicationStoragePath = "http://acuden-userapp-qa.s3-website.us-east-2.amazonaws.com/"
export const axiosInstance = axios.create({
    baseURL: ApiUrl
})

axiosInstance.interceptors.request.use(
    async function (options) {

        let token = AuthToken.get()
        // Exception cases
        if (
            options.url.toLowerCase().includes("login")
            || options.url.toLowerCase().includes("refresh")
            || options.url.toLowerCase().includes('/employee/invitation/')
        ) {
            return options
        }

        if (!!token) {
            // if (shouldRefreshToken(token)) {
            //     const {data} = await axios.post(ApiUrl + refreshToken, {
            //         refreshToken: RefreshToken.get()
            //     })
            //     AuthToken.set(data.accessToken)
            //     RefreshToken.set(data.refreshToken)
            //     options.headers.Authorization = `Bearer ${data.accessToken}`
            //     return options
            // }
        }

        if (token && options?.headers) {
            options.headers.Authorization = `Bearer ${token}`
        }

        return options
    },
    function (error) {
        console.log("Request Error: ", error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(response => {
    return response
}, async error => {

    if (error && error?.response?.status === 401) {
        AuthToken.clear()
        RefreshToken.clear()
        // window.location.reload()
    }
    return Promise.reject(error)
})
