import React from 'react'

export default function SideBySideContainer({children}) {
    return (
        <>
            <div className={'parent-container d-flex'}>
                <div className={"container m-2"}>
                    <div className={'row justify-content-center'}>
                        <div className={'col border border-dark'}>{React.Children.toArray(children)[0]}</div>
                    </div>
                </div>

                <div className={"container m-2"}>
                    <div className={'row justify-content-center'}>
                        <div className={'col border border-dark'}>{React.Children.toArray(children)[1]}</div>
                    </div>
                </div>
            </div>
        </>
    )
}