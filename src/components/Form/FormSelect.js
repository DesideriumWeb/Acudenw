import stylesCommunityRegister from "../../css/Authentication/CommunityRegister.module.css";
import stylesAuthentication from "../../css/Authentication/Authentication.module.css"
import React from 'react'

export default function FormSelect({
    title,
    name,
    value,
    setValue,
    items, onChangeHandler, error = null, defaultValue, placeholder = 'Seleccione'
}) {

    return (
        <>
            <div className="flex flex-col space-y-4">
                {title && <label className="block">
                    <span className="text-gray-800">{title}:</span>
                </label>}
            </div>
            <select
                name={name}
                title={title}
                onChange={(e) => onChangeHandler(e, setValue)}
                className={`block w-full px-3 py-2 text-base font-normal leading-6 text-gray-700
                bg-white bg-clip-padding-box border border-gray-300 rounded-md focus:outline-none
                focus:border-blue-500 transition duration-150 ease-in-out mt-2 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                value={value}
                defaultValue={defaultValue}
            >
                <option value="">{placeholder}</option>

                {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </>
    )
}