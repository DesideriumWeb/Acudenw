import Utilities from "../../utils/Utitlities";
import React from "react";


const CapitalizeBadge = ({name}) => {
    return(
        <>
            <div className="bg-amber-500 bg-opacity-20 text-darkblue font-bold flex items-center justify-center h-12 w-12 rounded-full">
                {Utilities.capitalizeFirstLetter(name)}
            </div>
        </>
    );
};

export default CapitalizeBadge;