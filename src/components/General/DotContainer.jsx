import React from "react";

const DotContainer = ({children}) => {
    return(
        <div className="flex flex-col h-screen w-full items-center justify-center p-3">
            <div className="flex flex-col items-center w-full max-w-xs gap-3">
                {children}
            </div>
        </div>
    );
};

export default DotContainer