import InvisibleStepper from "../../components/InvisibleStepper";
import {useCallback, useMemo, useState} from "react";
import {EmailForm} from "./ForgotPassword/EmailFormForgotPassword";
import {PasswordForm} from "./Register/ProviderRegister/PasswordForm";
import {ProviderGeneralInformation} from "./Register/ProviderRegister/ProviderGeneralInformation";
import CentralContainer from "../../components/containers/CentralContainer";
import ProviderService from "../../services/userServices/ProviderService";
import {useNavigate} from "react-router-dom";

export default function RestorePassword() {
    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [steps, setSteps] = useState([
        {
            name: 'email',
            status: 'current',
            componentToDisplay: EmailForm
        },
        {
            name: 'submit',
            status: 'upcoming',
            componentToDisplay: ProviderGeneralInformation
        }
    ])

    // This method must return a boolean in every instance it is used
    const submit = useCallback(async () => {
        const {data} = await new ProviderService().save(form)
        if(data?.httpCode === 200) {
            navigate("/")
        }
    }, [form])

    const stepToDisplay = useMemo(
        () => steps.find(step => step.status === 'current'), [steps]
    )

    return (
        <CentralContainer>
            <InvisibleStepper steps={steps} setSteps={setSteps} stepToDisplay={stepToDisplay}
                              form={form} setForm={setForm} submitMethod={submit}/>
        </CentralContainer>
    )
}