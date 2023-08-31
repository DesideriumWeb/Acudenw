import stylesSelectRegisterType from "../../css/Authentication/SelectRegisterType.module.css";
import React from "react";
import stylesAuthentication from "../../css/Authentication/Authentication.module.css";

export default function VerticalImageCard({img, title, subTitle}) {
    return (
        <div className={stylesAuthentication.Center}>
            <div className="row">
                {img && <div className={`${stylesSelectRegisterType.circleArea} text-[50px] font-semibold`}>
                    <div>
                        <h1>{title.charAt(0).toUpperCase()}</h1>
                        {/*<img src={props.img}*/}
                        {/*    alt="Imagen de icono para registro del miembro de la comunidad" />*/}
                    </div>
                </div>}
                <div className={`${stylesSelectRegisterType.TextArea} font-semibold text-lg` }>
                    {title && <h4> {title} </h4>}                    
                </div>
                <div className={`${stylesSelectRegisterType.TextArea} text-sm`}>
                    {subTitle && <p>{subTitle}</p>}                 
                </div>
               
            </div>
        </div>
    )
}