import {useEffect, useState} from "react";
import {NewsService} from "../../services/newsServices/NewsService";

export default function useNewsDetail(id) {

    const [newsArticle, setNewsArticle] = useState({})

    useEffect(() => {
        const getNewsArticle = async (id) => {
            const {data} = await NewsService.getNewsById(id)
            setNewsArticle(data)
        }

        if (id) getNewsArticle(id)
    }, [id])

    return newsArticle
}