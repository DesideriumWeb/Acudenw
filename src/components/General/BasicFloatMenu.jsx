import React from "react";
import {Link} from "react-router-dom";
import Utilities from "../../utils/Utitlities";
const BasicFloatMenu = (
    {
        show= false,
        closeHandler,
        itemId,
        createdHandler,
        editHandler,
        deleteHandler,
        routeToCreate,
        routeToEdit
    }) => {

    return(
        <>{ show && (
            <div key={itemId ?? Utilities.generateRandom()} className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white mr-9">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-600" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link to={routeToCreate}>
                            <span
                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-700">Crear
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to={routeToEdit}>
                            <span
                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-700">Editar
                            </span>
                        </Link>
                    </li>
                    <li>
                        <span
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-700">Eliminar
                        </span>
                    </li>
                    <hr/>
                    <li>
                        <span onClick={closeHandler}
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white">
                            <div className="flex">
                                <span className="font-bold text-red-600">
                                    Cerrar
                                </span>
                            </div>
                        </span>
                    </li>
                </ul>
            </div>)}
        </>
    );
};

export default BasicFloatMenu