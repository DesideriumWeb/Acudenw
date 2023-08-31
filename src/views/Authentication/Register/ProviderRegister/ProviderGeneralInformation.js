/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from 'react';
import TownService from "../../../../services/cmsServices/TownService.js"
import FormTitle from "../../../../components/Form/FormTitle";
import stylesAuthentication from "../../../../css/Authentication/Authentication.module.css";
import FormCheckBox from "../../../../components/Form/FormCheckBox";
import ProviderCategoryService from '../../../../services/cmsServices/ProviderCategoryService';
import ServiceCategoryService from '../../../../services/cmsServices/ServiceCategoryService';
import FormInput from "../../../../components/Form/FormInput";
import { getKeyByValueAsArray } from "../../../../components/utils";
import FormSelect from '../../../../components/Form/FormSelect';
import { FormInputFile } from '../../../../components/Form/FormInputFile';
import { useFormValidator } from "../../../../hooks/useFormValidator";
import { CENTER_CLOSED_OPTIONS } from '../../../../config/config.js';

export function ProviderGeneralInformation(props) {
    const [errorMsg, setErrorMsg] = useState(true)
    const [providerCategories, setProviderCategories] = useState(new Map())
    const [providerServices, setServiceCategory] = useState(new Map())
    const [urlLicence, setFileUrl] = useState()
    const [town, setTown] = useState([])
    const minYear = new Date().getFullYear() - 100
    const maxYear = new Date().getFullYear()

    const [errorMsgByName, setErrorMsgByName] = useState({
        name: '',
        uniqueNumber: '',
        fipsNumber: '',
        ownerFullName: '',
        foundedDate: '',
        employeeQuantity: '',
        phoneNumber1: '',
        phoneNumber2: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        zipcode: '',
        country: '',
        totalCapacity: '',
        infantCapacity: '',
        maternalCapacity: '',
        preschoolCapacity: '',
        schoolAgeCapacity: '',
        kidQTyWithSubsidy: '',
        isCenterClose: ''
    })
    const invalidValues = useFormValidator(props.form, [
        "name",
        "uniqueNumber",
        "fipsNumber",
        "ownerFullName",
        "foundedDate",
        "employeeQuantity",
        "phoneNumber1",
        "addressLine1",
       // "addressLine2",
        "town",
        "zipcode",
        //"country",
        "totalCapacity",
        "infantCapacity",
        "maternalCapacity",
        "preschoolCapacity",
        "schoolAgeCapacity",
        "kidQTyWithSubsidy",
        "isCenterClose",
    ])

    const manejadorChangeCheckbox = (e, setFuncion, valorAnterior) => {
        const mapToModify = new Map(valorAnterior);
        mapToModify.forEach((value, key) => {
            if (key.description === e.target.name) {
                mapToModify.set(key, e.target.checked);
            }
        });

        setFuncion(mapToModify);

    };


    const manejadorChange = (e, setValue) => {
        props.setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        // invalidValues
        if (invalidValues?.length > 0) {
            setErrorMsgByName((prevState) => ({
                [invalidValues]: `${document.getElementsByName(invalidValues)[0].title} es Inválido.`,
            }))
        } else if (getKeyByValueAsArray(providerCategories, true).length === 0) {
            setErrorMsgByName(() => ({
                ['providerCategories']: 'Categoría es requerida.'
            }))
        } else if (getKeyByValueAsArray(providerServices, true).length === 0) {
            setErrorMsgByName(() => ({
                ['providerServices']: 'Servicio es requerido.'
            }))
        } else {

            setErrorMsgByName({})
        }
        props.setForm((prevState) => ({
            ...prevState,
            providerCategories: getKeyByValueAsArray(providerCategories, true),
            providerServices: getKeyByValueAsArray(providerServices, true),
            urlLicence: urlLicence?.file || ""
        }))
    }, [providerCategories, providerServices, urlLicence, invalidValues])

    useEffect(() => {
        props.setCanContinue(Object.keys(errorMsgByName).length === 0)
    }, [errorMsgByName])

    useEffect(() => {
        const fetchTowns = async () => {
            const { data } = await TownService.getAll()
            setTown(data.data)
        }
        const fetchCategories = async () => {
            const { data } = await ProviderCategoryService.getAll()
            const tempMap = new Map()
            data.data.forEach(entry => {
                tempMap.set(entry, false)
            })
            setProviderCategories(tempMap)
        }
        const fetchServices = async () => {
            const { data } = await ServiceCategoryService.getAll()
            const tempMap = new Map()
            data.data.forEach(entry => {
                tempMap.set(entry, false)
            })
            setServiceCategory(tempMap)
        }
        fetchTowns()
        fetchCategories()
        fetchServices()
    }, [])

    return (
        <>
            <FormTitle mainTitle={"Registro Único De Centros"} style={`bg-[#B8E5E3] font-sm mb-2 font-sans rounded-lg mt-4`}>
                <div className="alert alert-secondary mt-4" role="alert">
                    <strong>Todos los campos son requeridos</strong>
                </div>
            </FormTitle>
            {props.errorMsg &&
                <div className="bg-red-500 text-white p-3 rounded text-center mt-3" role="alert">
                    {props.errorMsg}
                </div>
            }
            <div className='container mt-4'>
                <form className='w-full' onSubmit={(e) => e.preventDefault()}>
                    <div className='grid'>
                        <div className='grid grid-cols-1 gap-4'>

                            <FormInput title={"Nombre del Centro"} type={"text"} name={"name"} placeholder={"Nombre de la empresa"} setValue={props.setForm} defaultValue={props.form.name} onChangeHandler={manejadorChange} error={errorMsgByName.name} />
                            <FormInput title={"Número único del proveedor"} type={"text"} name={"uniqueNumber"} placeholder={"Número único del proveedor"} setValue={props.setForm} defaultValue={props.form.uniqueNumber} onChangeHandler={manejadorChange} error={errorMsgByName.uniqueNumber} />
                            <FormInput title={"Número FIPS del proveedor"} type={"text"} name={"fipsNumber"} placeholder={"Número FIPS del proveedor"} setValue={props.setForm} defaultValue={props.form.fipsNumber} onChangeHandler={manejadorChange} error={errorMsgByName.fipsNumber} />

                            <div className='pl-2'>
                                <p className="mb-2 text-lg font-bold">Categoría del Centro</p>
                                {errorMsgByName && errorMsgByName.providerCategories && (
                                    <p className="text-red-500 text-sm mt-1">{errorMsgByName.providerCategories}</p>
                                )}
                                {Array.from(providerCategories.keys()).map((item, index) => (
                                    <FormCheckBox key={index} id={item.description} name={item.description}
                                                  checked={providerCategories.get(item)}
                                                  onChangeHandler={manejadorChangeCheckbox}
                                                  setFuncion={setProviderCategories}
                                                  valorAnterior={providerCategories} label={item.description} />
                                ))}
                                <p className="mb-2 text-lg font-bold mt-4">Categoría del Servicio</p>
                                {errorMsgByName && errorMsgByName.providerServices && (
                                    <p className="text-red-500 text-sm mt-1">{errorMsgByName.providerServices}</p>
                                )}
                                {Array.from(providerServices.keys()).map((item, index) => (
                                    <FormCheckBox key={index} id={item.description} name={item.description}
                                                  checked={providerServices.get(item)}
                                                  onChangeHandler={manejadorChangeCheckbox}
                                                  setFuncion={setServiceCategory}
                                                  valorAnterior={providerServices}
                                                  label={item.description} />
                                ))}

                            </div>
                            <FormInput title={"Nombre y Apellidos del(la) dueño(a)"} type={"text"} name={"ownerFullName"} placeholder={"Nombre y Apellidos"} defaultValue={props.form.ownerFullName} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.ownerFullName} />
                            <div className="flex flex-col sm:flex-row -mt-6 w-full ">
                                <FormInput title={"Año de fundación"} type={"number"} name={"foundedDate"} placeholder={"Año"} min={minYear} max={maxYear} maxLength={4} setValue={props.setForm} defaultValue={props.form.foundedDate} onChangeHandler={manejadorChange} error={errorMsgByName.foundedDate} />
                                <FormInput title={"Total de empleados(as)"} type={"number"} name={"employeeQuantity"} placeholder={"Número de empleados"} defaultValue={props.form.employeeQuantity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.employeeQuantity} />
                            </div>
                            <div className="flex flex-col sm:flex-row -mt-6 w-full">
                                <FormInput title={"Teléfono 1"} type={"tel"} pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"} name={"phoneNumber1"} maxLength={14} defaultValue={props.form.phoneNumber1} setValue={props.setForm} placeholder={"000-000-0000"} onChangeHandler={manejadorChange} error={errorMsgByName.phoneNumber1} />
                                <FormInput title={"Teléfono 2 (Opcional)"} type={"tel"} pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"} name={"phoneNumber2"} maxLength={14} defaultValue={props.form.phoneNumber2} setValue={props.setForm} placeholder={"000-000-0000"} onChangeHandler={manejadorChange} error={errorMsgByName.phoneNumber2} />
                            </div>

                            <FormInput title={"Dirección"} type={"text"} name={"addressLine1"} placeholder={"Dirección"} setValue={props.setForm} defaultValue={props.form.addressLine1} onChangeHandler={manejadorChange} error={errorMsgByName.addressLine1} />
                            <FormInput title={"Dirección línea 2 (Opcional)"} type={"text"} name={"addressLine2"} placeholder={"Dirección"} setValue={props.setForm} defaultValue={props.form.addressLine2} onChangeHandler={manejadorChange} error={errorMsgByName.addressLine2} />

                            <div className="flex flex-row -mt-6 w-full">
                                <div className="w-full my-4 mr-2">
                                    {<FormSelect title={"Pueblo"} name={"town"} value={props.form["town"]} items={town} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.town} />}
                                </div>

                                <FormInput title={"Código postal"} type={"text"} name={"zipcode"} placeholder={"00000"} maxLength={5} defaultValue={props.form.zipcode} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.zipcode} />
                            </div>
                            <FormInput disable={true} title={"País"} type={"text"} name={"country"} placeholder={"PR"} defaultValue={`PR`} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.country} />

                            <div className="mt-4 p-2">
                                <FormInputFile file={urlLicence} setFileUrl={setFileUrl} title={`Adjuntar licencia`} />
                            </div>
                            <FormInput title={"Capacidad total que permite la licencia"} type={"number"} name={"totalCapacity"} placeholder={"Capacidad total que permite la licencia"} defaultValue={props.form.totalCapacity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.totalCapacity} />
                            <FormInput title={"Capacidad total de infantes que permite la licencia"} type={"number"} name={"infantCapacity"} placeholder={"Capacidad total de infantes que permite la licencia"} defaultValue={props.form.infantCapacity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.infantCapacity} />
                            <FormInput title={"Capacidad total de maternales que permite la licencia"} type={"number"} name={"maternalCapacity"} placeholder={"Capacidad total de maternales que permite la licencia"} defaultValue={props.form.maternalCapacity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.maternalCapacity} />
                            <FormInput title={"Capacidad total de preescolares que permite la licencia"} type={"number"} name={"preschoolCapacity"} placeholder={"Capacidad total de preescolares que permite la licencia"} defaultValue={props.form.preschoolCapacity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.preschoolCapacity} />
                            <FormInput title={"Capacidad de edad escolar que permite la licencia"} type={"number"} name={"schoolAgeCapacity"} placeholder={"Capacidad de edad escolar que permite la licencia"} defaultValue={props.form.schoolAgeCapacity} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.schoolAgeCapacity} />
                            <FormInput title={"Cantidad de niños que reciben subsidios al momento de la solicitud"} type={"number"} name={"kidQTyWithSubsidy"} placeholder={"Cantidad de niños que reciben subsidios al momento de la solicitud"} defaultValue={props.form.kidQTyWithSubsidy} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.kidQTyWithSubsidy} />
                            <div className="w-full my-4">
                                {<FormSelect title={"¿El centro está temporeramente cerrado?"} name={"isCenterClose"} value={props.form["isCenterClose"]} items={CENTER_CLOSED_OPTIONS} setValue={props.setForm} onChangeHandler={manejadorChange} error={errorMsgByName.isCenterClose} />}
                            </div>
                        </div>
                    </div>
                </form >

            </div >

        </>

    );
}
