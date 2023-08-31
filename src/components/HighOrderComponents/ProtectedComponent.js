import React from 'react'
import {AuthToken} from "../../services/AuthToken";
import {Navigate} from "react-router-dom";

function ProtectedComponent(OriginalComponent) {

    function NewComponent(props) {
        if (AuthToken.get()) {
            return <OriginalComponent/>
        } else {
            return <Navigate replace to={'/'}/>
        }
    }

    return NewComponent
}

export default ProtectedComponent
