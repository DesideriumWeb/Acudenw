/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { Button } from "bootstrap";
import CircleCheck from "../../../../assets/images/icons/circle-check-solid big.svg";
import FormFinalMessage from "../../../../components/Form/FormFinalMessage";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessMessage(props) {
    const navigate = useNavigate()
    return (<>
    <div classname={"flex flex-col w-full items-center justify-center"}>
        <FormFinalMessage image={CircleCheck}
            mainTitle={'¡Gracias por completar su registro!'}
        >
            <span>Antes de acceder a la plataforma, necesitamos autenticar la información provista.
                Una vez corroborada, te enviaremos una notificación por correo electrónico para entrar a tu cuenta.</span>
            <div className={'flex justify-center mt-8'}>
                <button 
                    className="w-full flex mx-auto py-2 px-1 justify-center rounded-md text-white hover:text-[#092C4C] bg-[#092C4C] hover:bg-[#A7D02A]"
                    onClick={() => navigate('/')}
                    >
                    <p>Volver al inicio</p>
                </button>
            </div>
        </FormFinalMessage>
    </div>
    </>)
}