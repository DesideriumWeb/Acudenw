/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
/**
 * Componente que permite renderizar el menu de centros de ayuda
 */
export const HelpCenterItemMenu = ({ active, btnText, clickHandler }) => {

  return (
    <>
      <div
        className={`p-2 text-gray-700 hover:bg-[#BBF2DD] rounded-sm cursor-pointer ${
          active === `${btnText}`
            ? "bg-emerald-300 font-semibold"
            : "bg-white text-black"
        }`}
        onClick={() => clickHandler(`${btnText}`)}
      >
         {btnText}
      </div>
    </>
  );
};
