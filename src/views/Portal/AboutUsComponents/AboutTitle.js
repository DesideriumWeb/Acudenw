import React from 'react';
import ImgAboutTitle from "../../../assets/images/Portal/AboutUs/ImgAboutTitle.svg"
import stylesAboutTitle from "../../../css/Portal/AboutUsComponents/AboutTitle.module.css"

export function AboutTitle() {
    return (
        <>
            <div className={"flex bg-[#eef2f6] bg-[url('./assets/images/Portal/AboutUs/BackgroundAboutTitleMobile.svg')] md:bg-[url('./assets/images/Portal/AboutUs/BackgroundAboutTitle.svg')] bg-center md:bg-top bg-no-repeat bg-auto min-h-[904px] md:min-h-[839px] md:pt-[8%]"}>
                <div className=" w-full mx-auto">
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="">
                            <img className="w-full md:px-24" src={ImgAboutTitle}
                                alt="niños jugando con juegos educativos" />
                        </div>
                        <div className="w-full m-auto md:w-1/2">
                            <div className='flex flex-col justify-center md:justify-start'>
                                <h5 className="mx-auto md:mx-0 md:mt-1 font-bold text-center md:text-left text-xl text-[#092C4C]">ACUDEN</h5>
                                <h1 className="mx-auto md:mx-0 md:mt-1 font-bold text-center md:text-left text-3xl md:text-5xl text-[#092C4C] md:leading-relaxed py-5">Administración para el Cuidado y Desarrollo de
                                    la Niñez Temprana</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 
