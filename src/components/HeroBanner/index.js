import React from 'react'
import {Link} from "react-router-dom";

const defaultImage = 'https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'

export default function HeroBanner({
                                       authorName = false, date = false, title = false,
                                       description = false, id = false, imageFilePath = '',
                                       navigate = false
                                   }) {

    return (
        <section
            style={{backgroundImage: `url(${!!imageFilePath ? imageFilePath : defaultImage})`}}
            className={`tw-bg-center tw-rounded-lg tw-overflow-hidden`}>
            <div
                className="tw-bg-zinc-800 tw-bg-opacity-60 tw-px-10 tw-py-20 tw-gap-4 tw-flex tw-flex-col tw-text-white">
                <div className="tw-flex tw-flex-row tw-gap-3 tw-items-center">
                    <div className="tw-bg-white tw-rounded-full tw-h-10 tw-w-10"></div>
                    <div className="tw-flex tw-flex-col tw-text-sm">
                        {authorName && <p className="tw-font-semibold">{authorName}</p>}
                        {date && <p className="tw-text-xs">{date}</p>}
                    </div>
                </div>
                {title && <h1 className="tw-font-semibold tw-text-lg">
                    {title}
                </h1>}
                {description && <p className="tw-max-w-lg tw-py-0 tw-my-0">
                    {description}
                </p>}

                {navigate && <button
                    className="tw-text-cyan-900 tw-bg-white tw-px-5 tw-py-2 tw-text-sm tw-rounded-md tw-w-fit tw-font-semibold">
                    <Link className={'tw-text-inherit'} to={`/News/${id}`}>
                        Leer Mas
                    </Link>
                </button>}
            </div>
        </section>
    )
}
