/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {STRINGS} from "../../config/config";
import React from "react";
/**
 * Instruction Component
 * This component displays an instruction with a title and description.
 *
 * @param {string} title - The title of the instruction.
 * @param {string} instruction - The instruction description.
 * @param {boolean} justify - Justify instruction text.
 * @param {boolean} italic - Use text italic style.
 * @return {JSX.Element} - The rendered Instruction component.
 */
const Instruction = ({title = STRINGS.INSTRUCTION, instruction = STRINGS.CDF_GENERIC_INSTRUCTION, justify = true, italic = false}) => {
    return(
        <>
            <p className="text-sm font-semibold">{title}:</p>
            <p className={`text-[12px] border rounded-md p-2 ${justify ? 'text-justify' : ''} ${italic ? 'italic' : ''}`}>
                {instruction}
            </p>
        </>
    );
}

export default Instruction