import { Dialog } from "primereact/dialog";
import FormInput from "../../Form/FormInput";
import { useEffect, useState } from "react";
import { AcceptanceButton } from "../../Buttons";
import SmallSpinner from "../../General/SmallSpinner";
import BasicAlert from "../../General/BasicAlert";
import { FormInputFile } from "../../Form/FormInputFile";

const CertificationForm = ({ initialValues, form, setForm, setDialogVisible, dialogVisible, file, setFileUrl, onSubmitHandler, alertError, loading, errors }) => {

    /**
     * Sets initial values on load
     */
    useEffect(() => {
        setForm({
            ...initialValues,
            dateEarned: initialValues.dateEarned && initialValues.dateEarned.split(' ')[0].split('-').reverse().join('-')
        })
    }, [initialValues])

    /**
    * Renders the footer section of the form with buttons and loading spinner.
    */
    const footer = (
        <div className="flex items-center gap-3">
            <AcceptanceButton title={'Guardar'} onClickHandler={() => onSubmitHandler()} />
            <SmallSpinner loading={loading} />
            {alertError ? <div className="mt-4 text-sm"><BasicAlert color="red" errorMsg="Lo sentimos, se ha producido un error. Trate nuevamente." /></div> : null}
        </div>
    );

    /**
     * Updates the form state when input values change.
     * @param {object} e - The event object from the input element.
     * @param {function} setValue - The setter function for the value being updated.
     */
    const onChangeHandler = (e, setValue) => {
        const { name, value } = e.target;
        let updatedValue = value;

        setForm((prevState) => ({
            ...prevState,
            [name]: updatedValue
        }));
    };

    return (
        <Dialog
            visible={dialogVisible}
            header={
                <>
                    <h2>Añadir Certificación</h2>
                </>
            }
            onHide={() => {
                setDialogVisible(false)
            }}
            // onShow={() => resetDialog()}
            style={{ width: '60vw' }}
            footer={footer}
        >

            <div className="w-full flex flex-row">
                <FormInput
                    title={'Título'}
                    type={'text'}
                    onChangeHandler={onChangeHandler}
                    setValue={setForm}
                    value={form.title}
                    name={'title'}
                    error={errors.title}
                    maxLength={50}
                />
            </div>
            <div className="w-full flex flex-row">
                <FormInput
                    title={'Institución Académica'}
                    type={'text'}
                    onChangeHandler={onChangeHandler}
                    setValue={setForm}
                    value={form.academicInstitution}
                    name={'academicInstitution'}
                    error={errors.academicInstitution}
                    maxLength={50}
                />
            </div>
            <div className="w-full flex flex-row">
                <FormInput
                    title={'Fecha de Otorgación'}
                    type={'date'}
                    onChangeHandler={onChangeHandler}
                    setValue={setForm}
                    value={form.dateEarned}
                    name={'dateEarned'}
                    error={errors.dateEarned}
                    maxLength={50}
                />
            </div>
            <hr className="py-2 my-2" />
            <div className="w-full flex justify-center">
                <div className="w-full">
                    <FormInputFile file={file} setFileUrl={setFileUrl} title="Adjuntar Título (*pdf)" />
                </div>
            </div>
            {errors.file && (
                <div className="w-full flex-row">
                    <p className="text-red-500 text-sm mt-2 ml-4">{errors.file}</p>
                </div>
            )}
            <hr className="mt-6" />
        </Dialog>);
}

export default CertificationForm;