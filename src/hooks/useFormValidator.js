import {useEffect, useState} from "react";

/**
 * Validate if a form is complete.
 * Meant to be used in complex forms with multiple inputs.
 * @param {Object} form the form object
 * @param {string[]} valuesToValidate an array containing the names of values to validate
 * @return {string || []} The string containing the first invalid item found
 * */
export function useFormValidator(form, valuesToValidate) {
    const [invalidValues, setInvalidValues] = useState([])

    useEffect(() => {
            const missingValues = valuesToValidate.find((value) => {
            if (!form[value]) return value
        })

        setInvalidValues(missingValues)

    }, [form])

    return invalidValues
}
