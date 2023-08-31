/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import {useEffect, useState} from "react";
import {LMSService} from "../../services/lmsService/LMSService";
/**
 * @deprecated
 * @param token - user session token JWT
 * @return {{lmsLogin: {}, loading: boolean}}
 */
export default function useLMSLogin(token){

    const [loading, setLoading] = useState(true)
    const [lmsLogin, setLMSLogin] = useState({})

    useEffect(() => {

        const login = async() => {
            try{

               // const { data, status } = await LMSService.login(token)

               // console.log(data, status)

            }catch (error){
                console.log(`Error on login LSM Hook: ${error}`)
            }finally {
                setLoading(false)
            }
        }

        login()

    }, [])

    return {lmsLogin, loading}
}