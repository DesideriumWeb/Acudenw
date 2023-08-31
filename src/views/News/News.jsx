/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from "react";
import useNews from "../../hooks/News/useNews";
import NewsBanner from "./NewsBanner";
import Paginator from "../../components/Paginator";
import {PulseLoader} from "react-spinners";
import PagesTitles from "../../components/General/PagesTitles";
import NewsBody from "./NewsBody";
import {CONSTANTS} from "../../config/config";

/**
 * Renders the News component.
 * Fetches and displays news articles with pagination.
 *
 * @returns {JSX.Element} The JSX element representing the News component.
 */
const News = () => {

  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0)
  const displayPerPage = 10
  const {news, newsDefault, newsList, totalElements, totalPages, isLoading, spinnerLoading, inError, errorMsg} = useNews(currentPaginationIndex, displayPerPage)

  return (
      <div className="w-full bg-white">
        <main className="max-w-6xl p-3 mx-auto">
          {!isLoading ? (
              <>

                <PagesTitles title="Noticias"/>

                <NewsBanner newsDefault={newsDefault} news={news}/>

                <NewsBody newsList={newsList} news={news}/>

                <section className="my-20">
                  <Paginator
                      loading={spinnerLoading}
                      currentPaginationIndex={currentPaginationIndex}
                      setCurrentPaginationIndex={setCurrentPaginationIndex}
                      total={totalElements}
                      displayPerPage={displayPerPage}
                  />
                </section>
              </>
          ) : (
              <div className="flex flex-col h-login-screen w-full items-center justify-center">
                <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
              </div>
          )}
        </main>
      </div>
  );
};

export default News;
