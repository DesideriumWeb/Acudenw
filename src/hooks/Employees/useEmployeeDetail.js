/*
* This software is the confidential and proprietary information of INPRENDE LLC.
* You shall not disclose such confidential information and shall use it only
* in accordance with the terms of the license agreement you entered into with
    * INPRENDE LLC.
*/
import {useEffect, useState} from "react";
import ProviderService from "../../services/cmsServices/ProviderService";
import {HTTP} from "../../config/config";
import EmployeeService from "../../services/userServices/EmployeeService";
import imageLandscape from "../../assets/images/defaultBannerAcudenFam2.png";
import userSolid from "../../assets/images/icons/user-solid.svg";
/**
 * Custom hook to fetch and manage provider employees details.
 * @param {number} employeeId - Employee ID
 * @returns {Array} - An array containing the employee data.
 */
export default function useEmployeesDetail(employeeId){

    const [id, setId] = useState('');
    const [birthDate, setBirthDate] = useState(new Date().toISOString());
    const [certification, setCertification] = useState([]);
    const [educationDegrees, setEducationDegrees] = useState([]);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [phoneNumberExtension, setPhoneNumberExtension] = useState('');
    const [description, setDescription] = useState('');
    const [workExperiences, setWorkExperiences] = useState('');
    const [bannerImage, setBannerImage] = useState('')
    const [logoImage, setLogoImage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const getEmployeeDetails = async () => {

            try{
                const {data, status} = await ProviderService.getEmployeeDetail(employeeId)

                if(status === HTTP.OK){

                    setId(employeeId);
                    setBirthDate(data.data?.birthDate || '');
                    setCertification(data.data?.certification || []);
                    setEducationDegrees(data.data?.educationDegrees || []);
                    setEmail(data.data?.email || '');
                    setFirstname(data.data?.firstname || '');
                    setLastname(data.data?.lastname || '');
                    setFullname(data.data?.fullname || '');
                    setGender(data.data?.gender || '');
                    setOccupation(data.data?.occupation || '');
                    setPhoneNumberExtension(data.data?.phoneNumberExtension || '');
                    setDescription(data.data?.description || '');
                    setWorkExperiences(data.data?.workExperiences || '');

                    const logoResult = await new EmployeeService().getEmployeeProfilePictureById(employeeId)
                    const bannerResult = await new EmployeeService().getEmployeeProfileBannerById(employeeId)

                    console.log(logoResult, bannerResult)

                    if (bannerResult) {
                        setBannerImage(bannerResult);
                    } else {
                        setBannerImage(imageLandscape)
                    }

                    if (logoResult) {
                        setLogoImage(logoResult);
                    } else {
                        setLogoImage(userSolid)
                    }
                }
            }
            catch (error) {
                console.log(`Provider get employee details error: ${error}`)
                setLogoImage(userSolid)
                setBannerImage(imageLandscape)
            }finally {
                setLoading(false)
            }
        }

        getEmployeeDetails();

    }, [id]);

    return {
        id,
        description,
        birthDate,
        certification,
        educationDegrees,
        email,
        firstname,
        lastname,
        fullname,
        gender,
        occupation,
        workExperiences,
        phoneNumberExtension,
        bannerImage,
        logoImage,
        loading
    };
}