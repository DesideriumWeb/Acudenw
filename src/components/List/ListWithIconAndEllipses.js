import React from 'react'
import {BsThreeDots} from "react-icons/bs";

export default function ListWithIconAndEllipses({items}) {
    return (
        <div className={'flex flex-col gap-3 pt-4'}>
            {items.map(({title, date, Icon, color}, index) => (
                <div
                    key={index}
                    className="flex flex-row rounded-xl overflow-hidden shadow-sm w-full"
                >
                    <div
                        style={{backgroundColor: color}}
                        className="w-12 h-16 flex justify-center items-center"
                    >
                        <Icon color="white" size={32}/>
                    </div>
                    <div className="px-4 flex flex-row items-center justify-between flex-1">
                        <div className="flex flex-col">
                            <p className="font-semibold py-0 my-0">{title}</p>
                            <p className="text-sm py-0 my-0">{date}</p>
                        </div>
                        <BsThreeDots size={24}/>
                    </div>
                </div>
            ))}
        </div>

    )
}