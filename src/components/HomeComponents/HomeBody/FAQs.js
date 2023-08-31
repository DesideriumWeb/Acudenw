import React, { Component } from 'react';
import stylesFAQs from "css/HomeComponents/HomeBody/FAQs.module.css"
import { Panel } from 'primereact/panel';

export class FAQs extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={stylesFAQs.FAQs} >
                    <div className="container">
                        <div className="row">
                            <div className={stylesFAQs.FaqTitleH3}>
                                <h3 className={stylesFAQs.FaqH3}>Preguntas Frecuentes</h3>
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Panel className={stylesFAQs.PComponent} header="¿Cómo puedo registrarme si soy empleado de un proveedor de servicios?" toggleable>
                                    <p>Los proveedores de servicios invitan a sus empleados a través de sus correos electrónicos. 
                                       Los empleados recibirán un correo electrónico con un enlace para comenzar su proceso de registro a la plataforma.</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Cómo se clasifican los proveedores de servicios?" toggleable>
                                    <p>Los proveedores de servicios se clasifican en Centro de cuido, Red de cuido, Proveedor familiar, 
                                       Head Start, Early Head Start, Intervención temprana y Distrito escolar.</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Cuándo los proveedores de servicio tendrán acceso a la plataforma una vez llenen el formulario de registro?" toggleable>
                                    <p>Una vez completado el formulario de registro, el proveedor de servicios debe esperar a que la información provista 
                                        sea corroborada y validada por ACUDEN. Una vez validada, recibirá una notificación de validación o negación a través  
                                        del correo electrónico. De ser aceptado, encontrará un enlace para iniciar sesión y disfrutar de los servicios de la plataforma.</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Las certificaciones que se otorgan en la plataforma a los empleados de proveedores de servicio se pueden descargar?" toggleable>
                                    <p>Sí. Las certificaciones otorgadas en la plataforma pueden ser descargadas. Puede encontrar su certificaciones en su perfil, 
                                        en la sección de certificaciones e insignias.</p>
                                </Panel>
                            </div>
                            <div className="col-md-6">
                                <Panel className={stylesFAQs.PComponent} header="¿Puedo registrarme aunque no tenga dependientes?" toggleable>
                                    <p>Sí. Toda la comunidad en general puede registrarse en la plataforma y beneficiarse de los servicios que ofrece la misma.</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Puedo registrar a mis dependientes en un centro a través de esta plataforma?" toggleable>
                                    <p>No. La plataforma no ofrece la opción de matricular a sus dependientes en un centro. En el directorio de proveedores puede 
                                        filtrar según la localización y la categoría del proveedor al igual que guardar sus proveedores de servicio favoritos. 
                                        Además, puede visitar sus perfiles para ver su información de contacto, información general, empleados y fotos.</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Para acceder al directorio de proveedores, la biblioteca y el calendario debo tener una cuenta?" toggleable>
                                    <p>Sí. Para poder ver los perfiles de los proveedores de servicios, ver y descargar documentos y registrarse en un evento debe estar registrado(a).</p>
                                </Panel>
                                <Panel className={stylesFAQs.PComponent} header="¿Si un empleado renuncia a su puesto o el centro cesa sus operaciones puede el empleado seguir accediendo a su cuenta aunque ya no esté enlazada a ningún proveedor de servicio?" toggleable>
                                    <p>Sí. Una vez el empleado es desvinculado por el proveedor de servicios, o el centro elimina su cuenta, este aún puede acceder y 
                                        encontrar toda su información incluyendo cursos en progreso y sus certificaciones e insignias. Aunque su cuenta permanezca activa, 
                                        su perfil no será visible a la comunidad hasta ser invitado por otro proveedor de servicios. Al recibir la invitación solo debe 
                                        aceptar o denegar la invitación. De aceptarla, solo debe iniciar sesión sin la necesidad de registrarse nuevamente.</p>
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}