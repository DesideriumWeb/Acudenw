/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {useEffect, useState} from "react";
import {NewsService} from "../../services/newsServices/NewsService";
import {HTTP} from "../../config/config";

/**
 * Custom hook for fetching news data.
 * This hook will fetch the data from the NewsService using given pagination parameters,
 * and return the fetched data.
 *
 * @param {number} currentPaginationIndex - The current pagination index or page number, default is 0.
 * @param {number} displayPerPage - The number of items to be displayed per page, default is 10.
 * @returns {object} The fetched news data.
 */
export default function useNews(currentPaginationIndex = 0, displayPerPage = 10) {

    // State variable to hold the news data
    const [news, setNews] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [inError, setInError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    // Variables to hold the default news and news list
    let newsDefault = null;
    let newsList = [];

    useEffect(() => {

        try {

            setSpinnerLoading(true)

            // Function to fetch news from the NewsService
            const getNews = async () => {
                // Fetch the news data with the current pagination parameters
                const {data, status} = await NewsService.getAll({
                    pageNumber: currentPaginationIndex,
                    pageSize: displayPerPage
                })

                if(status === HTTP.OK)
                {
                    // Update the state variables with the fetched data
                    setNews(data.data.news)
                    setTotalPages(data.data.totalPages)
                    setTotalElements(data.data.totalElements)
                }
                else
                {
                    setInError(true)
                    setErrorMsg("Lo sentimos, no se han encontrado noticias. Por favor, inténtelo de nuevo.")
                }

                //Update loading on finish
                setIsLoading(false)
                setSpinnerLoading(false)
            }

            // Call the function to fetch news
            getNews()
        }
        catch (error)
        {
            setErrorMsg("Se ha producido un error, trate nuevamente.")
            setInError(true)
            setIsLoading(false)
            setSpinnerLoading(false)
        }

        // Re-run the effect when the pagination parameters change
    }, [currentPaginationIndex, displayPerPage])

    // Extract the first element of news and assign the rest to newsList
    if (news.length > 0) {
        [newsDefault, ...newsList] = news;
    }

    // Return the fetched news data, default news and news list & totals
    return {news, newsDefault, newsList, totalElements, totalPages, isLoading, spinnerLoading, inError, errorMsg}
}

