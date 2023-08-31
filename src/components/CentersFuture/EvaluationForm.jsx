/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {STRINGS} from "../../config/config";
import SmallSpinner from "../General/SmallSpinner";
import React from "react";

const EvaluationForm = ({ form, errors, handleChange, handleCheckboxChange, handleSubmit, loading }) => {
    return (
        <div>
            <div className="mx-4 mt-6">
                <label className="block text-sm font-medium">
                    { STRINGS.CDF_EVALUATION_NAME_LABEL }
                    <span className="text-red-500">*</span>
                </label>
                <input
                    placeholder="Nombre Apellido"
                    type="text"
                    name="completedByName"
                    value={form.completedByName}
                    onChange={handleChange}
                    className={`mt-2 block w-full p-2 border rounded-md ${
                        errors.completedByName ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.completedByName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.completedByName}</p>
                )}
            </div>

            <div className="mx-4 mt-8">
                <label className="block text-sm font-medium">
                    { STRINGS.CDF_EVALUATION_JOB_LABEL }
                    <span className="text-red-500">*</span>
                </label>
                <input
                    placeholder="Puesto"
                    type="text"
                    name="completedByJob"
                    value={form.completedByJob}
                    onChange={handleChange}
                    className={`mt-2 block w-full p-2 border rounded-md ${
                        errors.completedByJob ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.completedByJob && (
                    <p className="mt-1 text-red-500 text-sm">{errors.completedByJob}</p>
                )}
            </div>

            <div className="flex items-center mx-4 mt-12">
                <input
                    type="checkbox"
                    name="certification"
                    checked={form.certification}
                    onChange={handleCheckboxChange}
                    className={`w-8 h-8 text-indigo-600 border rounded ${
                        errors.certification ? "border-red-500" : "border-gray-300"
                    } focus:ring-indigo-500`}
                />
                <label htmlFor="certification" className="ml-2 block text-sm font-semibold">
                    { STRINGS.CDF_EVALUATION_CERT_AGREE }
                </label>
            </div>
            {errors.certification && (
                <p className="mx-4 mt-1 text-red-500 text-sm">
                    Acuerdo de certificación es requerido.
                </p>
            )}

            <button
                type="button"
                className="form-btn mt-12 hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A]
                hover:shadow-md transition-all"
                onClick={handleSubmit}
            >
                {STRINGS.CDF_EVALUATION_SUBMIT} <SmallSpinner loading={loading} />
            </button>
        </div>
    );
};

export default EvaluationForm;
