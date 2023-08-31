import React from 'react';
// import ImgAcudenAcademy from "../../../assets/images/Portal/AboutUs/ImgAcudenAcademy.svg"
import AQSLogo from "../../../assets/images/LogoAQSC.svg"

export function AcudenAcademy() {
    return (
        <div className="min-h-[610px] bg-acuden-academy-pattern flex">
            <div className="container m-auto">
                <div className="grid justify-center content-center">
                    <div className="grid grid-cols-1 gap-6 items-center">
                        <img className="mx-auto" src={AQSLogo} alt="Logo ACUDEN Quality System" />
                        <div>
                            <h2 className="font-bold text-5xl text-center text-[#092C4C]">Desarrollo e integración</h2>
                            <p className="mx-auto text-lg text-center max-w-[50%] mt-8"> 
                                ACUDEN Quality System es una plataforma tecnológica e interactiva que permite el desarrollo profesional de nuestros proveedores y agencias delegadas de los servicios que comprende la niñez.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

