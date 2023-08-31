/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Link, useNavigate } from "react-router-dom";
import { PORTAL_ROUTES } from "../../config/config";
import { useCallback } from "react";

const ReadMore = ({
  id,
  news = [],
  idImageAvatar,
  path = PORTAL_ROUTES.NEWS_DETAILS_ROUTE,
}) => {
  const navigate = useNavigate();

  /**
   * Navigates to the details page of a news item.
   * @param {string} id - The ID of the news item.
   * @returns {void}
   */
  const handleNavigation = useCallback(
    (id) => {
      navigate(`${path}${btoa(id)}`, {
        relative: "path",
        state: {
          news,
          idImageAvatar,
        },
      });
    },
    [news]
  );

  return (
    <button
      onClick={() => handleNavigation(id)}
      className="text-cyan-900 bg-white px-5 py-2 text-sm rounded-md w-fit font-semibold hover:bg-[#A7D02A] hover:text-white"
    >
      Leer Más
    </button>
  );
};

export default ReadMore;
