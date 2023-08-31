import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ImgAcudenAcademy from "assets/images/Portal/AboutUs/ImgAcudenAcademy.svg"
import stylesCommunityRegister from "css/Authentication/CommunityRegister.module.css"
import stylesAuthentication from "css/Authentication/Authentication.module.css"
import BackArrow from "../../../../../components/BackArrow/BackArrow";

export class EmployeeInvitedAddAcademicPreparation extends Component {
    
    manejadorChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    handlerSubmit = e => {
        e.preventDefault();
    }
    
    render() {
        return (
            <React.Fragment>

                <div className="row">
                    <BackArrow />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className={stylesAuthentication.Center}>
                                <img className={stylesAuthentication.ImgAcudenAcademy} src={AQSLogo} alt="Logo de ACUDEN Quality System" />
                                <div className="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-8">
                                        <div className={stylesAuthentication.differentiatorEmployeeInvited}>
                                            Empleado (a)
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    </div>
                                </div>
                                <h1 className={stylesAuthentication.Title}>Crea tu contraseña</h1>
                                <p>Tu contraseña debe tener mínimo 8 caracteres, 1 número, <br />1 letra mayúscula y un carácter especial (@#!*_).</p>
                            </div>
                            {/*{this.state.error === true &&
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            }*/}
                            <div>
                                <form onSubmit={this.handlerSubmit}>
                                    <p className={stylesCommunityRegister.LoginP}>Contraseña</p>
                                    <input type="password" name="password" className="form-control" onChange={this.manejadorChange} placeholder="Contraseña" />
                                    <p className={stylesCommunityRegister.LoginP}>Confirmar Contraseña</p>
                                    <input type="password" name="password2" className="form-control" onChange={this.manejadorChange} placeholder="Confirmar contraseña" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className={stylesCommunityRegister.return} onClick={this.manejadorBoton}> <Link to={-1}> Volver </Link> </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className={stylesCommunityRegister.continue} onClick={this.manejadorBoton}> <Link  className={stylesAuthentication.registerButtonText} to="/EmployeeInvitedPersonalInformation"> Continuar </Link>  </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
} 