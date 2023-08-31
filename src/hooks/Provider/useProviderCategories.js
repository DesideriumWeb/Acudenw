/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import {useEffect, useState} from "react";
import {Session} from "../../services/Session";
import {HTTP} from "../../config/config";
import ProviderCategoryService from "../../services/cmsServices/ProviderCategoryService";

/**
 * Custom hook to manage provider categories data.
 *
 * This hook initializes with provider categories data from the session and updates it with the response of an asynchronous API call to get all provider categories, if it is not already available.
 *
 * @returns {Object} An object with 'categories' data as an array and a 'loading' boolean.
 */
export default function useProviderCategories(){

    const [loading, setLoading] = useState(true);
    const [categories = [], setCategories] = useState(Session.getProviderCategories());

    useEffect(() => {
       const fetchData = async () => {

           if(!categories){
               try {

                   const {data, status} = await ProviderCategoryService.getAll();

                   if(status === HTTP.OK){

                       Session.storeProviderCategories(data.data)
                       setCategories(data.data)
                   }

               }catch (error){
                   //TODO handle error...
                   console.log(error);
               }
           }
           setLoading(false);
       };

       fetchData();

    }, []);

    /**
     * The hook returns the categories data & loading status.
     */
    return {categories, loading}
}