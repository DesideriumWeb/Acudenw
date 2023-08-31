/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {FaRocket} from "react-icons/fa";
import {STRINGS} from "../../../config/config";
import {getColorForScore, getNameForScore} from "../../../components/utils";
import PropTypes from "prop-types";
/**
 * Displays the results section with the final score and related information.
 *
 * @component
 * @version 1.0.0
 * @param {number} score - The final score to be displayed.
 * @param {function} downloadHandler - Download document, file or certification.
 * @returns {JSX.Element} - The JSX element representing the Results component.
 */
const Results = ({score = 0, downloadHandler = null}) => {
    return(
        <div className="w-full bg-gray-100 py-20">
            <div className="w-full max-w-sm mx-auto">
                <h1 className="text-center font-semibold text-darkblue text-2xl py-3 mb-6">
                    {STRINGS.THEMATIC_RESULTS_TITLE}
                </h1>

                <p className="text-justify text-gray-700 max-w-md mx-auto mb-12 text-sm">
                    {STRINGS.THEMATIC_RESULTS_DESCRIPTION}
                </p>

                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
                    <p className="text-center">Puntuación</p>
                    <div className="flex flex-row gap-3 items-center justify-center my-4">
                        <FaRocket size={72} color={getColorForScore(score)} />
                        <p className="text-2xl font-bold">{score ?? 0}%</p>
                    </div>
                    <p className="text-darkblue my-3 font-medium">{getNameForScore(score)}</p>
                    <button
                        onClick={downloadHandler}
                        className="border border-darkblue text-darkblue rounded p-2 my-4 px-4 font-medium
                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all">
                        Descargar Certificado
                    </button>
                </div>
            </div>
        </div>
    );
}

Results.prototype = {
    score: PropTypes.number.isRequired
}

export default Results