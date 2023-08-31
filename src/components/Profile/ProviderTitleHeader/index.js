/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { BsTrophyFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
import { CiCompass1 } from "react-icons/ci";
import { AiFillPhone, AiFillEdit } from "react-icons/ai";
import React, { useCallback, useEffect, useState } from "react";
import { getKeyByValueAsArray, isObjEmpty } from "../../utils";
import ProviderService from "../../../services/userServices/ProviderService";
import AvailableHours from "../../AvailableHours";
import { ProviderContactForm } from "../ProviderContactForm";
import useTowns from "../../../hooks/Towns/useTowns";
import useProviderCategories from "../../../hooks/Provider/useProviderCategories";
/**
 * Provider header information component.
 *
 * @param {string} id - The ID of the provider.
 * @param {string} name - The name of the provider.
 * @param {array} categories - The categories of the provider.
 * @param {number} overallRanking - The overall ranking of the provider.
 * @param {string} phoneNumber1 - The first phone number of the provider.
 * @param {string} phoneNumber2 - The second phone number of the provider.
 * @param {string} email - The email address of the provider.
 * @param {string} websiteUrl - The website URL of the provider.
 * @param {string} addressLine1 - The first line of the address of the provider.
 * @param {string} addressLine2 - The second line of the address of the provider.
 * @param {string} country - The country of the provider.
 * @param {string} zipcode - The zipcode of the provider.
 * @param {boolean} allowFunctionality - Flag indicating whether functionality is allowed.
 * @param {string} townId - The ID of the town.
 * @param {array} providerCategory - The provider category.
 * @param {function} doRetryProvider - Function to retry fetching provider data.
 * @returns {JSX.Element} - The Provider header information component.
 */
export default function ProviderTitleHeader({
    id,
    name,
    categories,
    overallRanking,
    phoneNumber1,
    phoneNumber2,
    email,
    websiteUrl,
    addressLine1,
    addressLine2,
    country,
    zipcode,
    allowFunctionality = false,
    townId,
    providerCategory,
    doRetryProvider,
    isCenterClosed,
    isTemporarilyClosed,
    schedule
}) {
    const colour = `text-${overallRanking >= 7 ? 'green' : overallRanking >= 4 ? 'yellow' : 'red'}-500`
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState({ phoneNumber1, phoneNumber2, email, websiteUrl, addressLine1, addressLine2, country, zipcode, townId, providerCategory })
    const [town, setTown] = useState([])
    const [providerCategories, setProviderCategories] = useState(new Map())
    const [errorMsg, setErrorMsg] = useState('')
    const [infoLoading, setInfoLoading] = useState(false)

    const { towns } = useTowns();

    const { categories: categoryList } = useProviderCategories();
    /**
     * useEffect hook to set the town state when towns data changes.
     * @param {array} towns - The towns data.
     */
    useEffect(() => {
        setTown(towns)
    }, [towns]);
    /**
     * useEffect hook to initialize the provider categories state based on category list and provider category data.
     *
     * @param {array} providerCategory - The provider category data.
     * @param {array} categoryList - The category list.
     */
    useEffect(() => {
        if (categoryList) {
            const tempMap = new Map()
            categoryList.forEach(entry => {
                if (providerCategory)
                    tempMap.set(entry, providerCategory.map(item => item.id).includes(entry.id))
                else
                    tempMap.set(entry, false)

            })
            setProviderCategories(tempMap)
        }
    }, [providerCategory, categoryList])
    /**
     * Handler function for changing checkbox values.
     *
     * @param {object} e - The event object.
     * @param {function} setFuncion - The setter function to update state.
     * @param {array} valorAnterior - The previous value of the state.
     */
    const manejadorChangeCheckbox = (e, setFuncion, valorAnterior) => {
        const mapToModify = new Map(valorAnterior)
        mapToModify.forEach((value, key) => {
            if (key.description === e.target.name) {
                mapToModify.set(key, e.target.checked)
            }
        })
        console.log(mapToModify)
        setFuncion(mapToModify)
    }
    /**
     * Callback function for submitting provider contact details.
     *
     * @param {object} errorMsgByName - The error messages by field name.
     */
    const submitProviderContactDetails = useCallback(async (errorMsgByName) => {

        setInfoLoading(true)

        if (isObjEmpty(errorMsgByName)) {
            form.providerCategory = getKeyByValueAsArray(providerCategories, true)
            try {
                const { data } = await new ProviderService().updateProviderContactDetails(id, form)

                data && setVisible(false)
                doRetryProvider(prevState => prevState + 1)
            }
            catch (error) {
                setErrorMsg('Error actualizando los datos del proveedor.')
            } finally {
                setInfoLoading(false)
            }
        }
    }, [form, providerCategories])

    return (
        <>
            {visible && <ProviderContactForm
                initialValues={{
                    phoneNumber1, phoneNumber2, email, websiteUrl, addressLine1, addressLine2, country, zipcode, townId, providerCategory
                }} form={form}
                providerCategories={providerCategories}
                handleSubmit={submitProviderContactDetails}
                setForm={setForm} name={name}
                town={town} manejadorChangeCheckbox={manejadorChangeCheckbox}
                setProviderCategories={setProviderCategories}
                visible={visible} setVisible={setVisible}
                submitError={errorMsg}
                loading={infoLoading}
            />}
            <div className="col-span-1 flex flex-col gap-2 p-3">
                {allowFunctionality && (
                    <div className="flex justify-end hover:cursor-pointer" onClick={() => setVisible(true)}>
                        <AiFillEdit size={20} />
                    </div>
                )}
                <h1 className="text-3xl font-semibold text-cyan-900">{name}</h1>
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row gap-3 items-start">
                        {categories.map((category, index) => (
                            <p key={index} className="py-0 my-0 text-sm font-semibold text-cyan-900 mb-2 italic">
                                {category?.description}
                                {index !== categories.length - 1 && ","}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-row gap-1 items-end">
                        <BsTrophyFill className={colour} size={20} />
                        <p className="py-0 my-0 font-semibold">{overallRanking} pts</p>
                    </div>
                </div>

                <div className="pt-4">
                    <h1 className="text-cyan-900 mb-3 font-bold">Contácto:</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3 items-center">
                            <AiFillPhone className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                            <p className="text-cyan-900 text-sm my-0 py-0">
                                {phoneNumber1}
                                {phoneNumber2 && ` | ${phoneNumber2}`}
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <GrMail className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                            <p className="text-cyan-900 text-sm my-0 py-0">{email}</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <TbWorld className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                            <p className="text-cyan-900 text-sm my-0 py-0">{websiteUrl}</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <CiCompass1 className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                            <p className="text-cyan-900 text-sm my-0 py-0">
                                {addressLine1}
                                {addressLine2 && `, ${addressLine2}`}
                                {towns.filter(item => item.id === townId).flatMap(item => item.name)[0] && `, ${towns.filter(item => item.id === townId).flatMap(item => item.name)[0]}`}
                                {country && `, ${country}`}
                                {zipcode && `, ${zipcode}`}
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <AvailableHours allowFunctionality={allowFunctionality}
                                id={id}
                                context="provider"
                                isCenterClosed={isCenterClosed}
                                isTemporarilyClosed={isTemporarilyClosed}
                                schedule={schedule}
                                doRetryProvider={doRetryProvider}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
