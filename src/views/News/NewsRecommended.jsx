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

const NewsRecommended = ({recommendedArticles, news = []}) => {

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
                state:{ news: news }
            })
    }, [news])

    return (
        <section className="max-w-6xl p-3 mx-auto">
            <h1 className="text-xl font-semibold my-1">Noticias Recomendadas</h1>
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {recommendedArticles && recommendedArticles.length > 0 ? (
                    recommendedArticles.map((nw, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-row justify-start items-center gap-1 shadow-md rounded-lg overflow-hidden bg-white"
                            >
                                <div className="flex-1 bg-black h-full">
                                    <img
                                        src="https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                        alt="img"
                                        className="object-cover h-full"
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-center flex-[2] py-8 gap-3 px-4">
                                    <h2 className="font-semibold text-xl">{nw.title}</h2>
                                    <p className="text-sm line-clamp-3">{nw.description}</p>

                                    <div className="flex flex-row gap-5 text-sm items-center">
                                        <p className="">
                                            Publicado el {formatDateToSpanishWords(nw.createdOn)}
                                        </p>

                                        <div
                                            onClick={() => handleNavigation(nw.id)}
                                            className="font-bold flex flex-row gap-2 items-center min-w-[100px]"
                                        >
                                            Leer Mas <BsChevronRight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay artículos recomendados disponibles</p>
                )}
            </div>
        </section>
    );

}

export default NewsRecommended