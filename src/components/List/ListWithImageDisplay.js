/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from "react";
import {FaAward} from "react-icons/fa";
import {Link} from "react-router-dom";
import circleMinusSolid from './../../assets/images/icons/circle minus solid 1.svg'
import circleExclamationSolid from '../../assets/images/icons/circle-exclamation-solid 2.svg'
import {ConfirmDialog, ConfirmPopup} from "primereact";
import {PORTAL_ROUTES} from "../../config/config";


export default function ListWithImageDisplay({
                                                 items = [],
                                                 firstAction = undefined,
                                                 secondAction = undefined,
                                                 title = undefined
                                             }) {

    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false)
    const [selected, setSelected] = useState({})

    return (
        <div
            className={'rounded-md flex flex-col gap-3 p-2 overflow-y-auto custom-scroll'}>
            {(firstAction && selected) &&
                
                <ConfirmDialog visible={confirmPopupVisible} onHide={() => setConfirmPopupVisible(false)}
                               header={"Eliminar empleado"}
                               message={`¿Deseas remover a  ${selected?.fullname || selected?.email} de tus empleados?`}
                               icon={circleExclamationSolid}
                               accept={() => {firstAction(selected?.id)}} acceptLabel={"Eliminar"} acceptClassName={"flex text-lg rounded-md border-0 bg-[#092C4C] hover:bg-[#A7D02A]"} 
                               reject={() => setConfirmPopupVisible(false)} rejectLabel={"Cancelar"} rejectClassName={"flex text-lg rounded-md border-0 bg-[#092C4C] hover:bg-[#A7D02A]"}
                               className={"text-lg z-50"}
                               
                />}
            {title && <h1 className={'text-white'}>{title}</h1>}
            {items.length > 0 ?
                items.map(
                (item, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-md flex justify-between flex-row items-center p-3 gap-2"
                    >
                        {item?.profilePicture && <img
                            src="https://thispersondoesnotexist.com/image"
                            className="w-20 h-20 bg-emerald-600 rounded-full"
                            alt="person"
                        />}
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold my-0 py-0 hover:underline">
                                <Link className={'text-inherit'}
                                      to={`${PORTAL_ROUTES.PROVIDER_EMPLOYEE_ROUTE}${item.id}`}>{item.fullname}</Link>
                            </p>
                            {item?.email && (<div
                                className="flex flex-row gap-1 items-center text-sm text-black">
                                {item.email}
                            </div>)}
                            {item?.occupation && (<div
                                className="flex flex-row gap-1 items-center text-sm text-black">
                                {item.occupation}
                            </div>)}
                            {item?.description && (<div
                                className="flex flex-row gap-1 items-center text-sm text-black">
                                {item.description}
                            </div>)}
                            {item?.diploma && (<div className="flex flex-row gap-1 items-center">
                                {item.institute && <>
                                    <p className="text-sm my-0 py-0">{item.institute}</p>
                                    <br/>
                                </>}
                                <FaAward className="text-green-500" size={16}/>
                                <p className="text-sm my-0 py-0">{item.diploma}</p>
                            </div>)}
                        </div>

                        {!!firstAction && <>
                            {/*<ConfirmPopup
                        target={document.getElementById(item.id)}
                        visible={confirmPopupVisible}
                        onHide={() => setConfirmPopupVisible(false)}
                        message={`¿Deseas remover a ${item.fullname} de tus empleados?`}
                        icon={'pi pi-exclamation-triangle'}
                        accept={() => {
                            firstAction(item.id)
                        }} reject={() => setConfirmPopupVisible(false)}
                    />*/}
                            <div className={'flex flex-col items-end hover:cursor-pointer'}
                                 onClick={() => {
                                     setConfirmPopupVisible(true)
                                     setSelected(item)
                                 }}>
                                <img id={item.id} key={`deleteIcon ${index}`} src={circleMinusSolid}/>
                            </div>
                        </>}
                    </div>
                )
            ):
                <>
                    <h1 className="text-[#092C4C] font-semibold">No hay empleados disponibles.</h1>
                </>
            }
        </div>

    )
}