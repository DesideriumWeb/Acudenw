/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {formatDateToSpanishWords} from "../../components/utils";
import {BsChevronRight} from "react-icons/bs";
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {PORTAL_ROUTES} from "../../config/config";
import ReadMore from "./ReadMore";

/**
 * Renders the NewsBody component with the specified news list and news data.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.newsList - The list of news items.
 * @param {Array} [props.news=[]] - The additional news data.
 * @returns {JSX.Element} The JSX element representing the NewsBody component.
 */
const NewsBody = ({newsList, news = []}) => {

    const navigate = useNavigate()

    /**
     * Navigates to the details page of a news item.
     * @param {string} id - The ID of the news item.
     * @returns {void}
     */
    const handleNavigation = useCallback((id) => {
        navigate(`${PORTAL_ROUTES.NEWS_DETAILS_ROUTE}${btoa(id)}`,
            {
                relative: 'path',
                state: {
                    news,
                  },
            })
    }, [news])

    return(
        <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {newsList && newsList.length > 0 ? (
                newsList.map((news, index) => (
                    <div
                        key={index}
                        className="flex flex-row justify-start items-center gap-1 shadow-md rounded-lg overflow-hidden"
                    >
                        <div className="flex-1 bg-black h-full">
                            <img
                                src="https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                alt="img"
                                className="object-cover h-full"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center flex-[2] py-8 gap-3 px-4">

                            <h2 className="font-semibold text-xl text-acuBaseBlue">{news.title}</h2>
                            <p className="text-sm line-clamp-3">{news.description}</p>

                            <div className="flex flex-row gap-5 text-sm items-center">
                                <p className="">
                                    Publicado el {formatDateToSpanishWords(news.createdOn)}
                                </p>

                                <div
                                    onClick={() => handleNavigation(news.id)}
                                    className="font-bold flex flex-row gap-2 items-center min-w-[100px] text-[#092c4c] cursor-pointer hover:text-cyan-900">
                                    Leer Más <BsChevronRight className={`font-semibold`} color={`#092c4c`}/>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay noticias disponibles</p>
            )}

        </section>
    );
}

export default NewsBody