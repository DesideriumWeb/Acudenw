/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import SimplePaginator from "../../components/General/SimplePaginator";
import SmallSpinner from "../../components/General/SmallSpinner";
import { CONSTANTS, STRINGS } from "../../config/config";
import { BsChevronRight } from "react-icons/bs";
import {
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
} from "video-react";
import { Dialog } from "primereact/dialog";

const VideoCard = ({
  items = [],
  usePaginateButtons = true,
  usePreview = false,
  useDelete = false,
  deleteLoading = false,
  useGeneral = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [videoAddress, setVideoAddress] = useState("");
  const itemsPerPage = CONSTANTS.DEFAULT_CARDS_ITEMS_PER_PAGE_VIDEO_CARDS;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  /**
   * handlePageChange function
   * Updates the current page in the pagination.
   * @param {number} page - The page number to set as the current page.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  /**
   * paginatedItems variable
   * Contains a slice of items based on the current page and items per page.
   */
  let paginatedItems =
    items && items.length > 0
      ? items.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];
  /**
   * Handles the open event for the video player dialog.
   * Sets the state of `showVideo` to true, hiding the video player dialog.
   * @returns {void}
   */
  const handlePlayVideo = (item) => {
    setShowVideo(true);
    setVideoAddress(item);
  };
  /**
   * Handles the close event for the video player dialog.
   * Sets the state of `showVideo` to false, hiding the video player dialog.
   * @returns {void}
   */
  const onCloseVideo = () => {
    setShowVideo(false);
  };
  /**
   * useEffect
   * Resets the current page to 1 when the items prop changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return (
    <>
      <div className="p-4 ">
        <div className="flex flex-wrap -mx-4 mt-6 justify-center items-center">
          {paginatedItems.map(({ title, text, img, url }, index) => (
            <div key={index} className="w-full sm:w-56 md:w-56 lg:w-56 xl:w-72 justify-center p-4">
              <div className="bg-white shadow-gray-300 shadow-md rounded-lg overflow-hidden h-[400px] sm:h-[380px]  md:h-[450px] lg:h-[400px] xl:h-[450px] ">
                <div className="">
                  <img
                    className="w-full  object-cover aspect-video"
                    src={img}
                    alt="video"
                  />
                </div>
                <div className="p-3 flex flex-col justify-between">
                  <div className="h-[130px] md:h-[220px] lg:h-[220px] xl:h-[220px]">
                    <h2 className="text-sm font-semibold my-3 text-[#092C4C]">
                      {title}
                    </h2>
                    <div className="text-xs sm:text-xs  md:text-xs lg:text-xs xl:text-xs">{text}</div>
                  </div>
                  <div
                    className="flex flex-row justify-end items-center pt-3 text-sm font-semibold text-acuBaseBlue cursor-pointer hover:text-acuGreen"
                    onClick={() => handlePlayVideo(url)}
                  >
                    <div>{STRINGS.HELP_CENTER_BUTTON_SEE_VIDEO}</div>
                    <BsChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SimplePaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {usePaginateButtons ? (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-l"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              Next
            </button>
          </div>
        ) : null}
        {(useDelete || useGeneral) && (
          <div className="w-full flex flex-row justify-center mt-3">
            <SmallSpinner loading={deleteLoading} />
          </div>
        )}
      </div>

      <Dialog
        style={{ width: "70vw" }}
        header={<p className="text-lg font-semibold">{"Centros de ayuda:"}</p>}
        visible={showVideo}
        onHide={onCloseVideo}
      >
        <Player src={videoAddress} playsInline>
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          </ControlBar>
        </Player>
      </Dialog>
    </>
  );
};

export default VideoCard;
