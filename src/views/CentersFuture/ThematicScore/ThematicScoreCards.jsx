/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { STRINGS } from "../../../config/config";
import PropTypes from "prop-types";
import ModalSeeDetail from "./ModalSeeDetail";
import { useState } from "react";
/**
 * Displays thematic scores cards with related information.
 *
 * @component
 * @version 1.0.0
 * @param {number} key - The key/index of the component instance.
 * @param {Object} configuration - Configuration data for the thematic score card.
 * @param {string} configuration.name - The name of the thematic score card.
 * @param {string} configuration.description - Description of the thematic score card.
 * @param {Object} configuration.populationScore - Population scores for different groups.
 * @param {number} configuration.populationScore.INFANT - Population score for Infants group.
 * @param {number} configuration.populationScore.MATERNALS - Population score for Maternals group.
 * @param {number} configuration.populationScore.PRESCHOOL - Population score for Preschool group.
 * @param {number} configuration.score - The thematic score.
 * @param {string} configuration.headerColor - Background color for the header.
 * @param {string} configuration.baseCircleColor - Base circle color for the score circle.
 * @param {string} configuration.scoreCircleColor - Score circle color.
 * @returns {JSX.Element} - The JSX element representing the ThematicScoreCards component.
 */
const ThematicScoreCards = ({ key, configuration = {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [grupo, setGrupo] = useState(false);
  const handlerShowModalSeeDetail = (title) => {
   
    if (title === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_INFANTS}`) {
      setShowModal(true);
      setTitleModal(`Tabulacion ${configuration.name} (Infantes)`);
      setGrupo(`${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_INFANTS}`);
    }
    if (title === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_MATERNALS}`) {
      setShowModal(true);
      setTitleModal(`Tabulacion ${configuration.name} (Maternales)`);
      setGrupo(`${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_MATERNALS}`);
    }
    if (title === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS}`) {
      setShowModal(true);
      setTitleModal(`Tabulacion ${configuration.name} (Preescolares)`);
      setGrupo(`${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS}`);
    }
  };
  return (
    <>
      <div key={key} className="rounded-lg overflow-hidden shadow">
        <div
          className={`aspect-video p-8 flex flex-col gap-2 justify-center items-center ${configuration.headerColor} text-darkblue text-lg text-center`}
        >
          <h3 className="font-bold">
            {configuration.name || STRINGS.DEFAULT_ON_EMPTY}
          </h3>
          <p className="font-medium">
            {configuration.description || STRINGS.DEFAULT_ON_EMPTY}
          </p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="mt-4">
            <h3 className="font-bold text-lg text-blue-900">Subtotales</h3>
            <p className="font-medium">Resultados de Grupo de Edad</p>
          </div>
          <div>
            <div className="flex flex-row items-center border-b border-b-darkblue justify-between py-6 text-sm">
              <p>
                Grupo: Infantes{" "}
                <a
                  className="text-blue-900 hover:underline cursor-pointer"
                  onClick={() => handlerShowModalSeeDetail("infantes")}
                >
                  Ver detalles
                </a>
              </p>
              <b>{configuration.populationScore.INFANT ?? 0}%</b>
            </div>
            <div className="flex flex-row items-center border-b border-b-darkblue justify-between py-6 text-sm">
              <p>
                Grupo: Maternales{" "}
                <a
                  className="text-blue-900 hover:underline cursor-pointer"
                  onClick={() => handlerShowModalSeeDetail("maternales")}
                >
                  Ver detalles
                </a>
              </p>
              <b>{configuration.populationScore.MATERNALS ?? 0}%</b>
            </div>
            <div className="flex flex-row items-center justify-between py-6 text-sm">
              <p>
                Grupo: Preescolares{" "}
                <a
                  className="text-blue-900 hover:underline cursor-pointer"
                  onClick={() => handlerShowModalSeeDetail("preescolares")}
                >
                  Ver detalles
                </a>
              </p>
              <b>{configuration.populationScore.PRESCHOOL ?? 0}%</b>
            </div>
          </div>
          <div className="py-2">
            <h3 className="font-bold text-lg text-blue-900">
              Total del Eje Temático
            </h3>
            <p className="text-[12px]">
              La suma de los totales de cada grupo de edad y división entre (3)
              tres.
            </p>
          </div>

          <div className="w-3/5 aspect-square mx-auto relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx={50}
                cy={50}
                r={40}
                strokeWidth={10}
                className={`${configuration.baseCircleColor} fill-none`}
              />
              <circle
                cx={50}
                cy={50}
                r={40}
                strokeWidth={10}
                strokeDasharray={251}
                strokeDashoffset={251 - configuration.score * 2.51}
                className={`${configuration.scoreCircleColor} fill-none -rotate-90 origin-center`}
              />
            </svg>
            <div className="h-full w-full flex items-center justify-center absolute top-0 left-0">
              <div className="text-3xl font-bold text-darkblue">
                {configuration.score ?? 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSeeDetail
        showModal={showModal}
        setShowModal={setShowModal}
        configuration={configuration}
        titleModal={titleModal}
        grupo={grupo}
      />
    </>
  );
};

ThematicScoreCards.prototype = {
  key: PropTypes.number.isRequired,
  configuration: PropTypes.object.isRequired,
};

export default ThematicScoreCards;
