import React, { useEffect, useState } from "react";
import { STRINGS } from "../../../config/config";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { generateUniqueKey } from "../../../components/utils";

const ModalSeeDetail = ({
  showModal,
  setShowModal,
  configuration,
  titleModal,
  grupo,
}) => {
  const [activeTable, setActiveTable] = useState(true);

  let totalPositiveAnswers = 0;
  let totalQuestions = 0;
  const validatedTotalPositiveAnswers = (item) => {
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_INFANTS}`) {
      const infantes = item.INFANT?.totalPositiveAnswers ?? 0;
      totalPositiveAnswers += infantes;
      return infantes;
    }
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_MATERNALS}`) {
      const maternales = item.MATERNAL?.totalPositiveAnswers ?? 0;
      totalPositiveAnswers += maternales;
      return maternales;
    }
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS}`) {
      const preescolares = item.PRESCHOOL?.totalPositiveAnswers ?? 0;
      totalPositiveAnswers += preescolares;
      return preescolares;
    }
  };
  const validatedTotalAnswers = (item) => {
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_INFANTS}`) {
      const infantes = item.INFANT?.totalQuestions ?? 0;
      totalQuestions += infantes;
      return infantes;
    }
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_MATERNALS}`) {
      const maternales = item.MATERNAL?.totalQuestions ?? 0;
      totalQuestions += maternales;
      return maternales;
    }
    if (grupo === `${STRINGS.CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS}`) {
      const preescolares = item.PRESCHOOL?.totalQuestions ?? 0;
      totalQuestions += preescolares;
      return preescolares;
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-2">
              <div className="max-w-[800px]">
                <div className="border-0 rounded-lg shadow-lg flex flex-col px-6 py-3 bg-white outline-none focus:outline-none">
                  <div className="flex justify-end py-4">
                    <button
                      className="border-0 text-[#092C4C] text-3xl"
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.1165 24.8816C30.2883 26.0534 30.2883 27.9517 29.1165 29.1235C28.5353 29.7094 27.7666 30 26.9979 30C26.2292 30 25.4624 29.7071 24.8774 29.1212L14.9988 19.2477L5.12116 29.1188C4.53527 29.7094 3.76752 30 2.99977 30C2.23201 30 1.4652 29.7094 0.878838 29.1188C-0.292946 27.947 -0.292946 26.0487 0.878838 24.877L10.7593 14.9965L0.878838 5.12069C-0.292946 3.94891 -0.292946 2.05062 0.878838 0.878838C2.05062 -0.292946 3.94891 -0.292946 5.12069 0.878838L14.9988 10.764L24.8793 0.883525C26.0511 -0.288258 27.9494 -0.288258 29.1212 0.883525C30.2929 2.05531 30.2929 3.9536 29.1212 5.12538L19.2407 15.0059L29.1165 24.8816Z"
                          fill="#092C4C"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-row text-2xl font-bold my-3 mx-4">
                    {titleModal}
                  </div>
                  <div className="w-full mt-12 mb-8 max-w-5xl mx-auto rounded-xl overflow-hidden border-2 border-darkblue">
                    <div className="p-4 bg-darkblue font-semibold text-white flex flex-row justify-between items-center">
                      <p className="capitalize">{`${
                        configuration.name || STRINGS.DEFAULT_ON_EMPTY
                      }: ${
                        configuration.description || STRINGS.DEFAULT_ON_EMPTY
                      }`}</p>

                      {activeTable ? (
                        <BiChevronUp
                          size={30}
                          onClick={() => setActiveTable(null)}
                        />
                      ) : (
                        <BiChevronDown
                          size={30}
                          onClick={() => setActiveTable(true)}
                        />
                      )}
                    </div>
                    {activeTable && (
                      <div>
                        <div className="p-4 border-b-2 border-b-darkblue">
                          {STRINGS.THEMATIC_MODAL_SEE_DETAIL_TITLE}
                          {configuration.subtableDetails?.map(
                            (table, index) => (
                              <div
                                key={index}
                                className="list-item-001 py-2  border-b-gray-600 flex flex-row justify-between items-center w-fullflex mb-4 mt-4 "
                              >
                                <p>
                                  {`${
                                    table?.name || STRINGS.DEFAULT_ON_EMPTY
                                  }: ${
                                    table.description ||
                                    STRINGS.DEFAULT_ON_EMPTY
                                  }`}
                                </p>
                                <div className="flex flex-row">
                                  {validatedTotalPositiveAnswers(
                                    table?.populationResults
                                  )}
                                  <span>/</span>
                                  <div>
                                    {validatedTotalAnswers(
                                      table?.populationResults
                                    )}
                                  </div>
                                  &nbsp;&nbsp;{" "}
                                  {STRINGS.THEMATIC_MODAL_SEE_DETAIL_TOTAL_YES}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      key={generateUniqueKey(10)}
                      className="bg-blue-100 p-4 flex flex-row justify-between items-center font-semibold"
                    >
                      <div>{STRINGS.THEMATIC_MODAL_SEE_DETAIL_SUBTOTAL}</div>
                      <div>
                        {totalPositiveAnswers ?? 0}/{totalQuestions ?? 0}
                        <span className="text-xs">
                          {" "}
                          {STRINGS.THEMATIC_MODAL_SEE_DETAIL_TOTAL_YES_ANSWER}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-12 flex flex-row gap-4 items-center justify-center">
                    <button
                      onClick={() => setShowModal(false)}
                      className="border border-darkblue text-darkblue rounded p-2 px-4 font-medium
                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                    >
                      {STRINGS.THEMATIC_MODAL_SEE_DETAIL_BACK_BUTTON}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      ) : null}
    </>
  );
};

export default ModalSeeDetail;
