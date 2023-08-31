import React from 'react';
import ImgFamilyDepartment from "../../../assets/images/Portal/AboutUs/ImgFamilyDepartment.svg"
import ImgArrowKnowMore from "../../../assets/images/Portal/AboutUs/ImgArrowKnowMore.svg"

export function FamilyDepartment() {
    return (
        <React.Fragment>
            <div className="min-h-[400px] px-4 md:px-0 pb-[96px]">
                <div className="container mx-auto py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <img className="w-full" src={ImgFamilyDepartment} alt="niños jugando con juegos educativos" />
                        <div>
                            <h5 className="font-bold text-center md:text-left text-xl md:text-2xl pb-4">Líder del proyecto</h5>
                            <h2 className="font-bold text-center md:text-left text-4xl md:text-5xl">ACUDEN</h2>
                            <p className="mt-4 text-center md:text-left text-lg md:text-xl">
                                ACUDEN es la agencia líder en el tema de la niñez temprana en Puerto Rico.
                                Es el componente programático y operacional del Departamento de la Familia que supervisa,
                                coordina y monitorea la delegación de fondos de los programas Head Start, Early Head Start y Child Care.
                            </p>
                            <div className="flex justify-center md:justify-start mt-4 py-10 md:pb-0">
                                <a href="https://www.acuden.pr.gov" target="_blank" className='text-[#092C4C] hover:text-blue-500 text-[18px]' >Conoce más</a>
                                <img className="h-1/2 ml-4" src={ImgArrowKnowMore} alt="niños jugando con juegos educativos" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}



