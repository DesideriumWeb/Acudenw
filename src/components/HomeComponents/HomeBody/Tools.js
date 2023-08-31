import React from 'react';
import ToolsOne from "assets/images/ToolsOne.png"
import ToolsTwo from "assets/images/ToolsTwo.png"
import ToolsThree from "assets/images/ToolsThree.png"
import ToolsFour from "assets/images/ToolsFour.png"
import ToolsFive from "assets/images/ToolsFive.png"
import stylesTools from "css/HomeComponents/HomeBody/Tools.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Tools() {
    return (
        <>
            <div className={stylesTools.ToolsContent}>
                <div className='container'>
                    <div className="row">
                        <div>
                            <h3 className={stylesTools.ToolsText}> ¡Eleva tus servicios con nuestras herramientas! </h3>
                        </div>
                    </div>
                    <section className={stylesTools.ToolsSlider}>

                        <div className={stylesTools.ToolsSliderContent}>
                            <div className="row">
                                <div className="col-md-6">
                                    <LazyLoadImage effect={'blur'} className={stylesTools.ToolsImg} src={ToolsOne}
                                                   alt={"Imagen de Manos Extendidas"}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsPaginator}> 1/5 </h5>
                                    </div>
                                    <div className="row">
                                        <h1 className={stylesTools.ToolsTitle}> Únete al Directorio de Centros del Futuro </h1>
                                    </div>
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsSubtitle}>Visibiliza tu perfil como Centro del Futuro y la puntuación de calidad que te ha otrogado ACUDEN.</h5>
                                    </div>
                                    <div className="row">
                                        <button className={stylesTools.GoDirectory}>Ir al directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylesTools.ToolsSliderContent}>
                            <div className="row">
                                <div className="col-md-6">
                                    <LazyLoadImage effect={'blur'} className={stylesTools.ToolsImg} src={ToolsFour}
                                                   alt="Cursos de Cuidado Niñez Temprana"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsPaginator}> 2/5 </h5>
                                    </div>
                                    <div className="row">
                                        <h1 className={stylesTools.ToolsTitle}> Acredíta tu Centro con ACUDEN </h1>
                                    </div>
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsSubtitle}>Crea una cuenta para tu Centro y solicita para ser evaluado y recibir la acreditación.</h5>
                                    </div>
                                    <div className="row">
                                        <button className={stylesTools.GoDirectory}>Ir al directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylesTools.ToolsSliderContent}>
                            <div className="row">
                                <div className="col-md-6">
                                    <LazyLoadImage effect={'blur'} className={stylesTools.ToolsImg} src={ToolsFive}
                                                   alt="Calendario de Eventos"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsPaginator}> 3/5 </h5>
                                    </div>
                                    <div className="row">
                                        <h1 className={stylesTools.ToolsTitle}> Desarrolla profesionalmente a tu equipo </h1>
                                    </div>
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsSubtitle}>Invita a tu equipo de trabajo a unirse y educarse en ACUDEN Academy, registrarse en talleres y solicitar becas a través de ACCESA. </h5>
                                    </div>
                                    <div className="row">
                                        <button className={stylesTools.GoDirectory}>Ir al directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylesTools.ToolsSliderContent}>
                            <div className="row">
                                <div className="col-md-6">
                                    <LazyLoadImage effect={'blur'} className={stylesTools.ToolsImg} src={ToolsTwo}
                                                   alt="Biblioteca Virtual"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsPaginator}> 4/5 </h5>
                                    </div>
                                    <div className="row">
                                        <h1 className={stylesTools.ToolsTitle}> Edúcate con nuestra biblioteca virtual </h1>
                                    </div>
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsSubtitle}>Accede manuales, folletos, y recursos educativos en temas del cuidado de la niñez temprana etc.</h5>
                                    </div>
                                    <div className="row">
                                        <button className={stylesTools.GoDirectory}>Ir al directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylesTools.ToolsSliderContent}>
                            <div className="row">
                                <div className="col-md-6">
                                    <LazyLoadImage effect={'blur'} className={stylesTools.ToolsImg} src={ToolsThree}
                                                   alt="Noticias"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsPaginator}> 5/5 </h5>
                                    </div>
                                    <div className="row">
                                        <h1 className={stylesTools.ToolsTitle}> Noticias </h1>
                                    </div>
                                    <div className="row">
                                        <h5 className={stylesTools.ToolsSubtitle}>En esta sección puedes enterarte
                                            de las iniciativas y proyectos de ACUDEN. </h5>
                                    </div>
                                    <div className="row">
                                        <button className={stylesTools.GoDirectory}>Ir al directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
