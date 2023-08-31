/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from 'react'
import { AcceptanceButton, BackButton } from "../Buttons";

export const Stepper = ({ children, onFinish, currentIndex, onNext, onPrevious, canContinue, setCanContinue }) => {
    const goToNext = () => {
        onNext()
    }

    const goToPrevious = () => {
        onPrevious()
    }

    const goToFinish = () => {
        onFinish()
    }

    const currentChild = React.Children.toArray(children)[currentIndex]


    if (React.isValidElement(currentChild)) {
        return (<>
            {React.cloneElement(currentChild, { setCanContinue })}
            <div className={"grid grid-flow-col justify-stretch gap-4"}>
                <BackButton onClickHandler={goToPrevious}/>
                {currentIndex !== (React.Children.toArray(children).length - 1)
                    ? <AcceptanceButton title={"Continuar"} onClickHandler={goToNext} disabled={!canContinue} />
                    : <AcceptanceButton title={"Concluir"} onClickHandler={goToFinish} disabled={!canContinue} />
                }
                
            </div>
        </>)
    }

    
    return currentChild

}