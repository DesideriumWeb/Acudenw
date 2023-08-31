import React from 'react';
import ImgQualitySystem from "../../../assets/images/Portal/AboutUs/ImgQualitySystem.svg"
import ImgArrowKnowMore from "../../../assets/images/Portal/AboutUs/ImgArrowKnowMore.svg"

export function QualitySystem() {
    return (
        <React.Fragment>
            <div className="flex bg-[#EEF2F6] bg-[url('./assets/images/Portal/AboutUs/BackgroundQualitySystem.svg')] px-4 py-[96px] md:px-0" >
                <div className="container py-10 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-4">
                        <div className='order-2 md:order-1'>
                            <h5 className="font-bold text-center md:text-left text-xl md:text-2xl pb-4">Instrumento de medición</h5>
                            <h2 className="font-bold text-center md:text-left text-4xl md:text-5xl">Puerto Rico Quality Rating Improvement System</h2>
                            <p className="mt-4 text-center md:text-left text-lg">
                               Centros del Futuro es una aspiración multisectorial para que los niños/as se desarrollen en ambientes que propicien su pleno y óptimo desarrollo. Para promover que dichos ambientes estén a la altura de las aspiraciones que tenemos para ellos ACUDEN ha desarrollado un instrumento para la medición de la calidad de los servicios que los niños/as reciben.
                            </p>
                            <div className="flex justify-center md:justify-start mt-4 py-10">
                                <a href="google.com" className="text-[#092C4C] hover:text-blue-500 text-[18px]">Conoce más</a>
                                <img className="h-1/2 ml-4" src={ImgArrowKnowMore} alt="niños jugando con juegos educativos" />
                            </div>
                        </div>
                        <div className='order-1 md:order-2'>
                            <img className="w-full px-10" src={ImgQualitySystem} alt="niños jugando con juegos educativos" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}



