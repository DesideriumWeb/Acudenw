import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { ROUTES } from "../../config/global-config";
import Utilities from "../../utils/Utitlities";

const AdminFloatMenu = ({ show = false, closeHandler, internalHandler, css }) => {

    const navigate = useNavigate();

    const internalClose = () => {
        internalHandler(false);
        navigate(ROUTES.ADMIN_CONFIG);
    };

    return (
        <>
            {show && (
                <div
                    key={Utilities.generateRandom()}
                    className={classNames(
                        "absolute z-10 bg-blue-900 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-700-700 mr-9",
                        css
                    )}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-white-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <span
                                onClick={internalClose}
                                className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-600 dark:hover:text-white text-white"
                            >
                                Ajustes
                            </span>
                        </li>
                        <li>
                            <Link to={ROUTES.ADMIN_LANDING}>
                                <span
                                    className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-600 dark:hover:text-white text-white"
                                >
                                    Cerrar Sesión
                                </span>
                            </Link>
                        </li>
                        <li>
                            <span
                                onClick={closeHandler}
                                className="block px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-600 dark:hover:text-white"
                            >
                                <div className="flex items-center">
                                    <span className="text-xs font-bold text-white">Cerrar</span>
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
};

export default AdminFloatMenu;
