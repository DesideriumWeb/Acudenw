import React  from 'react';
import ImgServiceProvider from "../../assets/images/Authentication/service-provider.svg"
import BackArrow from '../../components/BackArrow/BackArrow';
import FormTitle from "../../components/Form/FormTitle";
import LinkOption from "../../components/LinkOptions";
import RedirectButton from '../../components/RedirectButtons';
import {PORTAL_ROUTES, STRINGS} from "../../config/config";
import GovHeader from "../../components/Headers/GovHeader";
import { Link } from 'react-router-dom';


export function SelectRegisterType() {
        return (
            <>
                <GovHeader 
                    title={STRINGS.GOV_HEADER_TXT}
                    description_left={STRINGS.GOV_HEADER_LEFT_TXT}
                    description_right={STRINGS.GOV_HEADER_RIGHT_TXT} />
                <BackArrow />               
                <div className="flex flex-col h-select-register w-full items-center px-4">
                    <div className="flex flex-col items-center w-full max-w-xl gap-3">                     
                        <div className="w-full flex flex-col">
                            <div className="flex justify-center my-0 md:my-2">
                                <FormTitle secondTitle={"Registro Único de Centros"} subTitle={""} registration={true} />
                            </div>
                            <div className="w-full flex flex-col text-center justify-center my-0 md:my-2">
                                <p className="text-black text-sm justify-center">
                                    Solamente pueden registrarse los Centros del Cuidado de la Niñez.
                                    Una vez creada la cuenta del Centro, podrá invitar a los integrantes de su equipo de trabajo para unirse a <b>ACUDEN Quality System</b>.
                                </p>                
                             </div>
                             <LinkOption url={PORTAL_ROUTES.PROVIDER_REGISTER_ROUTE} img={ImgServiceProvider}
                                        title={"Centro del Cuidado de la Niñez"}
                                        subTitle={"Entidad clasificada bajo Centro de Cuido, Red de Cuido, Proveedor Familiar, Head Start, Early Head Start, Intervención Temprana o Distrito Escolar"}
                             />
                             <div>
                                <Link to={PORTAL_ROUTES.PROVIDER_REGISTER_ROUTE}> 
                                    <button 
                                        className="form-btn hover:bg-[#A7D02A] hover:text-[#092C4C] hover:border-[#A7D02A] hover:shadow-md transition-all"
                                        type="button"
                                        route={PORTAL_ROUTES.PROVIDER_REGISTER_ROUTE}> 
                                        <p>Crear cuenta</p>
                                    </button>
                                </Link>
                             </div>
                            <div className="text-center text-sm my-4">
                                ¿Ya tienes una cuenta?{" "}
                                <Link
                                    to={PORTAL_ROUTES.LOGIN_ROUTE}
                                    className="text-darkblue text-sm font-semibold"
                                >
                                Iniciar sesión
                                </Link>
                            </div>
                        </div>
                        <div className="w-full md:w-3/12">
                        </div>
                    </div>
                </div>
            </>

        );
} 