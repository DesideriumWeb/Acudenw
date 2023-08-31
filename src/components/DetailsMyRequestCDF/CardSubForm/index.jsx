import React from "react";
import { STRINGS } from "../../../config/config";

export const CardSubForm = ({ formInfoGeneralDat, type }) => {
  return (
    <>
      {formInfoGeneralDat.map((item, index) => (
        <div
          key={index}
          className="max-w-sm p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col w-full mb-3">
            <div className="flex flex-row justify-between mb-8">
              <div className="text-sm">
                {type === `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_MASTER}`
                  ? `${STRINGS.CENTER_FUTURE_CARD_MASTER_TILE_}${" "}${
                      index + 1
                    }`
                  : type ===
                    `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_ASSISTANT}`
                  ? `${STRINGS.CENTER_FUTURE_CARD_ASSITANT}${" "} ${index + 1}`
                  : type ===
                    `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? `${
                      STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT
                    } ${" "}${index + 1}`
                  : ``}
              </div>
            </div>
            <label className="text-xs mb-1">
              {type === `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_MASTER}`
                ? `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_20}`
                : type ===
                  `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_ASSISTANT}`
                ? `${STRINGS.CENTER_FUTURE_CARD_NAME_ASSISTANT}`
                : type ===
                  `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                ? `${STRINGS.CENTER_FUTURE_CARD_NAME_PARTNERSHIP_AGREEMENT}`
                : ``}
            </label>
            <input
              name={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? `${STRINGS.CENTER_FUTURE_CARD_NAME}`
                  : `${STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_AGENCY}`
              }
              className="form-input"
              value={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? formInfoGeneralDat[index].fullName
                  : formInfoGeneralDat[index].agency
              }
            />
          </div>
          <div className="flex flex-col w-full mb-3">
            <label className="text-xs mb-1">
              {type !== `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                ? `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_21}`
                : `${STRINGS.CENTER_FUTURE_CARD_PURPOSE_PARTNERSHIP_AGREEMENT}`}
            </label>
            <input
              name={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? `${STRINGS.CENTER_FUTURE_CARD_ACADEMIC_PREPARATION_}`
                  : `${STRINGS.CENTER_FUTURE_CARD_PURPOSE_}`
              }
              className="form-input"
              value={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? formInfoGeneralDat[index].preparation
                  : formInfoGeneralDat[index].purpose
              }
            />
          </div>
          <div className="flex flex-col w-full mb-3">
            <label className="text-xs mb-1">
              {type !== `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                ? `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_22}`
                : `${STRINGS.CENTER_FUTURE_CARD_EXPIRATION_PARTNERSHIP_AGREEMENT}`}
            </label>
            <input
              name={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? `${STRINGS.CENTER_FUTURE_CARD_SPECIALTY}`
                  : `${STRINGS.CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_EXPIRATION}`
              }
              className="form-input"
              value={
                type !==
                `${STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT}`
                  ? formInfoGeneralDat[index].speciality
                  : formInfoGeneralDat[index].expirationDate
              }
            />
          </div>
        </div>
      ))}
    </>
  );
};
