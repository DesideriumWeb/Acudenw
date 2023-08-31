/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react"
import { checkIfPhoneNumberIsValid, formatPhoneNumber, isNumberBetween } from "../utils";

export default function FormInput({
    type, name, title, onChangeHandler, placeholder, disable = false,
    setValue, min = 1, max = 100, pattern = '', required= true,
    minLength = 1, maxLength = 1000, error = null, defaultValue, value
}) {

    const props = {
        date: {
            type, name, title, placeholder, pattern,
            onChange: (e) => {
                if (name.includes('birth')) {
                    if ((new Date().getFullYear() - new Date(e.target.value).getFullYear()) > 17) {
                        onChangeHandler(e, setValue)
                    } else {
                        setValue((prevState) => ({
                            ...prevState,
                            [name]: undefined
                        }))
                    }
                } else {
                    onChangeHandler(e, setValue)
                }
            }, defaultValue, value
        },
        "datetime-local": {
            type, name, title, placeholder, pattern,
            onChange: (e) => {
                if (name.includes('birth')) {
                    if ((new Date().getFullYear() - new Date(e.target.value).getFullYear()) > 17) {
                        onChangeHandler(e, setValue)
                    } else {
                        setValue((prevState) => ({
                            ...prevState,
                            [name]: undefined
                        }))
                    }
                } else {
                    onChangeHandler(e, setValue)
                }
            }
        },
        number: {
            type, name, title, min, max, placeholder,
            onChange: (e) => {
                const val = parseInt(e.target.value)
                if (isNumberBetween(val, min, max) && isNumberBetween(e.target.value.length, minLength, maxLength)) {
                    onChangeHandler(e, setValue)
                } else {
                    setValue((prevState) => ({
                        ...prevState,
                        [name]: undefined
                    }))
                    error = 'invalid number'
                }
            },
            minLength, maxLength, defaultValue
        },
        text: {
            type, name, title, placeholder,
            onChange: (e) => {
                if (isNumberBetween(e.target.value.length, minLength, maxLength)) {
                    onChangeHandler(e, setValue)
                } else {
                    setValue((prevState) => ({
                        ...prevState,
                        [name]: undefined
                    }))
                }
            }, value,
            minLength, maxLength, defaultValue
        },
        password: {
            type, name, title, placeholder,
            onChange: (e) => {
                onChangeHandler(e, setValue)
            }, defaultValue
        },
        tel: {
            type, name, title, placeholder, pattern,
            onChange: (e) => {
                if (e.nativeEvent.inputType === "deleteContentBackward") {
                    onChangeHandler(e, setValue)
                    return;
                }
                const unformattedNumber = e.target.value
                e.target.value = formatPhoneNumber(e.target.value)
                if (checkIfPhoneNumberIsValid(unformattedNumber) && isNumberBetween(unformattedNumber.length, minLength, maxLength)) {
                    onChangeHandler(e, setValue)
                }
            },
            minLength, maxLength, defaultValue
        }
    }

    return (
        <div className="w-full my-4 mr-2">
            <div className="flex flex-col space-y-4">
                <label className="block">
                    <span className="text-gray-800">{title}:</span>
                </label>
            </div>
            <input
                {...props[type]}
                className={`block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2`}
                required={required} // Can be modified in the future, or use the formValidator
                disabled={disable}
                title="No Valid"
                oninput="this.setCustomValidity('')"
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
