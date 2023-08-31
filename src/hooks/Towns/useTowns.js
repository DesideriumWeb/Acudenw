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
import TownService from "../../services/cmsServices/TownService";
import {HTTP, TOWNS} from "../../config/config";

/**
 * Custom hook to manage towns data.
 *
 * This hook initializes with towns data from the session and updates it with the response of an asynchronous API call to get all towns, if it is not already available.
 *
 * @returns {Object} An object with 'towns' data as an array and a 'loading' boolean.
 */
export default function useTowns() {

    const [loading, setLoading] = useState(true);
    const [towns= [], setTowns] = useState(Session.getTowns());

    useEffect(() => {
        const fetchData = async () => {

            if (!towns) {

                try {

                    const { data, status } = await TownService.getAll();

                    if (status === HTTP.OK) {
                        Session.storeTowns(data.data);
                        setTowns(data.data);
                    }
                } catch (error) {
                    Session.storeTowns(TOWNS.TOWNS_JSON);
                    setTowns(TOWNS.TOWNS_JSON);
                }
            }
            setLoading(false);
        };

        fetchData();

    }, []);

    /**
     * The hook returns the towns data & loading status.
     */
    return { towns, loading };
}
