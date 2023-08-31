import FormTitle from "../../../../components/Form/FormTitle";
import stylesAuthentication from "../../../../css/Authentication/Authentication.module.css";
import VerticalImageCard from "../../../../components/VerticalImageCard";
import NamePreviewLetter from "../../../../assets/images/NamePreviewLetter.png"
import React, { useEffect, useState } from "react";

export function AcceptInvitation(props) {

    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(() => {
        props.setCanContinue(!errorMsg)
    }, [errorMsg])

    return (
        <>
            <FormTitle mainTitle={'Empleado(a)'}
                style={'bg-[#88C7F1] p-1 rounded-[20px]'}
                secondTitle={'Crea tu cuenta'}
                subTitle={'Has sido invitado(a) como empleado(a) de'}
            />
            {errorMsg && <div class={"alert alert-danger"} role="alert">
                {errorMsg}
            </div>}
            <VerticalImageCard img={NamePreviewLetter}
                title={props.companyName}
                subTitle={`${props.companyEmployeeNumber + ' empleados registrados'}`}
            />
        </>)
}