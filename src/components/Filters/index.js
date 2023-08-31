import React, {useState} from "react";
import {GoSettings} from "react-icons/go";
import {BiReset} from "react-icons/bi";
import {MdClose} from "react-icons/md";
import {Checkbox, RadioButton} from "primereact";
import {
    BsChevronDown,
    BsChevronLeft,
    BsChevronRight,
    BsPlayFill,
    BsThreeDots,
} from "react-icons/bs";

export default function Filters({filterOptions = [], toggleCheckBox, radioOptions = [], toggleRadio}) {

    const [showFilters, setShowFilters] = useState(true)

    return (
        <div
            className={`tw-fixed tw-top-0 tw-left-0 tw-h-full tw-overflow-visible tw-w-full 
            ${showFilters ? "tw-flex" : "tw-hidden"}
            tw-bg-black tw-bg-opacity-40 md:tw-relative md:tw-h-fit md:tw-w-fit md:tw-bg-transparent
            md:tw-flex tw-py-6 md:tw-py-0 tw-flex-col tw-items-center tw-justify-center tw-z-10`}
        >
            <div
                className="tw-flex tw-flex-col tw-rounded-lg tw-overflow-hidden tw-w-80 md:tw-w-60 tw-shadow-md tw-bg-white">
                <div className="tw-bg-cyan-900 tw-p-3 tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
                        <GoSettings color="white" size={22}/>
                        <h5 className="tw-text-white tw-font-medium">Filtros</h5>
                    </div>
                    <div onClick={() => setShowFilters(!showFilters)}
                         className="tw-flex tw-flex-row tw-gap-2 tw-items-center hover:tw-cursor-pointer">
                        <BiReset color="white" size={22}/>
                        <MdClose
                            color="white"
                            size={22}
                            className="md:tw-hidden"
                        />
                    </div>
                </div>
                <div className={"tw-flex tw-flex-col tw-overflow-y-auto"}>
                    {filterOptions.map((option, index) => (
                        <div key={index} className="tw-p-3">
                            <div className="tw-flex tw-flex-row tw-justify-between tw-w-full tw-items-center">
                                <h5 className="tw-font-semibold">{option.title}</h5>
                                {/*TODO: Apply hidden onCLick*/}
                                <BsChevronDown/>
                            </div>
                            {option.checkboxes.map((box, index) => (
                                <div key={index} className="tw-flex tw-flex-col tw-gap-2 tw-p-2">
                                    <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
                                        <Checkbox
                                            onChange={() => {
                                                toggleCheckBox(option, box);
                                            }}
                                            checked={option.checkboxes[index].checked}
                                        />
                                        <p className={'tw-py-0 tw-my-0'}>{box.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className={'tw-p-3'}>
                        <div className={'tw-flex tw-flex-row tw-justify-between tw-w-full tw-items-center'}>
                            <h5 className={'tw-font-semibold'}>Orden</h5>
                            <BsChevronDown/>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-p-2">
                            {radioOptions.map((option, index) => (
                                <div key={index} className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
                                    <RadioButton
                                        value={option}
                                        name="orden"
                                        onChange={(e) => toggleRadio(e.value)}
                                        checked={option.selected}
                                    />
                                    <p className={'tw-py-0 tw-my-0'}>{option.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}