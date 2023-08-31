/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ScoreDefinitionItem from "./ScoreDefinitionItem";
import {CDF_SCORES_DEFINITIONS} from "../../../config/config";
/**
 * Component that displays score definitions using ScoreDefinitionItem.
 *
 * @version 1.0.0
 * @return {JSX.Element}
 * @constructor
 */
const ScoreDefinitions = () => {
    return(

        <div className="w-full py-20 px-3">

            <div className="text-center text-2xl text-darkblue font-semibold my-6">
                {CDF_SCORES_DEFINITIONS.TITLE}
            </div>

            <div className="flex flex-col w-full max-w-5xl mx-auto mt-6">
                {
                    CDF_SCORES_DEFINITIONS.SCORES_DEFINITIONS.map((score, index) => (
                        <ScoreDefinitionItem
                            keyIndex={index}
                            config={score}
                            isLast={CDF_SCORES_DEFINITIONS.SCORES_DEFINITIONS.length === index + 1}
                        />
                    ))
                }

            </div>
        </div>
    );
}

export default ScoreDefinitions