import {useEffect, useState} from "react";
import ProviderService from "../../services/userServices/ProviderService";

export default function useGetTopProvider() {

    const [topProviders, setTopProviders] = useState([])

    useEffect(()=>{
        const fetchProviders = async () => {
            //TODO Inprende. Les recomiendo paginar esto.
            const {data} = await new ProviderService().getTopProviders()
            setTopProviders(data)
        }

        fetchProviders()
    },[])

    return topProviders
}