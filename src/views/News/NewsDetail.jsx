/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useMemo, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NewsService } from "../../services/newsServices/NewsService";
import { formatDateToSpanishWords } from "../../components/utils";
import NewsRecommended from "./NewsRecommended";
import { PORTAL_ROUTES } from "../../config/config";
import { IoPersonCircle } from "react-icons/io5";

const NewsDetail = () => {
  const { id } = useParams();

  const { state: state} = useLocation();
  const news = state.news
  const idImageA = state.idImageAvatar;
  const decodedId = atob(id);
  const [image, setImage] = useState();

  /**
   * Generates an array of recommended articles based on the news and decodedId.
   * If there are more than 3 news articles, it removes the article with the decodedId,
   * shuffles the remaining articles, and returns the first 2 articles.
   * If there are less than or equal to 3 news articles, it returns an empty array.
   *
   * @returns {Array} The array of recommended articles.
   */
  const recommendedArticles = useMemo(() => {
    const newsCopy = news?.length > 0 ? [...news] : [];

    if (newsCopy?.length > 3) {
      newsCopy.splice(newsCopy.findIndex(({ newsId }) => newsId === decodedId));

      const shuffledArray = newsCopy.sort(() => 0.5 - Math.random());
      return shuffledArray.slice(0, 2);
    } else {
      return [];
    }
  }, [news, decodedId]);

  /**
   * Retrieves specific details (title, authorName, updatedOn, content, description, createdOn)
   * of a news article based on the decodedId.
   *
   * @returns {Object} The object containing the specific details of the news article.
   */
  const { title, authorName, updatedOn, content, description, createdOn } =
    useMemo(() => {
      return news?.length > 0
        ? news?.find((value) => value.id === Number(decodedId))
        : {};
    }, [news, decodedId]);

  /**
   * Fetches the news image associated with the idImageA and sets it as the component's image state.
   */
  useEffect(() => {
    const fetchNewsImage = async (idImageA) => {
      try {
        const data = await new NewsService().getNewsImage(idImageA);
        if (data) {
          setImage(URL.createObjectURL(data));
        } else {
          console.log("Error Image Avatar News ReadMore");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (idImageA) {
      fetchNewsImage(idImageA);
    }
  }, [idImageA]);

  return (
    <div className="bg-white">
      <main className="max-w-6xl p-3 mx-auto">
        <div className="py-6 flex flex-row items-center justify-start gap-2 text-sm text-cyan-900 font-semibold">
          <Link to={PORTAL_ROUTES.NEWS_ROUTE}>
            <h1>Noticias</h1>
          </Link>
          <BsChevronRight size={18} />
          <h1>{title}</h1>
        </div>

        <section className="bg-[url(https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)] bg-center h-80 rounded-lg overflow-hidden"></section>
        <section className="my-12 w-full max-w-xl mx-auto flex flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex flex-row gap-3 items-center py-6">
            {!image ? (
              <IoPersonCircle size={50} className="acu-blue" />
            ) : (
              <img
                src={image}
                alt="profile"
                className="h-28 w-28 rounded-full"
              />
            )}
            <div className="flex flex-col text-sm">
              <p className="font-semibold">{authorName}</p>
              <p className="text-xs">{formatDateToSpanishWords(createdOn)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 leading-5 text-gray-800">
            {content}
          </div>
        </section>
      </main>
      <div className="bg-gray-300 py-6">
        <NewsRecommended
          recommendedArticles={recommendedArticles}
          news={news}
        />
      </div>
    </div>
  );
};

export default NewsDetail;
