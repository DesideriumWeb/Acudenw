import React from 'react';
import imgHands from "assets/images/icons/handsHoldingChildIconSolid.svg"
import imgPortfolio from "assets/images/icons/portfolio-icon-solid.svg"
import stylesForWhom from "css/HomeComponents/HomeBody/ForWhom.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ForWhom() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={stylesForWhom.ForWhomTittle}>
                            <h1>¿Para quién es la plataforma?</h1>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-2">

                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className={stylesForWhom.ForWhomCenter}>
                                <LazyLoadImage className={stylesForWhom.ForWhomIcons} src={imgHands}
                                               alt="imagen de Manos Extendidas" effect={'blur'}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className={stylesForWhom.ForWhomCenter}>
                                <h2>Proveedores de servicio</h2>
                            </div>
                        </div>
                        <div className="row">
                            <a className={stylesForWhom.ForWhomText}>Entidad clasificada bajo Centro de Cuido, Red de
                                Cuido, Proveedor Familiar, Head Start, Early Head Start, Intervención Temprana o
                                Distrito Escolar que busca desarrollar profesionalmente a su equipo de trabajo y alzar
                                la calidad de servicio de su empresa.</a>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="row">
                            <div className={stylesForWhom.ForWhomCenter}>
                                <LazyLoadImage className={stylesForWhom.ForWhomIcons} src={imgPortfolio}
                                               alt="imagen de Portafolio" effect={'blur'}/>
                            </div>

                        </div>
                        <div className="row">
                            <div className={stylesForWhom.ForWhomCenter}>
                                <h2>Empleados de Servicio a la niñez</h2>
                            </div>

                        </div>
                        <div className="row">
                            <a className={stylesForWhom.ForWhomText}>Empleado de un Proveedor de Servicio que busca
                                educarse y desarrollarse en normas de desempeño, protocolos y metodologías educativas
                                que garantizan la más alta calidad en los servicios.</a>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        </>
    );
}
