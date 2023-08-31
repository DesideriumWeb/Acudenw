import React from "react";

export default function FormCheckBox({ id, name, checked, onChangeHandler, setFuncion, valorAnterior, label, disabled }) {

    return (
        <>
            <input type={"checkbox"}
                id={id}
                name={name}
                checked={checked}
                onChange={(e) => onChangeHandler(e, setFuncion, valorAnterior)}
                disabled={disabled}
            />
            <label htmlFor={id}> {label}</label> <br />
        </>
    )
}