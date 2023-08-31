/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {justifyRequestId} from "../../../components/utils";
import {PORTAL_ROUTES, STRINGS} from "../../../config/config";
import BackArrowExtended from "../../../components/BackArrow/BackArrowExtended";
import {useNavigate} from "react-router-dom";
/**
 * Component that displays the header section for a thematic request.
 *
 * @param {object} data - The data object containing information about the thematic request.
 * @param {number} requestId - The ID of the thematic request.
 * @param {string} title - The title to be displayed in the header.
 * @param {string} description - The description to be displayed in the header.
 * @param {string} population - The population information to be displayed in the header.
 * @returns {JSX.Element} The ThematicHeader component.
 */
const ThematicHeader = ({data = {}, requestId = 0, title = STRINGS.THEMATIC_HEADER_DEFAULT_TITLE, description = '', population = ''}) => {

    const navigate = useNavigate()
    /**
     * Handles the extended route event, navigating to a specific route with additional state data.
     * @return {void}
     */
    const onExtendedRouteEvent = () => {
        navigate(
            PORTAL_ROUTES.CDF_HISTORY_ROUTE,
            {
                state:{
                    request:{
                        data,
                        requestNumber: data.id
                    }
                }
            }
        )
    }

    return(
        <>
            <div className="flex flex-row w-full md:justify-start sm:justify-center ml-20">
                <BackArrowExtended
                    extendedHandler={onExtendedRouteEvent}
                    className="p-4 my-2"
                    text={STRINGS.THEMATIC_BACK_ARROW_TEXT}
                />
            </div>
            <div className="mx-auto w-full max-w-5xl">

                <h2 className="py-3 text-gray-700 font-semibold text-xl">
                    Solicitud #{justifyRequestId(requestId, 5)} {` ${STRINGS.TITLE_CENTERS_FUTURE_DETAILS_REQUEST}`}
                </h2>

                <h1 className="text-center font-semibold text-darkblue text-2xl py-3 mb-8 capitalize">
                    {title || STRINGS.DEFAULT_ON_EMPTY}:{' '}{description || ''}{' '}{`(${population})`}
                </h1>

                {
                    STRINGS.THEMATIC_INSTRUCTIONS?.map((instruction, index) =>
                        <p key={index} className="mb-6 text-gray-700 text-justify">
                            {instruction.THEMATIC_HEADER_INSTRUCTION || STRINGS.DEFAULT_ON_EMPTY}
                        </p>
                    )
                }
            </div></>
    );
}

export default ThematicHeader;