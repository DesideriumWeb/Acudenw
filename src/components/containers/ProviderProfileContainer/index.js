import React from 'react'
import Gallery from "../../Gallery";

export default function ProviderProfileContainer({children}) {
    //TODO: Replace hardcoded data.
    return (
        <>
            <section className="py-5 pt-12">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
                    {React.Children.toArray(children)[0]}
                    <div className="bg-white shadow-small p-6 rounded-lg">
                        {React.Children.toArray(children)[1]}
                    </div>
                    <div className="col-span-1 flex flex-col gap-3 bg-cyan-800 bg-opacity-10 p-3 rounded-lg h-[560px] overflow-hidden">
                        {React.Children.toArray(children)[2]}
                    </div>
                </div>
            </section>
            {React.Children.toArray(children)[3]}
        </>
    )
}
