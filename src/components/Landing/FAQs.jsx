/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import FAQItem from "./FAQItem";
/**
 * The FAQs component displays frequently asked questions and their answers.
 * It contains a list of FAQ items that are displayed in two columns.
 */
const FAQs = () => {
    return(
        <div className="pt-10 px-4 min-h-[709px] flex bg-no-repeat bg-top bg-auto border border-white bg-[#EEF2F6] bg-[url('assets/images/BackgroumFaqs.svg')] mt-20" style={{backgroundColor: '#EEF2F6'}}>
            <div className="container mx-auto mb-8">
                <div className="text-center md:text-left mt-8 mb-16">
                    <h3 className="text-4xl font-bold text-[#092C4C] mt-20">Preguntas Frecuentes</h3>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-4 md:mx-0">
                    <div className="md:w-1/2 space-y-4">
       
                        <FAQItem question="¿Cómo puedo registrarme si soy empleado de un proveedor de servicios?" answer="Los proveedores de servicios invitan a sus empleados a través de sus correos electrónicos.
                                Los empleados recibirán un correo electrónico con un enlace para comenzar su proceso de registro a la plataforma."/>

                        <FAQItem question="¿Cómo se clasifican los proveedores de servicios?" answer="Los proveedores de servicios se clasifican en Centro de cuido, Red de cuido, Proveedor familiar,
                                       Head Start, Early Head Start, Intervención temprana y Distrito escolar."/>

                        <FAQItem question="¿Cuándo los proveedores de servicio tendrán acceso a la plataforma una vez llenen el formulario de registro?" answer="Una vez completado el formulario de registro, el proveedor de servicios debe esperar a que la información provista
                                        sea corroborada y validada por ACUDEN. Una vez validada, recibirá una notificación de validación o negación a través
                                        del correo electrónico. De ser aceptado, encontrará un enlace para iniciar sesión y disfrutar de los servicios de la plataforma."/>

                        <FAQItem question="¿Las certificaciones que se otorgan en la plataforma a los empleados de proveedores de servicio se pueden descargar?" answer="Sí. Las certificaciones otorgadas en la plataforma pueden ser descargadas. Puede encontrar su certificaciones en su perfil,
                                        en la sección de certificaciones e insignias."/>

                    </div>
                    <div className="md:w-1/2 space-y-4">

                        <FAQItem question="¿Puedo registrarme aunque no tenga dependientes?" answer="Sí. Toda la comunidad en general puede registrarse en la plataforma y beneficiarse de los servicios que ofrece la misma."/>

                        <FAQItem question="¿Puedo registrar a mis dependientes en un centro a través de esta plataforma?" answer="No. La plataforma no ofrece la opción de matricular a sus dependientes en un centro. En el directorio de proveedores puede
                                        filtrar según la localización y la categoría del proveedor al igual que guardar sus proveedores de servicio favoritos.
                                        Además, puede visitar sus perfiles para ver su información de contacto, información general, empleados y fotos."/>

                        <FAQItem question="¿Para acceder al directorio de proveedores, la biblioteca y el calendario debo tener una cuenta?" answer="Sí. Para poder ver los perfiles de los proveedores de servicios, ver y descargar documentos y registrarse en un evento debe estar registrado(a)."/>

                        <FAQItem question="¿Si un empleado renuncia a su puesto o el centro cesa sus operaciones puede el empleado seguir accediendo a su cuenta aunque ya no esté enlazada a ningún proveedor de servicio?" answer="Sí. Una vez el empleado es desvinculado por el proveedor de servicios, o el centro elimina su cuenta, este aún puede acceder y
                                        encontrar toda su información incluyendo cursos en progreso y sus certificaciones e insignias. Aunque su cuenta permanezca activa,
                                        su perfil no será visible a la comunidad hasta ser invitado por otro proveedor de servicios. Al recibir la invitación solo debe
                                        aceptar o denegar la invitación. De aceptarla, solo debe iniciar sesión sin la necesidad de registrarse nuevamente."/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQs