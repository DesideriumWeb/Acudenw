import React from 'react'

export default function DashboardGrid({children}) {

    return (
        <section className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
            <div className={'bg-white shadow-small p-6 rounded-lg flex flex-col'}>
                {React.Children.toArray(children)[0]}
            </div>
            <div className={'bg-white shadow-small p-6 rounded-lg'}>
                {React.Children.toArray(children)[1]}
            </div>
            <div className="md:row-span-2 flex flex-col gap-3 bg-cyan-800 bg-opacity-10 p-3 rounded-lg h-[500px] md:h-[700px] overflow-hidden">
                {React.Children.toArray(children)[2]}
            </div>
            <div className="bg-white col-span-1 md:col-span-2 shadow-small p-6 rounded-lg">
                {React.Children.toArray(children)[3]}
            </div>
        </section>

    )
}