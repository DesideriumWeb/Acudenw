/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {Link} from "react-router-dom";
/**
 * Landing tool block item.
 *
 * @param title - Tool item title.
 * @param description - Tool item description.
 * @param path - Tool item redirect route -> Use PORTAL_ROUTE config.
 * @param index - Tool item position & counter.
 * @param imgSrc - Tool item image.
 * @param alt - Tool item image alt text.
 * @param btnText - Tool item button text. Use "Ir al directorio" as default text.
 * @return {JSX.Element}
 * @constructor
 */
const ToolItem = ({title, description, path, index, imgSrc, alt, btnText = 'Conocer más'}) => {
    return(
        <div className="max-h-full object-cover m-5">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <img className="w-full max-h-[85%]" src={imgSrc} alt={alt}/>
                </div>
                <div className="w-full md:w-1/2 ml-5 mt-5 md:mt-0">
                    <div className="flex">
                        <h5 className="text-white font-montserrat pt-6 text-sm font-bold"> {index}/5 </h5>
                    </div>
                    <div className="flex mt-10">
                        <h1 className="text-white font-montserrat text-4xl font-bold"> {title} </h1>
                    </div>
                    <div className="flex mt-8">
                        <h5 className="text-white font-montserrat ">{description}</h5>
                    </div>
                    <div className="flex mt-4">
                        <Link to={path} className="box-border flex items-center justify-center
                            px-6 py-4 gap-4.5 w-45 h-16 rounded-2xl
                            border-2 border-white text-white bg-[#092C4C]
                            mt-7 font-montserrat text-lg hover:bg-[#A7D02A] hover:text-[#092C4C]">
                            {btnText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolItem