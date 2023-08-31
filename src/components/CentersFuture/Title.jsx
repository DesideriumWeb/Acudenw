/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import {CDF_LOG_TYPE} from "../../config/config";
/**
 * Title Component
 * This component displays a title based on the provided type.
 * @param {string} children - The content of the title.
 * @param {null} type - The type of the action (null, CDF_LOG_TYPE.PENDING, or CDF_LOG_TYPE.COMPLETED).
 * @return {JSX.Element} - The formatted title component.
 */
const Title = ({ children, type = null }) => {
    return (
        <>
            {
                type === CDF_LOG_TYPE.PENDING && <h1 className="text-xl font-bold">Acción pendiente: {children}</h1>
            }
            {
                type === CDF_LOG_TYPE.COMPLETED && <h1 className="text-xl font-bold">Acción completada: {children}</h1>
            }
            {
                type === CDF_LOG_TYPE.APPROVED && <h1 className="text-xl font-bold">Aprobación: {children}</h1>
            }
            {
                type === CDF_LOG_TYPE.RESULTS && <h1 className="text-xl font-bold">Resultados: {children}</h1>
            }
            {
                type === CDF_LOG_TYPE.LAST && <h1 className="text-xl font-bold">Proceso Culminado: {children}</h1>
            }
        </>
    )
};

export default Title