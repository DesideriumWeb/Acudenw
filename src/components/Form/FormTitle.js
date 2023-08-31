import React from "react";
// import ImgAcudenAcademy from "../../assets/images/Portal/AboutUs/ImgAcudenAcademy.svg";
import AQSLogo from "../../assets/images/LogoAQSC.svg"
import ImgAccesa from "../../assets/images/ImgLogoAccesa.svg";

export default function FormTitle({
    registration = false,
    mainTitle,
    style,
    secondTitle,
    subTitle,
    children,
    url,
    withLogo = true,
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {withLogo && (
        <img
          className="w-1/2 mx-auto h-24" //h-24 sm:w-60 sm:h-28 md:w-64 md:h-32 lg:w-40 lg:h-30
          src={url ? ImgAccesa : AQSLogo}
          alt="Logo de ACUDEN Quality Systems"
        />
      )}
      {url && (
        <div className="flex flex-row justify-center content-center items-center justify-items-center ">
          <div className="bg-[#FF933B] px-1 text-xs font-semibold rounded-md mb-3 text-[#092C4C]">
            Solicitud del programa
          </div>
        </div>
      )}
      {mainTitle && (
        <div className="flex flex-col w-fill items-center justify-center">         
            <div className={style}  dangerouslySetInnerHTML={{ __html: mainTitle }} />
            </div>
      )}
      <div className="flex flex-col w-full items-center justify-center">
        {secondTitle && (
            registration ? (
                <h1 className="text-black font-bold text-lg md:text-2xl mt-2">
                  {secondTitle}
                </h1>
            ) : (
                <h1 className="text-black font-bold text-lg md:text-2xl mt-2">
                  {secondTitle}
                </h1>
            )
        )}
        {subTitle && (
          <p
            className="mt-3 text-sm max-w-xs text-justify"
            dangerouslySetInnerHTML={{ __html: subTitle }}
          />
        )}
      </div>
      {children}
    </div>
  );
}
