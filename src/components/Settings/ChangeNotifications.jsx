import React, {useCallback, useState} from 'react'
import {AcceptanceButton} from "../Buttons";
import {Checkbox} from "primereact";

export default function ChangeNotifications() {
    const [eventCheck, setEventCheck] = useState(false)
    const [platformCheck, setPlatformCheck] = useState(false)

    const onChangeHandler = useCallback(async () => {
        //    TODO: Hit The API my dude
    }, [eventCheck, platformCheck])

    return (
        <>
            <div>
                <h2 className="tw-font-semibold tw-text-lg tw-mb-6">
                    Notificaciones por correo tardar 24 horas en reflejarse
                </h2>
                <div className="tw-flex tw-flex-row tw-items-start tw-gap-2 tw-mb-2">
                    <Checkbox
                        className="tw-mt-[6px]"
                        onChange={() => {
                            setEventCheck((p) => !p);
                        }}
                        checked={eventCheck}
                    />
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        <p className="tw-text-lg tw-font-medium tw-my-0 tw-py-0">Eventos</p>
                        <p className={'tw-py-0 tw-my-0'}>
                            Nuevos eventos recordatorios, cambios o cancelaciones de
                            eventos registrados
                        </p>
                    </div>
                </div>
                <div className="tw-flex tw-flex-row tw-items-start tw-gap-2 tw-mb-2">
                    <Checkbox
                        className="tw-mt-[6px]"
                        onChange={() => {
                            setPlatformCheck((p) => !p);
                        }}
                        checked={platformCheck}
                    />
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        <p className="tw-text-lg tw-font-medium tw-my-0 tw-py-0">Plataforma</p>
                        <p className={'tw-my-0 tw-py-0'}>Comunicados de ACUDEN, noticias y actualizaciones.</p>
                    </div>
                </div>
            </div>
            <div className="tw-flex tw-flex-row tw-justify-end">
                <AcceptanceButton title={'Guardar Cambios'} onClickHandler={onChangeHandler}/>
            </div>
        </>
    )
}
