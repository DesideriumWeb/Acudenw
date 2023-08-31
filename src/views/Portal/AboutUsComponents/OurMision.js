import React from 'react';
import ImgOurMision from "../../../assets/images/Portal/AboutUs/ImgOurMision.svg"

export function OurMision() {
    return (
        <React.Fragment>
            <div className="flex bg-[url('./assets/images/Portal/AboutUs/BackgroundOurMision.svg')] bg-center md:bg-top bg-no-repeat bg-auto min-h-[904px] md:min-h-[839px] px-4 md:px-0">
                <div className="container md:w-full m-auto md:pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="px-4">
                            <h5 className="font-bold text-center md:text-left text-xl md:text-2xl pb-5">La misión</h5>
                            <h2 className="font-bold text-center md:text-left text-4xl md:text-5xl">Elevar el nivel de calidad de los servicios de la niñez temprana</h2>
                            <p className="mt-4 text-center md:text-left text-lg md:text-xl">
                                El resultado de este proyecto será elevar el nivel de calidad en los servicios a la niñez en Child Care, Head Start, Early Head Start y otros programas.
                            </p>
                        </div>
                        <div>
                            <img className="w-full px-10" src={ImgOurMision} alt="niños jugando con juegos educativos" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}





