import React from 'react';
import ImgMailChecked from "../../../assets/images/Authentication/MailChecked.svg"
import FormFinalMessage from '../../../components/Form/FormFinalMessage';
import UserService from '../../../services/userServices/UserService';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../../components/Buttons';
import RedirectButton from '../../../components/RedirectButtons';
import stylesAuthentication from "../../../css/Authentication/Authentication.module.css";


export function EmailVerifyMessage(props) {

    const navigate = useNavigate();

    const onClickHandler = async () => {
        const { data } = await new UserService().requestResetPassword(props.form)
        if (data?.httpCode !== 200) {
            return
        }
        navigate("/");
    }

    return (
        <>
            <FormFinalMessage
                image={ImgMailChecked}
                mainTitle={"Verifica tu correo electrónico"}
            >
                <span>
                    Si existe una cuenta de ACUDEN Academy enlazada a <strong> correo@ejemplo.com </strong>,
                    recibirás un mensaje con las instrucciones para restablecer tu contraseña. <br /> <br />
                    <strong> Favor de verificar tu correo electrónico, incluyendo la carpeta de spam. </strong>
                </span>
            </FormFinalMessage>
            <div className={stylesAuthentication.Center}>
                <BigButton title={"Reenviar enlace"}
                    onClickHandler={onClickHandler}
                />
            </div>
            <div className={stylesAuthentication.Center}>
                <div className="row">
                    <div className="col-md-5">
                        <RedirectButton
                            title={"Iniciar sesion"}
                            route={"/login"}
                        />
                    </div>
                    <div className="col-md-2">
                        <p> o </p>
                    </div>
                    <div className="col-md-5">
                        <RedirectButton
                            title={"Crear cuenta"}
                            route={"/SelectRegisterType"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
} 