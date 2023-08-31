import {ReactComponent as BsFillInfoCircleFill} from "../../assets/images/icons/circle-info-solid 3.svg";
import React from "react";

export default function GreetingsSection({children, title, iconTitle, className= ''}) {
    return (
        <section className="py-5 flex flex-row justify-between">
            <h2 className="font-semibold text-lg md:text-2xl">
                {title}
            </h2>
            {children}
            {iconTitle && <div className="flex flex-row gap-2 items-center font-semibold">
                <BsFillInfoCircleFill
                    className={`w-6 h-6 text-[#092C4C] cursor-pointer ${className}`}
                    size={18}/> {iconTitle}
            </div>}
        </section>

    )

}