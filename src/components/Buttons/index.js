import stylesCommunityRegister from "../../css/Authentication/CommunityRegister.module.css";
import React from "react";
import stylesAuthentication from "../../css/Authentication/Authentication.module.css";

export function BackButton({ onClickHandler }) {
    return (<div id="BackButton" className="col-md-6">
        <button className={stylesCommunityRegister.return}
            onClick={() => onClickHandler()}>
            Volver
        </button>
    </div>)
}

export function RejectButton({ title, onClickHandler, disabled }) {
    return (<div id="BackButton" className="col-md-6">
        <button className={`${stylesCommunityRegister.return} ${disabled ? 'btn btn-secondary' : ''}`}
            disabled={disabled}
            onClick={() => onClickHandler()}>
            {title}
        </button>
    </div>)
}

export function AcceptanceButton({ title, onClickHandler, disabled }) {
    return (<div id="AcceptanceButton" className="col-md-6">
        <button className={`${stylesCommunityRegister.continue} ${disabled ? 'btn btn-secondary cursor-not-allowed disabled:opacity-25' : ''}`}
            disabled={disabled}
            onClick={() => onClickHandler()}>
            <div className={stylesAuthentication.registerButtonText}>
                {title}
            </div>
        </button>
    </div>)
}

export function BigButton({ title, onClickHandler }) {
    return (<div id="BigButton" className={"col-md-6"}>
        <button onClick={() => onClickHandler()}
            className={stylesCommunityRegister.openWidget}>
            <div className={stylesAuthentication.registerButtonText}>
                {title}
            </div>
        </button>
    </div>)
}
