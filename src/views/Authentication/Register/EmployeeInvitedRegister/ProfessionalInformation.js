import React, { useEffect, useMemo, useState } from "react";
import FormTitle from "../../../../components/Form/FormTitle";
import FormInput from "../../../../components/Form/FormInput";
import FormSelect from "../../../../components/Form/FormSelect";
import { isNumberBetween, isObjEmpty } from "../../../../components/utils";
import { FormInputFile } from "../../../../components/Form/FormInputFile";
import { useFormValidator } from "../../../../hooks/useFormValidator";
import { GRADE_CERTIFICATES, MONTHS } from "../../../../config/config";



export function ProfessionalInformation(props) {



    const minYear = new Date().getFullYear() - 100
    const maxYear = new Date().getFullYear()

    const [errorMsg, setErrorMsg] = useState(false)
    const [fileUrl, setFileUrl] = useState()
    const invalidValues = useFormValidator(props.form, [
        "gradeDegree",
        "grade",
        "degreeYear",
        "title",
        "institute",
        "center",
        "occupation",
        "month",
        "year",
    ])

    const [errorMsgByName, setErrorMsgByName] = useState({
        gradeDegree: '',
        grade: '',
        degreeYear: '',
        title: '',
        institute: '',
        center: '',
        occupation: '',
        month: '',
        year: '',
    })


    const manejadorChange = (e, setState) => {
        if (e.target.name === "year") {
            if (!isNumberBetween(e.target.value, minYear, maxYear)) {
                setErrorMsg("Año no es valido")
            }
        }
        if (e.target.name === "gradeDegree") {
            if (e.target.value === "other") {
                props.setForm((prevState) => ({
                    ...prevState,
                    ['grade']: undefined
                }))
            } else {
                props.setForm((prevState) => ({
                    ...prevState,
                    ['grade']: e.target.value
                }))
            }
        }

        props.setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const showInputCertificate = useMemo(() => {
        return props.form?.gradeDegree === "other"
    }, [props.form])

    useEffect(() => {
        if (invalidValues?.length > 0) {
            setErrorMsgByName((prevState) => ({
                [invalidValues]: `${document.getElementsByName(invalidValues)[0]?.title} es Inválido.`,
            }))
        } else {
            setErrorMsgByName({})
        }

        props.setForm((prevState) => ({
            ...prevState,
            file: fileUrl?.file || ""
        }))
    }, [fileUrl, invalidValues])

    useEffect(() => {
        props.setCanContinue(isObjEmpty(errorMsgByName))
    }, [errorMsgByName])

    return (
        <>
            <FormTitle mainTitle={'Empleado(a)'}
                secondTitle={'Información Profesional'}
                style={'bg-[#88C7F1] font-sm mb-2 font-sans rounded-lg'}
            >
                <div className="alert alert-secondary" role="alert">
                    <strong>Todos los campos son requeridos</strong>
                </div>
            </FormTitle>
            {props.errorMsg &&
                <div className="bg-red-500 text-white p-3 rounded text-center mt-3" role="alert">
                    {props.errorMsg}
                </div>
            }
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <FormSelect title={"Grado"} name={"gradeDegree"} setValue={props.setForm}
                                value={props?.form["gradeDegree"]} items={GRADE_CERTIFICATES}
                                onChangeHandler={manejadorChange} error={errorMsgByName.gradeDegree}
                            />
                            {showInputCertificate &&
                                <FormInput type={"text"} title={"Grado"} name={"grade"} defaultValue={props.form.grade}
                                    onChangeHandler={manejadorChange} placeholder={"Grado"} error={errorMsgByName.grade}
                                />}
                        </div>
                        <div className={'col-md-6'}>
                            <FormInput title={"Año otorgado"} type={'number'} min={minYear}
                                max={maxYear} maxLength={4} defaultValue={props.form.degreeYear}
                                setValue={props.setForm} name={"degreeYear"}
                                onChangeHandler={manejadorChange} placeholder={"Año otorgado"} error={errorMsgByName.degreeYear}
                            />
                        </div>
                    </div>
                    <FormInput type={"text"} title={"Titulo"} setValue={props.setForm} defaultValue={props.form.title}
                        name={"title"} onChangeHandler={manejadorChange} placeholder={"Título"} error={errorMsgByName.title}
                    />
                    <FormInput type={"text"} title={"Institucion Académica"} setValue={props.setValue}
                        name={"institute"} onChangeHandler={manejadorChange} defaultValue={props.form.institute}
                        placeholder={"Institución  Académica"} error={errorMsgByName.institute}
                    />
                    <div style={{ margin: '30px 0' }}>
                        <FormInputFile file={fileUrl} setFileUrl={setFileUrl} />
                    </div>
                    <FormInput type={"text"} title={"Nombre del Lugar donde ejerce"} setValue={props.setForm}
                        name={"center"}
                        onChangeHandler={manejadorChange} defaultValue={props.form.center} placeholder={"Lugar de trabajo"} error={errorMsgByName.center}
                    />
                    <FormInput type={"text"} title={"Puesto que ocupa"} setValue={props.setForm} name={"occupation"}
                        onChangeHandler={manejadorChange} defaultValue={props.form.occupation} placeholder={"Puesto"} error={errorMsgByName.occupation}
                    />
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <FormSelect title={"¿Desde cuándo ejerce?"} name={"month"}
                                value={props.form["month"]} items={MONTHS} defaultValue={props.form.month} onChangeHandler={manejadorChange} error={MONTHS.map(grade => grade.id).find(item => item === props.form["month"]) ? '' : 'Mes inválido.'}
                            />
                        </div>
                        <div className={'col-md-6'}>
                            <FormInput title={"Año"} type={'number'} min={minYear}
                                max={maxYear} maxLength={4}
                                setValue={props.setForm} name={"year"} defaultValue={props.form.year}
                                onChangeHandler={manejadorChange} placeholder={"Año"} error={errorMsgByName.year}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
