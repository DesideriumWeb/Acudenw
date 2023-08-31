import React, { Component } from 'react';
import ImgProgramChildCare from "../../../assets/images/Portal/AboutUs/ImgProgramChildCare.svg"
import ImgArrowKnowMore from "../../../assets/images/Portal/AboutUs/ImgArrowKnowMore.svg"

export function ProgramChildCare() {
    return (
        <React.Fragment>
            <div className="bg-[url('./assets/images/Portal/AboutUs/BackgroundProgramChildCare.svg')] px-4 md:px-0 py-[96px]">
                <div className="container mx-auto py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:cols-reverse gap-4 items-center px-4">
                        <div className='order-2 md:order-1'>
                            <h2 className="font-bold text-center md:text-left text-3xl md:text-5xl">Programa Child Care</h2>
                            <p className="mt-4 text-center md:text-left text-lg md:text-xl">
                                El Programa Child Care está adscrito a ACUDEN, única agencia en Puerto Rico que recibe fondos del CCDF para el manejo y administración del programa.
                                Su objetivo es aumentar la accesibilidad, disponibilidad y la calidad de los servicios de cuidado, además de fortalecer el desarrollo integral de los niños en Puerto Rico y proveer apoyo a los adultos para que logren su autosuficiencia.
                            </p>
                            <div className="flex items-center mt-4 py-10 justify-center md:justify-start">
                                <a href="https://childcare.familia.pr.gov" target="_blank" className="text-[#092C4C] hover:text-blue-500 text-[18px]">Conoce más</a>
                                <img className="h-1/2 ml-4" src={ImgArrowKnowMore} alt="niños jugando con juegos educativos" />
                            </div>
                        </div>
                        <div className='order-1 md:order-2 '>
                            <img className="w-full px-20" src={ImgProgramChildCare} alt="niños jugando con juegos educativos" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


