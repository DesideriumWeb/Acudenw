import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsClockFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import FormInput from "../Form/FormInput";
import ProviderService from "../../services/userServices/ProviderService";
import FormSelect from "../Form/FormSelect";
import { AcceptanceButton, RejectButton } from "../Buttons";
import FormCheckBox from "../Form/FormCheckBox";
import triangleExclamation from '../../assets/images/icons/triangle-exclamation-solid 4.svg'
import { Toast } from 'primereact/toast';
import { availableProviderHours, defaultSchedule } from '../../config/config';
import { compareTimes } from '../utils';


export default function AvailableHours({ id, context, allowFunctionality = false, isCenterClosed, isTemporarilyClosed, schedule, doRetryProvider }) {

    const [visible, setVisible] = useState(false)
    const [newSchedule, setNewSchedule] = useState(schedule ?? defaultSchedule)
    const [temporaryClosed, setTemporaryClosed] = useState(false)
    const [permanentlyClosed, setPermanentlyClose] = useState(false)

    /**
       * Toast ref req.
       */
    const toastRef = useRef(null);

    const onChangeHandler = (e, setValue) => {
        setNewSchedule((prevState) => ({
            ...prevState,
            [e.target.name.split('.')[0]]: {
                ...prevState[e.target.name.split('.')[0]],
                [e.target.name.split('.')[1]]: e.target.value
            }
        }))
    }

    const submitWorkSchedule = useCallback(async () => {

        try {
            let result = await new ProviderService().setWorkSchedule(newSchedule, temporaryClosed, permanentlyClosed)

            doRetryProvider((prevState) => prevState + 1)
            showToastSuccess("Se ha editado exitosamente.")
            result && setVisible(false)
        }
        catch (error) {
            showToastError("Se ha producido un error al modificar horario.")
            setVisible(false)
        }
    }, [newSchedule, permanentlyClosed, temporaryClosed])

    const footer = () => {
        const array = Array.from(Object.keys(newSchedule));
        const invalidTimeCombination = array.some((item, index) => newSchedule[item].desde && newSchedule[item].hasta && compareTimes(newSchedule[item].desde, newSchedule[item].hasta) >= 0)
        const missingCombination = array.some((item, index) => newSchedule[item].desde && !newSchedule[item].hasta || !newSchedule[item].desde && newSchedule[item].hasta)
        return <div className='flex flex-row justify-end'>
            <RejectButton title="Cancelar" onClickHandler={() => setVisible(false)} />
            <AcceptanceButton title={'Guardar Cambios'} disabled={missingCombination || invalidTimeCombination} onClickHandler={submitWorkSchedule} />
        </div>
    }

    useEffect(() => {
        setNewSchedule({ ...defaultSchedule, ...schedule })
        setTemporaryClosed(isTemporarilyClosed)
        setPermanentlyClose(isCenterClosed)
    }, [id, schedule, isTemporarilyClosed, isCenterClosed, visible])

    const showToastSuccess = (message) => {
        toastRef.current.show({ severity: 'success', summary: 'Modificar Horario', detail: message })
    }
    const showToastError = (message) => {
        toastRef.current.show({ severity: 'error', summary: 'Modificar Horario', detail: message })
    }

    return (
        <>
            <Dialog resizable={false} draggable={false} className='max-w-[90%] md:max-w-[45%] lg:max-w-[40%]' header={<h5>Horario:</h5>} visible={visible} onHide={() => setVisible(false)} footer={footer}>
                <hr className="mb-4" />
                <div className="grid grid-rows-7 gap-1">
                    <ul className="list-none">
                        {Array.from(Object.keys(newSchedule)).map((item, index) => {
                            const invalidTimeCombination = newSchedule[item].desde && newSchedule[item].hasta && compareTimes(newSchedule[item].desde, newSchedule[item].hasta) >= 0;
                            const missingCombination = newSchedule[item].desde && !newSchedule[item].hasta || !newSchedule[item].desde && newSchedule[item].hasta;

                            return (

                                <div className="flex flex-col lg:flex-row mx-auto justify-items-center md:justify-between w-full gap-2" key={index}>
                                    <div className="flex items-center mx-auto ">
                                        <span className="bg-[#92DCB7] w-24 text-center text-[#1E1E1E] px-2 py-1 rounded-md">{item}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between mb-4 w-full gap-2">
                                        <FormSelect
                                            setValue={setNewSchedule}
                                            value={newSchedule[item].desde}
                                            onChangeHandler={onChangeHandler}
                                            name={`${item}.desde`}
                                            placeholder="Desde"
                                            items={availableProviderHours}
                                            className="w-full"
                                        />

                                        <FormSelect
                                            setValue={setNewSchedule}
                                            value={newSchedule[item].hasta}
                                            onChangeHandler={onChangeHandler}
                                            name={`${item}.hasta`}
                                            placeholder="Hasta"
                                            items={availableProviderHours}
                                            className="w-full"
                                        />
                                        {
                                            (invalidTimeCombination || missingCombination) && <img className='w-8' src={triangleExclamation} title='Combinación incorrecta de horas' alt="React Logo" />
                                        }

                                    </div>
                                    <hr className="my-2" />
                                </div>

                            )
                        })}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <div className="">
                        <FormCheckBox
                            name="temporaryClosed"
                            id="temporaryClosed"
                            label="Temporeramente Cerrado"
                            valorAnterior={temporaryClosed}
                            checked={temporaryClosed}
                            onChangeHandler={(e, setFuncion, valorAnterior) => setTemporaryClosed(!valorAnterior)}
                            setFuncion={setTemporaryClosed}
                            disabled={permanentlyClosed}
                        />
                    </div>
                    <div className="">
                        <FormCheckBox
                            name="permanentlyClosed"
                            id="permanentlyClosed"
                            label="Permanentemente Cerrado"
                            valorAnterior={permanentlyClosed}
                            checked={permanentlyClosed}
                            onChangeHandler={(e, setFuncion, valorAnterior) => setPermanentlyClose(!valorAnterior)}
                            setFuncion={setPermanentlyClose}
                            disabled={temporaryClosed}
                        />
                    </div>
                </div>

            </Dialog>
            <Toast ref={toastRef} />
            <BsClockFill className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
            <div className="flex flex-row text-cyan-900 text-sm">
                {!(isTemporarilyClosed || isCenterClosed) ? (
                    <ul>
                        {!schedule && <p>No hay horarios disponibles.</p>}
                        {schedule && Array.from(Object.keys(schedule)).map((item, index) => (
                            <li key={index}>
                                <span>{item}: {!schedule[item]["desde"] && !schedule[item]["hasta"] ? 'Cerrado' : schedule[item]["desde"] + " - " + schedule[item]["hasta"]}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-0 my-0">{isTemporarilyClosed ? 'Temporeramente' : isCenterClosed ? 'Permanentemente' : ''} cerrado</p>
                )}
                {allowFunctionality && (
                    <div className="flex my-auto justify-end hover:cursor-pointer ml-2" onClick={() => setVisible(true)}>
                        <AiFillEdit size={20} />
                    </div>
                )}
            </div>

        </>
    )
}