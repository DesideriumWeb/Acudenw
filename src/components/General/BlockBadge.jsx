import {HiLockClosed} from "react-icons/hi";
import React from "react";

const BlockBadge = () => {
    return(
        <div className="text-white bg-darkblue font-bold flex items-center justify-center h-12 w-12 rounded-full">
            <HiLockClosed className="text-xl" />
        </div>
    );
};

export default BlockBadge;