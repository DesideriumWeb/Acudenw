import ProviderService from "../../services/userServices/ProviderService";
import React, {useCallback, useState} from "react";
import {checkIfEmailIsValid} from "../utils";
import {ALERT_TYPES, CONSTANTS, STRINGS} from "../../config/config";
import {IoPersonCircle} from "react-icons/io5";
import BasicAlert from "../General/BasicAlert";
import FormInput from "../Form/FormInput";
import SmallSpinner from "../General/SmallSpinner";
import ListWithImageDisplay from "../List/ListWithImageDisplay";
import {Dialog} from "primereact/dialog";
import useGetProviderInvitations from "../../hooks/Provider/useGetProviderInvitations";
import useEmployees from "../../hooks/Employees/useEmployees";
import { CardTitle } from "../Card";



const ProviderInvitations = ({manageEmployeeModalVisible = false, setManageEmployeeModalVisible}) => {

    const [employees, retry] = useEmployees()
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteName, setInviteName] = useState('')
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [retrySearch, setRetrySearch] = useState(0)
    const invitations = useGetProviderInvitations(retrySearch)
    const [processError, setProcessError] = useState('')
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    const removeEmployeeInvitation = async (id) => {
        const data = await new ProviderService().removeEmployeeInvitation(id)
        setRetrySearch((prevState) => prevState + 1)
        data && retry((prevState) => prevState + 1)
    }

    const createEmployeeInvitation = useCallback(async () => {

        let isValid = true;

        setSpinnerLoading(isValid)
        setProcessError('')

        // Validar el email
        if (!checkIfEmailIsValid(inviteEmail)) {
            setEmailError('El email ingresado no es válido');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Validar el nombre
        if (inviteName.trim() === '') {
            setNameError('El nombre es obligatorio');
            isValid = false;
            setSpinnerLoading(isValid)
        } else if (inviteName.trim().length < 8) {
            setNameError('El nombre debe tener al menos 8 caracteres');
            isValid = false;
            setSpinnerLoading(isValid)
        } else {
            setNameError('');
        }

        if (isValid) {
            try {
                const data = await new ProviderService().createInvitation(inviteEmail, inviteName);
                setRetrySearch((prevState) => prevState + 1);
                data && setManageEmployeeModalVisible(false);
            } catch (error) {
                console.log('Error al crear la invitación:', error);
                if(error && error.response.data.message)
                    setProcessError(error.response.data.message)
                else
                    setProcessError(STRINGS.GENERIC_ERROR)
            } finally {
                setSpinnerLoading(false);
            }
        }
    }, [inviteEmail, inviteName]);

    const resetInviteDialog = () => {
        setInviteEmail('')
        setInviteName('')
        setEmailError('')
        setNameError('')
        setProcessError('')
        setSpinnerLoading(false)
    }

    const onChangeEmail = async (e, updateEmail) => {
        if (checkIfEmailIsValid(e.target.value)) {
            updateEmail(e.target.value)
        } else {
            updateEmail('')
        }
    }

    const onChangeName = async (e, updateName) => {
        updateName(e.target.value)
    }

    return(
        <Dialog
            onShow={resetInviteDialog}
            header={
                <div className="w-full">
                    <div className="flex justify-center">
                        <IoPersonCircle size={40} className="acu-blue mr-2" />
                        <p className="text-3xl acu-blue">Panel de Invitación para Empleados</p>
                    </div>
                    {
                        processError ?
                            (
                                <div className="flex justify-center mt-4 text-sm">
                                    <BasicAlert errorMsg={processError} color={ALERT_TYPES.DANGER}/>
                                </div>
                            ) : null
                    }
                    <hr className="my-4" style={{ borderBottomColor: CONSTANTS.LOADING_SPINNER_COLOR }} />
                    <div className="flex flex-col sm:flex-row content-center">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:w-full">
                            <FormInput
                                title="Correo electrónico"
                                name="email"
                                setValue={setInviteEmail}
                                type="text"
                                onChangeHandler={onChangeEmail}
                                placeholder="Correo electrónico"
                                className="w-full"
                                error={emailError}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:w-full">
                            <FormInput
                                title="Nombre"
                                name="name"
                                setValue={setInviteName}
                                type="text"
                                onChangeHandler={onChangeName}
                                placeholder="Nombre de empleado"
                                className="w-full"
                                error={nameError}
                            />
                        </div>
                    </div>
                        <div className={`w-full flex justify-end py-2 px-3`}>
                                <button
                                    className="bg-[#092C4C] rounded-md text-white mt-4 sm:mt-0 p-2
                                        hover:bg-[#A7D02A] hover:text-[#092C4C] hover:shadow-md transition-colors
                                        duration-300 text-base"
                                    title="Enviar invitación"
                                    onClick={createEmployeeInvitation}
                                >
                                    Enviar invitación <SmallSpinner loading={spinnerLoading}/>
                                </button>
                        </div>
                    
                    <hr className="my-4" style={{ borderColor: `${CONSTANTS.LOADING_SPINNER_COLOR}` }} />

                    <>
                    <div className="flex flex-col gap-3 bg-[#E7EFF1] p-5 rounded-lg">
                        <div>
                            <CardTitle title={"Empleados invitados"}/>
                            <ListWithImageDisplay
                                items={invitations}
                                firstAction={removeEmployeeInvitation}/>
                        </div>                        
                    </div>                          
                    </>

                    
                    
                </div>
            }
            className="bg-cyan-900 bg-opacity-10"
            style={{ width: '75vw', background: 'gray' }}
            visible={manageEmployeeModalVisible}
            onHide={() => setManageEmployeeModalVisible(false)}
        >
        </Dialog>
    );
}
export default ProviderInvitations