import stylesSelectRegisterType from "../../css/Authentication/SelectRegisterType.module.css";
import {Link} from "react-router-dom";
import React from "react";

export default function LinkOption(props) {

    return (
        <Link to={props.url}>
            <div className="w-full flex flex-col rounded-[20px] border-2 border-gray-300 p-6 my-10">
                <div className="flex flex-col items-center text-center md:flex-row md:text-left">
                    {props.img &&
                        <div className="w-full flex justify-center md:w-3/12">
                            <img src={props.img} alt="Imagen de icono para registro del miembro de la comunidad"/>
                        </div>
                    }
                    <div className="w-full md:w-9/12 md:ml-4 mt-4 md:mt-0">
                        <div>
                            <h4 className="text-xl font-bold"> {props.title} </h4>
                            <p className="text-sm mt-4">{props.subTitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}