import React from "react";
// import ImgAcudenAcademy from "../../assets/images/Portal/AboutUs/ImgAcudenAcademy.svg";
import AQSLogo from "../../assets/images/LogoAQSC.svg"
import ImgCenterFuture from "../../assets/images/logo_centros_del_futuro.svg";
import { STRINGS } from "../../config/config";
/**
 * FormTitleFuture
 *
 * Este componente representa un título y una imagen de logotipo opcional para un formulario.
 *
 * @param {string} mainTitle - El título principal que se mostrará.
 * @param {string} style - Clases CSS adicionales para aplicar al título principal.
 * @param {string} secondTitle - El segundo título que se mostrará.
 * @param {string} subTitle - El subtitulo que se mostrará.
 * @param {string} url - La URL de la imagen del logotipo.
 * @param {boolean} withLogo - Un indicador booleano para mostrar o no el logotipo.
 * @returns El componente de título y logotipo para el formulario.
 */
export default function FormTitleFuture({
  mainTitle,
  titleFirst,
  style,
  secondTitle,
  subTitle,
  children,
  url,
  withLogo = true,
}) {
  return (
    <div className="text-center mt-5">
      {withLogo && (
        <img
          className="w-1/2 mx-auto mt-10 h-24 sm:w-60 sm:h-28 md:w-64 md:h-32 lg:w-72 lg:h-30"
          src={url ? ImgCenterFuture : AQSLogo}
          alt="Logo de ACUDEN Quality System"
        />
      )}
      {url && (
        <div className="flex flex-row justify-center content-center items-center justify-items-center ">
          <div className="bg-[#E5F1BF] px-1 text-xs font-semibold rounded-md mb-3 text-[#092C4C]">
            {titleFirst}
          </div>
        </div>
      )}
      {mainTitle && (
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-2/12"></div>
          <div className="w-full md:w-8/12">
            <div
              className={style}
              dangerouslySetInnerHTML={{ __html: mainTitle }}
            />
          </div>
          <div className="w-full md:w-2/12"></div>
        </div>
      )}
      <div className="flex flex-col   w-full items-center justify-center">
        {secondTitle && (
          <h1 className="text-blue-900 font-bold text-2xl mt-2 max-w-xs">
            {secondTitle}
          </h1>
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
