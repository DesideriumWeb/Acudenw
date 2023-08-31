/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  OPTION_CENTER_FINANCING,
  OPTION_CENTER_FUTURE_ACCREDITATIONS,
  OPTION_CENTER_FUTURE_CENTER_RATIO,
  OPTION_CENTER_FUTURE_DAYS_SERVICES,
  OPTION_CENTER_FUTURE_HOURS_OF_SERVICES,
  OPTION_CENTER_FUTURE_POPULATION,
  OPTION_CENTER_FUTURE_YARD,
  PORTAL_ROUTES,
  STRINGS,
} from "../../../config/config";
import { TabPanel, TabView } from "primereact/tabview";
import ProtectedComponent from "../../../components/HighOrderComponents/ProtectedComponent";
import FormTitleFuture from "../../../components/Form/FormTitleFuture";
import { CardSubForm } from "../../../components/DetailsMyRequestCDF/CardSubForm";
import { CheckBoxCDF } from "../../../components/DetailsMyRequestCDF/CheckBoxCDF";
import useDetailsMyRequestCDF from "../../../hooks/MyRequestCentersFuture/useDetailstMyRequestCDF";
import BackArrow from "../../../components/BackArrow/BackArrow";
/**
 * This component displays detailed information about a Center of the Future request in the CDF portal.
 * It provides tabs for displaying basic information and general data.
 *
 * @component
 * @version 1.0.0
 */
function DetailsRequestCDF() {

  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const { data, requestNumber } = location.state.request;
  const navigate = useNavigate();
  const { basicInformationData, informationGeneralData } = useDetailsMyRequestCDF(data);
  /**
   * Effect to monitor navigation changes
   * @version 1.0.0
   */
  useEffect(() => {}, [navigate]);
  /**
   * Navigates to a specified route with relevant request information when going back to CDF history.
   *
   * @function
   * @version 1.0.0
   * @param {string} route - The route to navigate to.
   * @returns {void}
   */
  const handleBackCDFHistory = (route) => {
    navigate(route, {
      state: {
        request: {
          requestNumber,
          data
        },
      },
    });
  };

  return (
    <>
      <div
        className="flex flex-row justify-start items-center p-4 ml-4"
        onClick={() =>
          handleBackCDFHistory(PORTAL_ROUTES.CDF_HISTORY_ROUTE)
        }
      >
        <BackArrow text={STRINGS.THEMATIC_BACK_GENERIC}/>

      </div>
      <div className="bg-white  px-5 sm:px-10 lg:px-32  rounded-lg">
        <FormTitleFuture
          titleFirst="Perfil del Centro"
          style="font-bold text-2xl mt-2"
          secondTitle=""
          subTitle=""
          children=""
          url="true"
        />
        <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
          <TabView
            className="responsive-tab-view"
            activeIndex={tabIndex}
            onTabChange={(e) => setTabIndex(e.index)}
          >
            <TabPanel header="Información Basica">
              <div className=" flex flex-col  w-full items-center justify-center mt-8 mb-8 ">
                <div className="flex flex-col items-center w-full max-w-xs gap-3">
                  <form
                    className="w-full flex flex-col gap-0"
                    autoComplete="off"
                  >
                    <div
                      className=" font-semibold  text-2xl text-black p-2 rounded-lg text-center mb-0"
                      role="alert"
                    ></div>
                    {basicInformationData.map((formInfoBasicDat, j) => (
                      <div key={j} className="flex flex-col w-full mb-3">
                        <label className="text-xs mb-1">
                          {Object.keys(formInfoBasicDat)[0]}
                          {j === 12 ? <div className="mt-3">Infantes</div> : ""}
                        </label>
                        {j === 9 ? (
                          <>
                            <CheckBoxCDF
                              option={OPTION_CENTER_FUTURE_POPULATION}
                              formItem={
                                formInfoBasicDat[
                                  Object.keys(formInfoBasicDat)[0]
                                ]
                              }
                            />
                          </>
                        ) : (
                          <input
                            className="form-input"
                            value={
                              formInfoBasicDat[
                                Object.keys(formInfoBasicDat)[0]
                              ] === true
                                ? "Si"
                                : formInfoBasicDat[
                                    Object.keys(formInfoBasicDat)[0]
                                  ] === false
                                ? "No"
                                : formInfoBasicDat[
                                    Object.keys(formInfoBasicDat)[0]
                                  ]
                            }
                            disabled
                          />
                        )}
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Datos generales">
              <div className="flex flex-col  w-full items-center justify-center mt-8 mb-8">
                <div className="flex flex-col items-center w-full max-w-xs gap-3">
                  <form
                    className="w-full flex flex-col gap-3"
                    autoComplete="off"
                  >
                    <div
                      className=" font-semibold  text-2xl text-black p-2 rounded-lg text-center mb-0"
                      role="alert"
                    ></div>
                    {informationGeneralData.map((formInfoGeneralDat, j) => (
                      <div key={j} className="flex flex-col w-full mb-3">
                        <label className="text-xs mb-1">
                          {Object.keys(formInfoGeneralDat)[0]}
                        </label>
                        {(j >= 2 && j <= 7) || j === 9 ? (
                          <>
                            <CheckBoxCDF
                              option={
                                j === 2
                                  ? OPTION_CENTER_FINANCING
                                  : j === 3
                                  ? OPTION_CENTER_FUTURE_HOURS_OF_SERVICES
                                  : j === 4
                                  ? OPTION_CENTER_FUTURE_DAYS_SERVICES
                                  : j === 5
                                  ? OPTION_CENTER_FUTURE_POPULATION
                                  : j === 6
                                  ? OPTION_CENTER_FUTURE_YARD
                                  : j === 7
                                  ? OPTION_CENTER_FUTURE_ACCREDITATIONS
                                  : j === 9
                                  ? OPTION_CENTER_FUTURE_CENTER_RATIO
                                  : ""
                              }
                              formItem={
                                formInfoGeneralDat[
                                  Object.keys(formInfoGeneralDat)[0]
                                ]
                              }
                            />
                          </>
                        ) : j === 11 || j === 12 || j === 18 ? (
                          <>
                            <CardSubForm
                              formInfoGeneralDat={
                                formInfoGeneralDat[
                                  Object.keys(formInfoGeneralDat)[0]
                                ]
                              }
                              type={
                                j === 11
                                  ? STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_MASTER
                                  : j === 12
                                  ? STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_ASSISTANT
                                  : j === 18
                                  ? STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT
                                  : ""
                              }
                            />
                          </>
                        ) : j === 13 ? (
                          <div>
                            <label className="text-xs mb-1">
                              {
                                STRINGS.CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_19
                              }
                            </label>
                            <input
                              className="form-input"
                              value={
                                formInfoGeneralDat[
                                  Object.keys(formInfoGeneralDat)[0]
                                ]
                              }
                              disabled
                            />
                          </div>
                        ) : (
                          <input
                            className="form-input"
                            value={
                              formInfoGeneralDat[
                                Object.keys(formInfoGeneralDat)[0]
                              ]
                            }
                            disabled
                          />
                        )}
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </TabPanel>
          </TabView>
          <div className="my-4 flex flex-row gap-4 items-center justify-center">
            <button
                onClick={() => handleBackCDFHistory(PORTAL_ROUTES.CDF_HISTORY_ROUTE)}
                className="border border-darkblue text-darkblue rounded p-2 px-4 font-medium
                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
            >
              Volver a mi solicitud
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProtectedComponent(DetailsRequestCDF);
