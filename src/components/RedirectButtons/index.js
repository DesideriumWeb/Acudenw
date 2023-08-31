import React from "react"
import { Link } from "react-router-dom"
import stylesAuthentication from "../../css/Authentication/Authentication.module.css"

export default function RedirectButton({ title, route }) {
    return (
        <p className="text-center">
            <Link to={route} className="text-black">
                &nbsp; &nbsp; {title}
            </Link>
        </p>

    )
}
