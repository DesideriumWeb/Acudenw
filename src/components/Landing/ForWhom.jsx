/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import imgHands from "../../assets/images/icons/handsHoldingChildIconSolid.svg"
import imgPortfolio from "../../assets/images/icons/portfolio-icon-solid.svg"
import {STRINGS} from "../../config/config";
const ForWhom = () => {
    return(
        <div className="container mx-auto px-4 my-8">
            <div className="flex flex-col items-center text-center py-10">
                <h1 className="font-bold text-4xl text-[#092C4C]">¿Para quién es la plataforma?</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:space-x-40 mt-6">
                <div className="flex flex-col items-center md:w-1/3">
                    <div className="flex justify-center">
                        <img className="w-30 h-auto" src={imgHands}
                                       alt="imagen de Manos Extendidas"/>
                    </div>
                    <h2 className="text-center text-[#092C4C] text-2xl font-bold">Centros del Cuidado de la niñez</h2>
                    <p className="text-justify text-[#092C4C] mt-6">
                        {STRINGS.PROVIDER_LANDING_INFO}
                    </p>
                </div>
                <div className="flex flex-col items-center md:w-1/3 mt-8">
                    <div className="flex justify-center">
                        <img className="w-30 h-auto" src={imgPortfolio}
                                       alt="imagen de Portafolio"/>
                    </div>
                    <h2 className="text-center text-[#092C4C] text-2xl font-bold">Profesionales de la niñez</h2>
                    <p className="text-justify text-[#092C4C] mt-6">
                        {STRINGS.EMPLOYEE_LANDING_INFO}
                    </p>
                </div>
            </div>
        </div>
    );
 }

 export default ForWhom