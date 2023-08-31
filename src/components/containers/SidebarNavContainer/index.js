import React, {useState} from 'react'
import {FiMenu} from "react-icons/fi";
import Dropdown from "../../Dropdown";
import {IoClose} from "react-icons/io5";


export default function SidebarNavContainer({
                                                sidebarList = [], coursesList = [],
                                                selectedSideBarNav, setSelectedSideBarNav
                                            }) {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
            <section className={'tw-border-b-2 tw-border-b-gray-200 tw-w-full tw-py-2'}>
                <div
                    className="tw-max-w-6xl tw-p-3 tw-mx-auto tw-flex tw-flex-row tw-items-center tw-gap-3 tw-justify-between">
                    <FiMenu
                        className="tw-text-cyan-900 md:tw-hidden"
                        onClick={() => {
                            setShowSidebar(true);
                        }}
                        size={28}
                    />
                    <Dropdown
                        value={"ACUDEN Academy"}
                        onChange={(value) => {
                            console.log(value);
                        }}
                        options={[
                            {label: "ACUDEN Academy", value: "1"},
                            {label: "KHAN Academy", value: "2"},
                            {label: "NOON Academy", value: "3"},
                            {label: "MEEM Academy", value: "4"},
                            {label: "UN Academy", value: "5"},
                        ]}
                    />
                </div>
            </section>
            <section className={'tw-max-w-6xl tw-px-3 tw-mx-auto tw-flex tw-flex-row tw-flex-1'}>
                <div
                    className={`${
                        showSidebar ? "tw-translate-x-0" : "tw-translate-x-[-200%]"
                    } tw-fixed tw-shadow-sidebar tw-transition-all tw-left-0 tw-top-0 tw-z-10 md:tw-translate-x-0 tw-bg-white md:tw-shadow-none md:tw-relative md:tw-border-r-gray-200 md:tw-border-r-2 tw-w-64 tw-h-full`}
                >
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-p-3 tw-pt-10 md:tw-pt-3 tw-relative">
                        <div
                            onClick={() => setShowSidebar(false)}
                            className="tw-absolute tw-top-2 tw-right-2 tw-text-2xl tw-text-gray-900 tw-p-2 md:tw-hidden"
                        >
                            <IoClose/>
                        </div>
                        {sidebarList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedSideBarNav(item)}
                                className={`tw-text-cyan-900 tw-font-semibold tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-start tw-hover tw-cursor-pointer tw-p-2 hover:tw-bg-gray-300`}
                            >
                                <item.icon size={24}/>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tw-flex-1 tw-p-6 tw-gap-4 tw-flex tw-flex-col">
                    <h1 className="tw-font-semibold tw-text-xl tw-text-cyan-900 tw-flex tw-flex-row tw-gap-2">
                        {selectedSideBarNav.icon()}
                        {selectedSideBarNav.name}
                    </h1>

                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
                        {coursesList.map((course, index) => (
                            <div key={index}
                                 className="tw-flex tw-flex-col tw-p-3 tw-rounded-md tw-border-2 tw-border-cyan-900 tw-gap-4">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="tw-aspect-[1.5] tw-w-full"
                                />
                                <h1 className="tw-font-semibold tw-text-cyan-900 tw-text-lg">
                                    Curso: {course.title}
                                </h1>
                                <p className="tw-line-clamp-5 tw-py-0 tw-my-0">{course.desc}</p>
                                <button
                                    className="tw-bg-cyan-900 tw-py-2 tw-px-4 tw-rounded-md tw-font-semibold tw-text-white tw-w-fit">
                                    Lecciones
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}