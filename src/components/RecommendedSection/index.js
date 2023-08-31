import React, {useMemo} from 'react'
import {BsChevronRight} from "react-icons/bs";
import {Link, useLocation} from "react-router-dom";

export default function RecommendedSection({sectionTitle, recommendedArticles}) {
    const articles = useMemo(() => recommendedArticles, [recommendedArticles])
    const {state} = useLocation()
    return (
        <>
            <div className="tw-bg-gray-300 tw-py-6">
                <section className="tw-max-w-6xl tw-p-3 tw-mx-auto">
                    <h1 className="tw-text-xl tw-font-semibold tw-my-1">{sectionTitle}</h1>
                    <div className="tw-my-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-12 tw-w-full">
                        {articles.map(({id, title, description}, index) => (
                            <div
                                key={index}
                                className="tw-flex tw-flex-row tw-justify-start tw-items-center tw-gap-1 tw-shadow-md tw-rounded-lg tw-overflow-hidden tw-bg-white"
                            >
                                <div className="tw-flex-1 tw-bg-black tw-h-full">
                                    <img
                                        src="https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                        alt="img"
                                        width={150}
                                        height={150}
                                        className="tw-object-cover tw-h-full"
                                    />
                                </div>
                                <div
                                    className="tw-flex tw-flex-col tw-items-start tw-justify-center tw-flex-[2] tw-py-8 tw-gap-3 tw-px-4">
                                    <h2 className="tw-font-semibold tw-text-xl">
                                        {title}
                                    </h2>
                                    <p className="tw-text-sm tw-line-clamp-3 tw-my-0 tw-py-0">
                                        {description}
                                    </p>

                                    <div className="tw-flex tw-flex-row tw-gap-5 tw-text-sm tw-items-end"
                                    >
                                        <Link
                                            state={state}
                                            to={`/News/${id}`}
                                            className="tw-font-bold tw-flex tw-flex-row tw-gap-2 tw-items-center tw-min-w-[100px] hover:tw-cursor-pointer">
                                            Leer Mas <BsChevronRight/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
