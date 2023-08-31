/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {MdError} from "react-icons/md";
import {BiSolidCheckCircle} from "react-icons/bi";
import React from "react";
import {CDF_LOG_TYPE} from "../../config/config";
import PropTypes from "prop-types";
/**
 * A timeline card component that displays a specific type of event with optional children content.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content to be displayed within the timeline card.
 * @param {string} props.type - The type of the timeline card event. Defaults to CDF_LOG_TYPE.COMPLETED.
 * @param {string} props.last - Flag indicating if this is the last event in the timeline. Null by default.
 * @returns {JSX.Element} The TimeLineCard component.
 */
const TimeLineCard = ({ children, type = CDF_LOG_TYPE.COMPLETED, last = null }) => {
    return (
        <div className="flex flex-row gap-3 md:gap-8">
            <div className="flex flex-col gap-3 md:gap-6 items-center">
                {type === CDF_LOG_TYPE.PENDING ? (
                    <MdError className="text-rose-700  text-[22px] md:text-[28px]" />
                ) : (
                    <BiSolidCheckCircle className="text-darkblue text-[22px] md:text-[28px]" />
                )}
                {last === CDF_LOG_TYPE.LAST ? null : (
                    <div className="w-[2px] h-full flex-1 bg-darkblue"></div>
                )}
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-4">{children}</div>
        </div>
    );
};

TimeLineCard.propTypes = {
    type: PropTypes.string.isRequired
}

export default TimeLineCard