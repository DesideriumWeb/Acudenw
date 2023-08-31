/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'
import stylesCommunityRegister from '../../css/Authentication/CommunityRegister.module.css'
export default function FormTextArea({title, name, placeholder, onChangeHandler, setValue, maxLength = 1000, rows = 4, required = true, error = null, defaultValue = ''}) {
    return (
        <>
            <p className="font-semibold">{title}:</p>
            <hr className="my-4"/>
            <textarea
                name={name}
                title={title}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                onChange={(e)=>onChangeHandler(e, setValue)}
                className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required={required}>
                {defaultValue}
            </textarea>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </>
    )
}
