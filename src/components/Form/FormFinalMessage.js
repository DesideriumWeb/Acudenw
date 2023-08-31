import stylesAuthentication from "../../css/Authentication/Authentication.module.css";
import React, { useEffect } from "react";
import ImgAQS from "../../assets/images/Portal/AboutUs/ImgAcudenAcademy.svg"
import stylesCommunityRegister from "../../css/Authentication/CommunityRegister.module.css"

export default function FormFinalMessage(props) {

    useEffect(() => {
        ["AcceptanceButton", "BackButton"].forEach((button) => {
            document.getElementById(button).remove()
        })
    }, [])

    return (
        <div className={'w-full flex flex-col items center justify-center'}>
            <img className={'w-1/2 mx-auto h-24'} src={ImgAQS} alt="Logo de ACUDEN Quality Systems" />           
            <img className={'w-1/6 mx-auto my-10'} src={props.image} alt="img check" />    
            <div className="flex justify-center mt-4 mx-4">
                <h1 className={'text-[#092C4C] text-xl font-semibold text-center'}>
                    {props.mainTitle}
                </h1>
            </div>
            <div className={'text-[#092C4C] text-sm md:text-md text-center mt-4'}> {props.children}</div>
        </div>
    )
}