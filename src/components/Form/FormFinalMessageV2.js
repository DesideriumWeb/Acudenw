/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";

export default function FormFinalMessageV2(props) {

    return (
        <div className={'w-full flex flex-col justify-center mx-auto'}>
            <img className={'mx-auto mt-10'} src={props.image} alt="img check"  width={`23%`}/>
            <div className="flex justify-center">
                <h1 className={'text-[#092C4C] text-lg text-center mt-4 font-bold'}>
                    {props.mainTitle}
                </h1>
            </div>
            <div className={'text-[#092C4C] text-sm text-center mt-2'}> {props.children}</div>
        </div>
    )
}