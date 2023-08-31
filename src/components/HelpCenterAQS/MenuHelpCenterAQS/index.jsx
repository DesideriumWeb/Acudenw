/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useState } from "react";
import { HELP_CENTER_MENU_ITEMS, STRINGS } from "../../../config/config";
import { BannerHelpCenterAQS } from "../BannerHelpCenterAQS";
import { HelpCenterItemMenu } from "../HelpCenterItemMenu";

/**
 * Componente que permite visualizar el menu de AQS
 */
export default function MenuHelpCenterAQS() {
  const [activeButton, setActiveButton] = useState(null);

  /**
   * Realiza un desplazamiento automático suave a un card específico en la página.
   * @param {string} cardId - El ID del card al que se realizará el desplazamiento.
   */
  const handleScrollToCard = (cardId) => {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: `${STRINGS.HELP_CENTER_BEHAVIOR}`,
        block: `${STRINGS.HELP_CENTER_BLOCK}`,
      });
    }
  };
  /**
   * Maneja el clic en un botón del menú y realiza un desplazamiento al card correspondiente.
   * @param {string} buttonId - El ID del botón presionado.
   */
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    handleScrollToCard(buttonId);
  };

  return (
    <>
      <section className="w-full max-w-6xl mx-auto p-3">
        <h1 className="text-center my-6 font-semibold text-2xl">
          {STRINGS.HELP_CENTER_TITLE}
        </h1>
        <div className=" block gap-6 justify-center sm:flex flex-row text-[14px]">
          {HELP_CENTER_MENU_ITEMS.map((item, index) => (
            <HelpCenterItemMenu
              key={index}
              active={activeButton}
              btnText={item.MENU_BUTTON_TEXT}
              clickHandler={handleButtonClick}
            />
          ))}
        </div>
        <BannerHelpCenterAQS />
      </section>
    </>
  );
}
