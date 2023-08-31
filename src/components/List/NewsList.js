import React, {useCallback, useEffect, useState} from 'react'
import {BsChevronRight} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {NewsService} from "../../services/newsServices/NewsService";

const defaultImage = "https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"

export default function NewsList({news = []}) {

    const navigate = useNavigate()
    const [realImages, setRealImages] = useState(news)

    const handleNavigation = useCallback((id) => {
        navigate(`${id}`,
            {
                relative: 'path',
                state: news
            })
    }, [news])

    useEffect(() => {
        const fetchImages = async (items) => {
            const imgArr = []
            for (const d of items) {
                const imageResult = await new NewsService().getNewsImage(d.id)
                imgArr.push({
                    ...d,
                    imageBase64: !!imageResult ? URL.createObjectURL(imageResult) : defaultImage
                })
            }
            setRealImages(imgArr)
        }

        if (news.length > 0) {
            fetchImages(news)
        }
    }, [news])

    return (
        <section className="tw-my-12 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-12 tw-w-full">
            {realImages.map(({id, title, authorName, imageAlt, imageFilePath, description, imageBase64}, index) => (
                <div
                    key={index}
                    className="tw-flex tw-flex-row tw-justify-start tw-items-center tw-gap-1 tw-shadow-md tw-rounded-lg tw-overflow-hidden"
                >
                    <div className="tw-flex-1 tw-bg-black tw-h-full">
                        <img
                            src={imageBase64}
                            alt="img"
                            className="tw-h-full tw-w-full"
                        />
                    </div>
                    <div
                        className="tw-flex tw-flex-col tw-items-start tw-justify-center tw-flex-[2] tw-py-8 tw-gap-3 tw-px-4">
                        <h2 className="font-semibold text-xl">{title}</h2>
                        <p className="text-sm line-clamp-3 tw-py-0 tw-my-0">
                            {description}
                        </p>
                        <div className="tw-flex tw-flex-row tw-gap-5 tw-text-sm tw-items-center">
                            <p className="tw-my-0 tw-py-0">
                                {authorName}
                            </p>
                            {/*<Link to={`${id}`} relative={'path'}>*/}
                            <div
                                onClick={() => handleNavigation(id)}
                                className="tw-font-bold tw-flex tw-flex-row tw-gap-2 tw-items-center tw-min-w-[100px]">
                                Leer Mas <BsChevronRight/>
                            </div>
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
