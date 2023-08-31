import React from 'react';
import ImgCheck from "../../../assets/images/Authentication/check.svg"
import FormFinalMessage from '../../../components/Form/FormFinalMessage';
import UserService from '../../../services/userServices/UserService';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../../components/Buttons';
import RedirectButton from '../../../components/RedirectButtons';
import stylesAuthentication from "../../../css/Authentication/Authentication.module.css";


export function UpdatedPasswordMessage(props) {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/Login");
    }

    return (
        <>
            <FormFinalMessage
                image={ImgCheck}
                mainTitle={"Contraseña restablecida"}
            >
                <span>
                Tu contraseña se ha cambiado exitosamente.
                </span>
            </FormFinalMessage>
            <div className={stylesAuthentication.Center}>
                <div className="row">
                    <div className="col-md-5">
                        <BigButton
                        title={"Iniciar sesion"}
                        onClickHandler={onClickHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    );
} 