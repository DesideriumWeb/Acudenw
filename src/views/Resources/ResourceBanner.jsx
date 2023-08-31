import {FaPlay} from "react-icons/fa";
import React from "react";

const ResourceBanner = ({defaultResource}) => {
    return(
        <section className="bg-[url(https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)] bg-center rounded-lg overflow-hidden">
            <div className="bg-zinc-800 bg-opacity-60 px-10 py-20 gap-4 flex flex-col text-white">
                <h1 className="font-semibold text-lg">
                    Sint ullamco sunt sit irure ut ex.
                </h1>
                <p className="max-w-lg">
                    Do nostrud nulla id voluptate pariatur nulla irure anim tempor
                    ullamco voluptate esse ea cupidatat. Sunt irure incididunt sit
                    cillum anim exercitation laborum consectetur veniam aute.
                </p>

                <div className="flex flex-row gap-3 items-center">
                    <FaPlay color="white" />
                    Ver Video
                </div>
            </div>
        </section>
    );
}

export default ResourceBanner