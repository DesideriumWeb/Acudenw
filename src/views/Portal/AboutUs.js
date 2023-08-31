import React from 'react';
import {AboutTitle} from './AboutUsComponents/AboutTitle';
import {AcudenAcademy} from './AboutUsComponents/AcudenAcademy';
import {FamilyDepartment} from './AboutUsComponents/FamilyDepartment';
import {OurMision} from './AboutUsComponents/OurMision';
import {PreschoolDevelopment} from './AboutUsComponents/PreschoolDevelopment';
import {ProgramChildCare} from './AboutUsComponents/ProgramChildCare';
import {QualitySystem} from './AboutUsComponents/QualitySystem';

export function AboutUs() {
    return (
        <>
            <AboutTitle/>
            <AcudenAcademy/>
            <OurMision/>
            <FamilyDepartment/>
            <ProgramChildCare/>
            <PreschoolDevelopment/>
            <QualitySystem/>
        </>
    );
} 