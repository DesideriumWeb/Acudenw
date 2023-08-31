import React from 'react'

export default function ListSideBySideContainer({children, smallSide = ''}) {
    return (
        <div className={'row justify-content-center'}>
            <div className={`col-${smallSide === 'left' ? 3 : smallSide === 'right' ? 9 : 6} mr-1 border-dark`}>{React.Children.toArray(children)[0]}</div>
            <div className={`col-${smallSide === 'left' ? 9 : smallSide === 'right' ? 3 : 6} ml-1 border-dark`}>{React.Children.toArray(children)[1]}</div>
        </div>
    )
}