/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {ALERT_TYPES} from "../../config/config";

/**
 * BasicAlert Component
 *
 * Renders a basic alert with an error message and a specified color.
 * Props:
 * @param errorMsg: The error message to be displayed in the alert.
 * @param color: The color of the alert. Supported values are ALERT_TYPES (see config file).
 */
const BasicAlert = ({ errorMsg, color }) => {
    const colorClass = {
        'red': 'bg-red-200 border-red-400 text-red-700',
        'green': 'bg-green-200 border-green-400 text-green-700',
        'blue': 'bg-blue-200 border-blue-400 text-blue-700',
        'yellow': 'bg-yellow-200 border-yellow-400 text-yellow-700'
    }[color];

    return (
        <div className={`${colorClass} px-4 py-3 rounded-md mb-4`} role="alert">
            {errorMsg}
        </div>
    );
};
export default BasicAlert;
