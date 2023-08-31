/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import planeContact from "../../assets/images/plane-contact.svg"
import phoneContact from "../../assets/images/icons/phone-solid-1.svg"
import mailContact from "../../assets/images/icons/mail-solid-1.svg"
import webContact from "../../assets/images/icons/globe-solid.svg"
import locationContact from "../../assets/images/icons/location-dot-solid.svg"
import workingHoursContact from "../../assets/images/icons/clock-solid.svg"
const Contact = () => {
    return(
        <div className="p-10 mb-0">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img className="w-70 mx-auto" src={planeContact} alt="Aviones de papel y figuras geometricas cayendo"/>
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h2 className="font-bold text-3xl md:text-4xl text-[#092C4C] ">Contáctanos</h2>
                    <p className="my-4 text-lg md:text-xl text-[#092C4C]">
                        De tener alguna duda o pregunta contáctenos vía telefónica <br />o correo electrónico.
                    </p>
                    <div className="flex items-center my-4 text-[#092C4C]">
                        <img className="w-6 h-6 mr-4" src={phoneContact} alt="icono de telefono" />
                        <p className="text-lg md:text-xl"> 787-724-7474 (Ext. 3649, 3695, 3714, 3719, 3722, 3747, 3846 ó 3856)</p>
                    </div>
                    <div className="flex items-center my-4 text-[#092C4C]">
                        <img className="w-6 h-6 mr-4" src={mailContact} alt="icono de correo electronico" />
                        <p className="text-lg md:text-xl">acudenteasiste@familia.pr.gov</p>
                    </div>
                    <div className="flex items-center my-4 text-[#092C4C]">
                        <img className="w-6 h-6 mr-4" src={webContact} alt="icono de dirección web" />
                        <p className="text-lg md:text-xl">acuden.pr.gov</p>
                    </div>
                    <div className="flex items-center my-4 text-[#092C4C]">
                        <img className="w-6 h-6 mr-4" src={locationContact} alt="icono de geolocalizacion" />
                        <p className="text-lg md:text-xl">Piso 14, Mercantil Plaza, 2 Av. Juan Ponce de León, San Juan, 00917</p>
                    </div>
                    {/* <div className="flex items-center my-4 text-[#092C4C]">
                       <img className="w-6 h-6 mr-4" src={workingHoursContact} alt="icono de horario" />
                       <p className="text-lg md:text-xl">Horario</p>
                    </div> */}
                </div>
            </div>
        </div>

    );
}

export default Contact