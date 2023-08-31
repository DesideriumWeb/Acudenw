/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'

export default function ProfileContainer({children}) {


    return (
        <section className="py-5 pt-10">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-6">
                <div className="col-span-2 flex flex-col gap-8">
                    {React.Children.toArray(children)[0]}
                    <div className="p-3 py-6 shadow-small rounded-lg flex flex-col gap-3 mb-2 h-[400px] overflow-y-auto">
                        {React.Children.toArray(children)[1]}
                    </div>
                    <div className="p-3 py-6 shadow-small rounded-lg flex flex-col gap-3 mb-2 h-[400px] overflow-y-auto">
                        {React.Children.toArray(children)[2]}
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-3 bg-white bg-opacity-10 p-3 rounded-lg h-[535px] overflow-hidden shadow-lg">
                        <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
                            {React.Children.toArray(children)[3]}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 bg-white bg-opacity-10 p-3 rounded-lg h-[540px] overflow-hidden shadow-lg">
                        <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
                            {React.Children.toArray(children)[4]}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
