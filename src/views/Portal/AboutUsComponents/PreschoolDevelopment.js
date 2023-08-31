import React from 'react';
import ImgPreschoolDevelopment from "../../../assets/images/Portal/AboutUs/ImgPreschoolDevelopment.svg"
import ImgArrowKnowMore from "../../../assets/images/Portal/AboutUs/ImgArrowKnowMore.svg"

export function PreschoolDevelopment() {
    return (
        <React.Fragment>
            <div className="bg-white px-4 md:px-0 py-[96px]">
                <div className="container mx-auto py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <img className="w-full" src={ImgPreschoolDevelopment} alt="niños jugando con juegos educativos" />
                        </div>
                        <div>
                            <h2 className="font-bold text-center md:text-left text-4xl md:text-5xl">Preschool Development Grant Birth to Five</h2>
                            <p className="mt-4 text-center md:text-left text-lg md:text-xl">
                                ACUDEN recibió en 2019 por primera vez la asignación de los fondos Preschool Development Grant Birth to Five.
                                ACUDEN lidera este proyecto con la finalidad de facilitar un sistema de colaboración y coordinación entre los programas de educación y cuidado.
                            </p>
                            <div className="flex justify-center md:justify-start mt-4 py-10">
                                <a href="google.com" className="text-[#092C4C] hover:text-blue-500 text-[18px]">Conoce más</a>
                                <img className="h-1/2 ml-4" src={ImgArrowKnowMore} alt="niños jugando con juegos educativos" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
} 
