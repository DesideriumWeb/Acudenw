import DotContainer from "./DotContainer";
import {DotLoader} from "react-spinners";
import React from "react";

const PreventLoaderContainer = ({loading, children}) => {
    return(
        <>
            {
                loading
                    ? (
                        <DotContainer>
                            <DotLoader color={"#0C2C4C"} size={200} className={"m-5 p-5"}/>
                        </DotContainer>
                    )
                    :
                    ({children})
            }
        </>
    );
};

export default PreventLoaderContainer
