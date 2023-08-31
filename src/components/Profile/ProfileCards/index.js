/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useCallback, useMemo, useState} from 'react'
import {AcceptanceButton} from "../../Buttons";

export default function ProfileCards({items = [], context = '', actionHandler = null, badgeColor = null}) {
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState({})

    const submitForm = useCallback(async (form) => {
        if (context === 'education') {

        } else if (context === 'labor') {

        }
    }, [form, context])

    const footer = useMemo(async () => {
        return (
            <AcceptanceButton title={'Guardar Cambios'} onClickHandler={() => submitForm(form)}/>
        )
    }, [context, items, form])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map(({date, title, subTitle, description, icon, action}, index) => (
                <div key={index} className="flex flex-col gap-2 rounded-md shadow-small p-5">
                    <p className="my-0 py-0">{date}</p>
                    <div className={`px-2 ${badgeColor ? `bg-${badgeColor}` : 'bg-yellow-500'} bg-opacity-40 w-fit text-sm rounded-sm py-1 font-semibold`}>
                    {title}
                    </div>
                    <h2 className="font-semibold text-xl">{subTitle}</h2>
                    <p className="my-0 py-0 text-sm">{description}</p>
                    <div className="flex flex-row gap-2 items-center mt-2">
                        {icon && (
                            <>
                                {icon}
                                <p className="my-0 py-0 text-sm">{action}</p>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
