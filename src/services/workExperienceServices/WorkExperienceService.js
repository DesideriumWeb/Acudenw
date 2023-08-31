import {AddWorkExperienceServicePath, axiosInstance, EducationServicePath, UserWorkExperienceService} from "../ApiRest";
import {GeneralService} from "../generalService/GeneralService";
import {HTTP} from "../../config/config";
import {buildImageMultipart} from "../../components/utils";
/**
 * Service class for managing work experience.
 */
export class WorkExperienceService{
    /**
     * Add a work experience with the provided form data.
     *
     * @param {Object} form - The form data for the work experience.
     * @returns {Object} - The response data containing the added work experience information.
     */
    async addWorkExperience(form) {
        try {

            const { data: processData, status: processStatus } = await axiosInstance.post(AddWorkExperienceServicePath, form);

            if(processData.httpCode === HTTP.CREATED)
            {
                return { processData, processStatus };
            }
            else
            {
                return {processData:null, processStatus: HTTP.INTERNAL_ERROR}
            }
        } catch (error) {
            console.log("Error in addWorkExperience:", error);
            return { processData: null, processStatus: HTTP.INTERNAL_ERROR};
        }
    }
    /**
     * Uploads a work experience file to a relation.
     *
     * @deprecated This method is deprecated and will be removed in future versions. Work Experience not required document or file.
     *
     * @param {File} file - The work experience file to upload.
     * @param {string} workExperienceId - The ID of the work experience.
     * @returns {Promise<{data: any, status: number}>} - The response data and status.
     */
    async addWorkExperienceFile(workExperienceId, file){
        try {

            const form = buildImageMultipart(file);

            const {data, status} = await axiosInstance.put(`${AddWorkExperienceServicePath}/${workExperienceId}/file`, form);

            return {data, status};

        }catch (error){
            console.log(`Upload work experience file to relation: ${error}`);
            return {data: null, status: HTTP.INTERNAL_ERROR}
        }
    }
    /**
     * Deletes a work experience record with the specified workExperienceId.
     *
     * @param {number} workExperienceId - The ID of the work experience to be deleted.
     * @returns {Promise} A promise that resolves to the result of the delete operation.
     */
    static async deleteWorkExperience(workExperienceId){
        try{

            const {data, status} = await axiosInstance.delete(`${UserWorkExperienceService}${workExperienceId}`);

            return {data, status};

        }catch (error){
            console.log(`Delete work experience: ${error}`);
            return {data: null, status: HTTP.INTERNAL_ERROR}
        }
    }
}