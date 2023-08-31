/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useState} from 'react';
import { Link } from "react-scroll";
import {convertToRoman} from "../../components/utils";
const TermsPolicy = ({topics, title, header = '', subheader = [], useRomans = false}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-10 mx-10 md:px-8">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {/* Header */}
                <div className="w-full text-center md:text-left mb-6">
                    <h2 className="text-3xl font-semibold mb-4 acu-blue">{title}</h2>
                    <div className="block md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="mt-1">
                            {isOpen ? "▲" : "▼"}
                        </button>
                        {isOpen && (
                            <div className="overflow-auto h-64">
                                {topics.map((topic, index) => (
                                    <Link
                                        key={index}
                                        to={topic.id}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                        className="cursor-pointer block mb-2"
                                    >
                                        {index + 1}. {topic.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Side Menu */}
                <div className="hidden md:block my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3">
                    <div className="overflow-auto h-screen">
                        {topics.map((topic, index) => (
                            <Link
                                key={index}
                                to={topic.id}
                                spy={true}
                                smooth={true}
                                duration={500}
                                className="cursor-pointer block mb-4 text-[12px] font-semibold"
                            >
                                {useRomans ? convertToRoman(index + 1) : index + 1}. {topic.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="my-1 px-1 w-full md:w-2/3 lg:my-4 lg:px-4 lg:w-2/3">
                    <h3 className="font-semibold text-2xl acu-blue mb-8">{header}</h3>
                    {
                        subheader && subheader.length > 0 && subheader.map((sh, index) => (
                            <p key={index} className="text-sm mb-6 text-justify">{sh.p}</p>
                        ))
                    }
                    {topics.map((topic, index) => (
                        <div id={topic.id} key={index} className="mb-8 mt-4">
                            <h4 className="text-base font-semibold mb-2">{useRomans ? convertToRoman(index + 1) : index + 1}. {topic.title}</h4>
                            {
                                Array.isArray(topic.description) && topic.description.length > 0 && topic.description.map((desc, index) => (
                                    <p key={index} className="text-justify text-sm my-4">{desc.d}</p>
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TermsPolicy