import React from 'react'
import { FaPlay } from "react-icons/fa";

export default function ListVideoPreviews({items = []}) {

    return (
        <section className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-8  tw-my-12">
            {items.map(({image, title, desc}, index) => (
                <div key={index} className="tw-w-full tw-flex tw-flex-col tw-gap-3">
                    <div
                        style={{
                            background: `url(${image})`,
                            backgroundSize: "cover",
                        }}
                        className={`tw-aspect-video tw-w-full tw-rounded-lg tw-relative`}
                    >
                        <FaPlay
                            color="white"
                            className="tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-text-3xl"
                        />
                    </div>

                    <h2 className="tw-text-cyan-900 tw-font-semibold">{title}</h2>
                    <p className="tw-line-clamp-2 tw-my-0 tw-py-0">{desc}</p>
                    <button className="tw-p-2 tw-border-2 tw-border-cyan-900 tw-text-cyan-900 tw-w-fit tw-rounded-md">
                        Ver video
                    </button>
                </div>
            ))}
        </section>
    )
}