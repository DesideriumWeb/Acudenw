import React, { Component } from 'react';
import stylesFooter from "css/HomeComponents/Footer.module.css"
import separatorFooter from "assets/images/SeparatorFooter.svg"

export class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={stylesFooter.Footer} >
                    <div className="container">
                        <div className="row" >
                            <div className="col-md-4">
                                <div className={stylesFooter.Columns}>
                                    <h5 className={stylesFooter.FooterText}>
                                        ACUDEN
                                    </h5>
                                    <a className={stylesFooter.FooterText}>Avenida De la Constitución, Pda 2 San Juan, Puerto Rico, 00902</a>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={stylesFooter.Columns}>
                                    <h5 className={stylesFooter.FooterText}>
                                        Contáctenos
                                    </h5>
                                    <a className={stylesFooter.FooterText}>infoacuden@familia.pr.gov
                                    <br/>(787) 724-7474</a>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={stylesFooter.Columns}>
                                    <h5 className={stylesFooter.FooterText}>
                                        Información
                                    </h5>
                                    <a className={stylesFooter.FooterText}>Términos y condiciones
                                        <br/>Política de Privacidad</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <img src={separatorFooter} />
                        </div>
                        <div className="row" >
                            <div className="col-md-12">
                                <div className={stylesFooter.FooterRow}>
                                    <a className={stylesFooter.FooterText}>
                                        © 2022 Puerto Rico Innovation & Technology Service. Todos los derechos reservados.
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}