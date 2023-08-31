/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import BackArrow from "../../BackArrow/BackArrow";
import React from 'react'
import {STRINGS} from "../../../config/config";
import GovHeader from "../../Headers/GovHeader";

export default function CentralContainer({ children, context = '' }) {

    return (
        <>
            {context !== 'news' &&
                <>
                    <GovHeader 
                        title={STRINGS.GOV_HEADER_TXT}
                        description_left={STRINGS.GOV_HEADER_LEFT_TXT}
                        description_right={STRINGS.GOV_HEADER_RIGHT_TXT} />
                    <BackArrow />
                </>
            }
            <div className="flex flex-col w-full items-center justify-center">
                {
                    context === 'forgot' ?
                        <div className="flex flex-col items-center justify-center">
                            <div className="max-w-md mx-auto px-4">
                                {children}
                            </div>
                        </div>
                        :
                        <div className={"flex flex-col w-full items-center max-w-md gap-3"}>
                            
                            <div className={`${context === 'news' ? 'w-full md:w-2/3' : 'flex flex-col h-provider-register mx-4 md:mx-0'}`}>
                                {children}
                            </div>
                           
                        </div>

                        // //old layout
                        // <div className={"flex flex-wrap justify-center px-5"}>
                        //     <div className={`${context === 'news' ? 'w-full md:w-1/6' : 'sm:w-3/12 md:w-[12.5%] lg:w-1/3'}`}></div>
                        //     <div className={`${context === 'news' ? 'w-full md:w-2/3' : 'sm:w-3/12 md:w-3/4 lg:w-1/3'}`}>
                        //         {children}
                        //     </div>
                        //     <div className={`${context === 'news' ? 'w-full md:w-1/6' : 'sm:w-3/12 md:w-[12.5%] lg:w-1/3'}`}></div>
                        // </div>
                }
            </div>

        </>
    )
}