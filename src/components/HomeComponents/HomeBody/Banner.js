import React from 'react';
import ImgBanner from "assets/images/ImgBanner.svg"
import stylesBanner from "css/HomeComponents/HomeBody/Banner.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Banner() {
    return (
        <>
            <div className={stylesBanner.Banner}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <h1 className={stylesBanner.BannerTitle}>Elevando el desarrollo integral de la niñez
                                    temprana en Puerto Rico</h1>
                            </div>
                            <div className="row">
                                <p className={stylesBanner.BannerSubtitle}>ACUDEN Academy integra cursos, talleres,
                                    herramientas y certificaciones
                                    para elevar el nivel de calidad de los servicios de la niñez temprana en Puerto
                                    Rico.</p>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <button className={stylesBanner.Begin}>Comenzar</button>
                                </div>
                                <div className="col-md-3">
                                    <button className={stylesBanner.SeeDemo}>Ver demo</button>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={stylesBanner.BannerCenter}>
                                <LazyLoadImage src={ImgBanner}
                                               alt="Imagen representativa de un centro educativo infantil" effect={'blur'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
