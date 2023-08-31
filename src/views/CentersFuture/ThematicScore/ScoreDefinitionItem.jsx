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
import PropTypes from "prop-types";
/**
 * Component that displays a single score definition item.
 *
 * @component
 * @version 1.0.0
 * @param {number} [keyIndex=0] - The index of the item. (Required)
 * @param {object} [config={}] - Configuration object for the item. (Required)
 * @param {boolean} [isLast=false] - Indicates if the item is the last one.
 * @return {JSX.Element}
 * @constructor
 */
const ScoreDefinitionItem = ({keyIndex = 0, config = {}, isLast = false}) => {
    return(

        <div key={keyIndex} className={`grid grid-cols-1 md:grid-cols-3 ${!isLast ? 'border-b border-b-blue-700' : ''} py-6`}>
            <div className="flex flex-row gap-3 items-center justify-center my-4">
                <FaRocket size={40} color={config.color} />
                <p className="text-2xl font-bold text-gray-700">{config.rangeText || STRINGS.DEFAULT_ON_EMPTY}</p>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                <b className="text-darkblue">{config.name || STRINGS.DEFAULT_ON_EMPTY}</b>
                <p className="text-sm text-justify">
                    {config.description || STRINGS.DEFAULT_ON_EMPTY}
                </p>
            </div>
        </div>

    );
}

ScoreDefinitionItem.prototype = {
    keyIndex: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired
}

export default ScoreDefinitionItem