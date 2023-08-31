import React, { Component } from 'react';
import stylesLawfullInfo from "css/HomeComponents/LawfullInfo.module.css"

export class LawfullInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={stylesLawfullInfo.LawfullInfo} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <a>Accesibilidad Núm-XXX-2019 - Conforme a la Ley 229 de 2003</a>
                            </div>
                            <div className="col-md-4">
                                <a>www.pr.gov 2021, All rights reserved Created by: Inprende</a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
} 