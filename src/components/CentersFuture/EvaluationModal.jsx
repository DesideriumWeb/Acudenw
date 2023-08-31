/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {STRINGS} from "../../config/config";
import React, {useCallback, useEffect, useState} from "react";
import EvaluationForm from "./EvaluationForm";

const EvaluationModal = ({ showModal = false, setShowModal, submitEvaluation = null, loading }) => {

    const [form, setForm] = useState({
        completedByName: "",
        completedByJob: "",
        certification: false,
    });

    const [errors, setErrors] = useState({
        completedByName: "",
        completedByJob: "",
        certification: "",
    });
    /**
     * Handle input change for form fields.
     * @param {Event} e - The input change event.
     */
    const handleChange = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);
    /**
     * Handle checkbox change for the "certification" field.
     * @param {Event} e - The checkbox change event.
     */
    const handleCheckboxChange = (e) => {
        setForm({
            ...form,
            certification: e.target.checked,
        });
    };
    /**
     * Handle form submission.
     */
    const handleSubmit = () => {

        validateForm();

        if (isFormValid()) {
            submitEvaluation && submitEvaluation({
                completedByName: form.completedByName,
                completedByJob: form.completedByJob,
            });
        }

    };

    useEffect(() => {

        setForm({
            completedByName: "",
            completedByJob: "",
            certification: false,
        })

        setErrors({
            completedByName: "",
            completedByJob: "",
            certification: "",
        })

    }, [showModal]);
    /**
     * Validate the form and update the error state accordingly.
     */
    const validateForm = () => {

        let completedByNameError = "";
        let completedByJobError = "";
        let certificationError = "";

        if (!form.completedByName.trim()) {
            completedByNameError = "El nombre es requerido.";
        }

        if (!form.completedByJob.trim()) {
            completedByJobError = "El puesto es requerido.";
        }

        if (!form.certification) {
            certificationError = "El acuerdo de certificación es requerido.";
        }

        setErrors({
            completedByName: completedByNameError,
            completedByJob: completedByJobError,
            certification: certificationError,
        });
    };
    /**
     * Check if the form is valid (no errors and certification is checked).
     * @returns {boolean} - True if the form is valid, otherwise false.
     */
    const isFormValid = () => {
        return (
            !errors.completedByName &&
            !errors.completedByJob &&
            !errors.certification &&
            form.certification
        );
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="my-2">
                            <div className="max-w-[460px]">
                                <div className="border-0 rounded-lg shadow-lg flex flex-col px-6 py-3 bg-white outline-none focus:outline-none">
                                    <div className="flex justify-end py-4">
                                        <button
                                            className="border-0 text-[#092C4C] text-3xl"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M29.1165 24.8816C30.2883 26.0534 30.2883 27.9517 29.1165 29.1235C28.5353 29.7094 27.7666 30 26.9979 30C26.2292 30 25.4624 29.7071 24.8774 29.1212L14.9988 19.2477L5.12116 29.1188C4.53527 29.7094 3.76752 30 2.99977 30C2.23201 30 1.4652 29.7094 0.878838 29.1188C-0.292946 27.947 -0.292946 26.0487 0.878838 24.877L10.7593 14.9965L0.878838 5.12069C-0.292946 3.94891 -0.292946 2.05062 0.878838 0.878838C2.05062 -0.292946 3.94891 -0.292946 5.12069 0.878838L14.9988 10.764L24.8793 0.883525C26.0511 -0.288258 27.9494 -0.288258 29.1212 0.883525C30.2929 2.05531 30.2929 3.9536 29.1212 5.12538L19.2407 15.0059L29.1165 24.8816Z"
                                                    fill="#092C4C"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex flex-row text-2xl font-bold my-3 mx-4">
                                        {STRINGS.CDF_EVALUATION_TITLE}
                                    </div>

                                    <div className="mx-4 mt-2 py-6 font-semibold">
                                        <p>{STRINGS.CDF_EVALUATION_SUBTITLE}</p>
                                    </div>

                                    <EvaluationForm
                                        form={form}
                                        errors={errors}
                                        handleChange={handleChange}
                                        handleCheckboxChange={handleCheckboxChange}
                                        handleSubmit={handleSubmit}
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="opacity-25 fixed inset-0 z-40 bg-black"
                        onClick={() => setShowModal(false)}
                    ></div>
                </>
            ) : null}
        </>
    );
};

export default EvaluationModal;


