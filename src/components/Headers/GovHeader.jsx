import React, { useState } from "react";
import {ReactComponent as GovHeaderIcon} from "../../assets/images/icons/gov-header-icon.svg";
import {ReactComponent as ChevronDownIcon} from "../../assets/images/icons/chevron-down-icon-white.svg";

const GovHeader = ({title, description_left, description_right}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return(

        <div className='z-50 relative w-full flex flex-col py-1 bg-[#092c4c] h-[40px] rounded-t-lg '>
        
            <button className="mx-auto flex md:w-[80%]" onClick={toggleDropdown}>
                <div>
                    <GovHeaderIcon className={'translate-y-[1px] ml-1'}/>
                </div>

                <div className={'text-white text-[13px] md:text-[14px] font-semibold mt-[4px]'}>
                     {title}
                </div>

                <div className="translate-y-1 ml-3 mt-[2px]"> 
                    <ChevronDownIcon className='w-4 h-4 fill-white'/> 
                </div>
            </button>

        {isOpen && (
            <div className={'relative w-full flex flex-col content-center items-center md:flex-row bg-[#DFDFDF] translate-y-1 py-2'}>
                
                <div className={'pl-[16px] ml-3 md:ml-[10%] my-[12px] border-solid border-l-2 border-0 border-[#1E1E1E] text-[13px] md:text-[14px]'}>
                    {description_left}
                 </div>       
                 <div className={'pl-[16px] ml-3 md:ml-[5%] mr-3 md:mr-[10%] my-[12px] border-solid border-l-2 border-0 border-[#1E1E1E] text-[13px] md:text-[14px]'}>
                    {description_right}
                </div>
            </div>
                
                
        )}
        </div>
    );
}

export default GovHeader