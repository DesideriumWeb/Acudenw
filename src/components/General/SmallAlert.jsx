import React from "react";
import { Puff } from 'react-loading-icons'

const SmallAlert = ({message}) => {
    return(
        <div className="flex flex-row justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <span className="text-sm mr-2 mt-1">{message}</span>
             <Puff stroke="#0C2C4C" width={30} height={30} />
        </div>
    )
};

export default SmallAlert
