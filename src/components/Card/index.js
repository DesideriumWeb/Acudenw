/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useCallback, useMemo, useState} from 'react'
import {BsFillTrophyFill} from "react-icons/bs";
import {IoPersonCircle, IoPersonCircleSharp} from "react-icons/io5";
import {useSelector} from "react-redux";
import {Tooltip} from "primereact";
import {Dialog} from "primereact/dialog";
import {AcceptanceButton} from "../Buttons";
import FormInput from "../Form/FormInput";
import { FaRocket } from "react-icons/fa";
import SmallSpinner from "../General/SmallSpinner";

export function Card(props) {
    return (
        <div className={"card rounded shadow-sm"}>
            <div className={"card-body"}>
                {props.children}
            </div>
        </div>
    )
}

export function CardTitle({icon = <></>, title, buttonTitle, onClickHandler = null, className = '', useSpinner = false, loading = false}) {

    return (
        <div className={`flex flex-row items-center justify-between ${className}`}>
            <h1 className="flex flex-row gap-2 items-center text-[#092C4C] font-semibold text-base">
                {icon} {title}
                {
                    useSpinner && <SmallSpinner loading={loading}/>
                }
            </h1>
            {buttonTitle && <button
                className={`text-[#092C4C] w-fit px-4 py-2 rounded-md border-2 border-[#092C4C] hover:border-[#A7D02A] hover:bg-[#A7D02A] font-semibold ${ title.includes('Mis Empleados') ? 'acu-emp-step-5' : ''} ${title.includes('Mis empleados') ? 'acu-pro-step-5':''}`}
                onClick={onClickHandler}>
                {buttonTitle}
            </button>}
        </div>
    )
}

export function CardBodyWithImage({
                                      title,
                                      subTitle,
                                      image = '',
                                      score = undefined,
                                      buttonTitle,
                                      onClickHandler,
                                      additionalInformation = []
                                  }) {

    const colour = `text-${score >= 7 ? 'green' : score >= 4 ? 'yellow' : 'red'}-500`

    return (
        <div className="flex flex-col gap-2 items-center mt-4 flex-1 justify-between">
            {!image ?
                <IoPersonCircle size={112} className="acu-blue"/> :
                <img
                    src={image}
                    alt="profile"
                    className="h-28 w-28 rounded-full"
                />
            }

            <div className="text-center">
                <h4 className="text-lg font-semibold my-0 py-0">{title}</h4>
                <h6>{subTitle}</h6>
            </div>
            <div className={'flex grid-rows-1'}>
                <div className={'grid grid-cols-3 gap-2'}>
                    {additionalInformation.map(({title, subTitle}, index) => (
                        <div key={index}>
                            <label className={'font-bold'}>{title}</label> <br/>
                            <span className={'my-0 py-0'}>{subTitle}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`flex flex-row items-center justify-between w-full`}>
                <div className="flex items-center gap-2 acu-pro-step-4">
                    <FaRocket
                        className={colour}
                        size={20}
                    />
                    <span className="font-bold text-xl">{(score ? score.toFixed(2) : 0.00)}</span>
                </div>

                {buttonTitle && <button
                    onClick={onClickHandler}
                    className="text-[#092C4C] hover:text-[#092C4C] w-fit px-4 py-2 rounded-md border-2 border-[#092C4C] hover:border-white hover:bg-[#A7D02A] font-semibold acu-emp-step-3">
                    {buttonTitle}
                </button>}
            </div>
        </div>
    )
}

export function CardWithSideImage({items = [], firstAction, secondAction}) {
    const {typeOfUser} = useSelector((state) => state.user)

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-12'}>
            {items.length === 0 ? <>
                <div className={'flex-col col-span-full'}>
                    <h1 className={'justify-end font-bold'}>Nada para demostrar</h1>
                </div>
            </> : items.map(({eventDate, eventType, name, description, location}, index) => (
                <div key={index}
                     className="flex flex-row justify-start items-center gap-3 shadow-md rounded-lg overflow-hidden">
                    <div className="flex-1 bg-black h-full">
                        <img
                            src=""
                            alt="img"
                            width={200}
                            height={24}
                            className="object-cover h-full"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center flex-[2] py-8 gap-3">
                        <p className="text-sky-600 my-0 py-0">{new Date(eventDate).toDateString()}</p>
                        <h2 className="font-semibold text-xl">{name}</h2>
                        <p className="text-sm my-0 py-0">{location}</p>
                        <div className="flex flex-row gap-1 items-center">
                            {/*TODO: Turn icon into optional param for future use.*/}
                            <IoPersonCircleSharp size={40} color="#43f"/>
                            {description}
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                            {firstAction && <button
                                onClick={firstAction.onClickHandler}
                                value={JSON.stringify(items[index])}
                                className="border-blue-700 text-blue-700 border-2 p-3 rounded-md px-5">
                                {firstAction.title}
                            </button>}
                            {secondAction && <>
                                {typeOfUser.toLowerCase().includes('provider') &&
                                    <Tooltip position={'top'} target={'.bg-blue-700'}>
                                        Registrate desde una cuenta de &quot;Empleado&quot;
                                    </Tooltip>}
                                <button
                                    onClick={(e) => {
                                        !typeOfUser.toLowerCase().includes('provider') && secondAction.onClickHandler(JSON.stringify(items[index]))
                                    }}
                                    className="bg-blue-700 p-3 text-white rounded-md px-5">
                                    {secondAction.title}
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

