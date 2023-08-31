/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ReadMore from "./ReadMore";
import React, { useCallback, useEffect, useState } from "react";
import { formatDateToSpanishWords } from "../../components/utils";
import { IoPersonCircle } from "react-icons/io5";
import ProviderService from "../../services/userServices/ProviderService";

/**
 * Displays a banner section with the details of the newsDefault.
 *
 * @param {Object} newsDefault - The object containing the details of the default news.
 * @param {Array} news - The array of news articles.
 * @param {boolean} readMore - Determines whether to display the "Read More" section or not.
 * @returns {JSX.Element|null} The JSX element representing the NewsBanner component.
 */
const NewsBanner = ({ newsDefault, news = [], readMore = true }) => {
  const [realImages, setRealImages] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageResult = await new ProviderService().getLogoImage(
          newsDefault.createdByUserId
        );
        if (imageResult) {
          const imgAvatarNew = URL.createObjectURL(imageResult);
          setRealImages(imgAvatarNew);
        } else {
          console.log("Error Image Avatar News");
        }
      } catch (error) {
        console.error("Error Image Avatar News", error);
      }
    };
    fetchImages();
  }, [newsDefault]);
  return (
    <>
      {newsDefault ? (
        <section className="bg-[url(https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)] bg-center rounded-lg overflow-hidden">
          <div className="bg-zinc-800 bg-opacity-60 px-10 py-20 gap-4 flex flex-col text-white">
            <div className="flex flex-row gap-3 items-center">
              {!realImages ? (
                <IoPersonCircle size={50} className="acu-blue" />
              ) : (
                <img
                  src={realImages}
                  alt="profile"
                  className="h-28 w-28 rounded-full"
                />
              )}
              <div className="flex flex-col text-sm">
                <p className="font-semibold">
                  {newsDefault.authorName || "Acuden"}
                </p>
                <p className="text-xs">
                  {formatDateToSpanishWords(newsDefault.createdOn)}
                </p>
              </div>
            </div>
            <h1 className="font-semibold text-3xl">{newsDefault.title}</h1>
            <p className="max-w-lg">{newsDefault.description}</p>

            {readMore ? (
              <ReadMore id={newsDefault.id || 0} news={news} idImageAvatar={newsDefault.createdByUserId}/>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default NewsBanner;
