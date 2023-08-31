/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import Navbar from "../General/Navbar";
import Footer from "../General/Footer";
import Law from "../General/Law";
import {useEffect} from "react";
/**
 * PortalLayout component that provides a consistent layout for portal pages.
 *
 * This component ensures that when navigating between pages, the new page starts
 * at the top of the scroll position.
 *
 * @version 1.0.2
 * @component
 * @param {ReactNode} children - The content to be displayed within the layout.
 * @returns {JSX.Element} - The rendered PortalLayout component.
 */
const PortalLayout = ({children}) => {
    /**
     * Scroll to the top of the page when the component is mounted or children change.
     *
     * @version 1.0.0
     * @return {void}
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [children]);

    return(
        <>
            <Navbar/>
            <div className="w-full flex flex-col min-h-screen">{children}</div>
            <Footer/>
            <Law/>
        </>
    );
}

export default PortalLayout;