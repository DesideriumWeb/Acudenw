/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import TutorialBasicCard from "../views/Tutorial/TutorialBasicCard";
import guiaAccesa from "../assets/documents/GuiaProgramaACCESA.pdf";
import listaDocumentos from "../assets/documents/Documentos_Requeridos_ACCESA.pdf";
import certificadosEmpleado from "../assets/documents/CertificacionEmpleoACCESA.pdf";
import certificadosAsistencia from "../assets/documents/CertificacionAsistenciaEconomica ACCESA.pdf";
import forma_SC730 from "../assets/documents/MODELO_SC_730.pdf";
import guiaCentrosDelFuturo from "../assets/documents/Guia_Centros_del_Futuro.pdf";
import definicionTerminos from "../assets/documents/Definicion_de_Terminos_Operacionales_Centros_del_Futuro.pdf";
import puntuacionInstrumentoMedicionCentros from "../assets/documents/Resultados_Centros_del_Futuro.pdf";
import ImgVideoTutorials1 from "../assets/images/ACCESA.jpg";
import ImgVideoTutorials2 from "../assets/images/ACUDENAcademy.jpg";
import ImgVideoTutorials3 from "../assets/images/Biblioteca.jpg";
import ImgVideoTutorials4 from "../assets/images/CDFHElpCenter.jpg";
import ImgVideoTutorials5 from "../assets/images/Directorio.jpg";
import NEONATO from "../assets/images/NEONATO.png";
import FUTURISTA from "../assets/images/FUTURISTA.png";
import INFANTE from "../assets/images/INFANTE.png";
import ANDARIN from "../assets/images/ANDARIN.png";
import PREESCOLAR from "../assets/images/PREESCOLAR.png";
import ESCOLAR from "../assets/images/ESCOLAR.png";
import PROFESIONAL from "../assets/images/PROFESIONAL.png";
/**
 * Configuración general de la aplicación.
 */
export const CONFIG = {
  // Sesión
  SESSION_TIME: 7200000, // 2 horas
  SESSION_EXPIRE: "expire",
  USER_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_EMAIL: "userEmail",
  LMS_SESSION: "lmsSession",
  USER_ROLE: "userRole",
  TOWNS: "towns",
  PROVIDER_CATEGORIES: "providerCategories",
  EMPLOYEE_PROFILE: "employeeProfile",
  PROVIDER_PROFILE: "providerProfile",
  LOGO_IMAGE: "logoImage",

  //ENV
  PRD: false,
  SP: true,
  USE_DEV_DATA_INJECTION: false,
  USE_INDEXED_DB: true,
  DB_NAME: "Acuden",
  DB_STORE_NAME: "MyLibrary",
  DB_VERSION: 1,

  //Paginator
  PAGINATOR_MAX_VISIBLE_PAGES: 5,

  //Image Gallery
  IMAGE_GALLERY_IMAGES_PER_PAGE: 8,

  //Employee Profile Configs
  WORK_EXP_EDUCATION_MAX_PER_PAGE: 4,
};

/**
 * Códigos de estado HTTP utilizados en las respuestas del servidor.
 */
export const HTTP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  DELETED: 204,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
};

/**
 * Cadena de textos utilizados en la aplicación.
 */
export const STRINGS = {
  //Default Empty
  DEFAULT_ON_EMPTY: "No disponible.",
  GENERAL_CONGRATS: "¡Felicidades!",
  // Textos
  GOV_HEADER_TXT: "Portal Oficial del Gobierno de Puerto Rico",
  GOV_HEADER_LEFT_TXT: (
    <p>
      <strong> Un sitio web oficial .pr.gov</strong> pertenece a una
      organización oficial del Gobierno de Puerto Rico
    </p>
  ),
  GOV_HEADER_RIGHT_TXT: (
    <p>
      Los sitios web seguros .pr.gov usan HTTPS, lo que significa que usted se
      conectó de forma segura a un sitio web
    </p>
  ),
  ACUDEN_DOMAIN: "acudenacademy.com",

  LANDING_TOOLS_TITLE: "¡Eleva tus servicios con nuestras herramientas!",
  TOOL_ONE_DESCRIPTION:
    "Visibiliza tu perfil como Centro del Futuro y la puntuación de calidad que te ha otorgado ACUDEN.",
  TOOL_TWO_DESCRIPTION:
    "Crea una cuenta para tu Centro y solicita para ser evaluado y recibir la acreditación.",
  TOOL_THREE_DESCRIPTION:
    "Invita a tu equipo de trabajo a unirse y educarse en ACUDEN Academy, registrarse en talleres y solicitar becas a través de ACCESA.",
  TOOL_FOUR_DESCRIPTION:
    "Accede manuales, folletos, y recursos educativos en temas del cuidado de la niñez temprana.",
  TOOL_FIVE_DESCRIPTION:
    "En esta sección puedes enterarte de las iniciativas y proyectos de ACUDEN.",

  // Mensajes
  LANDING_TITLE_01:
    "Elevando el desarrollo integral de la niñez temprana en Puerto Rico",
  LANDING_TITLE_02:
    "ACUDEN Quality System integra cursos, talleres, herramientas y certificaciones para elevar el nivel de calidad de los servicios de la niñez temprana en Puerto Rico.",
  LOGIN_ADMIN_FAIL:
    "Lo sentimos, su usuario no cuenta con las credenciales necesarias para acceder al sistema. Gracias!",
  INVALID_LOGIN:
    "Correo electrónico o contraseña inválida. Inténtalo de nuevo.",
  GENERIC_ERROR: "Lo sentimos, se ha producido un error. Trate nuevamente.",
  GENERIC_PROVIDER_ERROR:
    "Lo sentimos, se ha producido un error. Proveedor inválido. Trate nuevamente.",
  GENERIC_PROVIDER_CDF2_ERROR:
    "Lo sentimos, se ha producido un error. Proveedor, solicitud o información inválida. Trate nuevamente.",
  ERROR_MY_REQUEST:
    "Lo sentimos, no se encontró ningún contenido disponible en las solicitudes. Por favor, inténtalo de nuevo.",
  LIBRARY_STORE_ERROR:
    "Se ha producido un error al almacenar el recurso en su biblioteca.",
  EDUCATION_DEGREE_DELETE_OK: "El grado educativo ha sido eliminado.",
  WORK_EXPERIENCE_DELETE_OK: "La experiencia de trabajo ha sido eliminada.",
  GENERAL_MAX_FILE_SIZE_FAIL: "El archivo excede el límite de tamaño de 2MB",
  EDUCATION_DEGREE_DELETE_CONFLICT:
    "El grado educativo no ha podido ser eliminado.",
  WORK_EXPERIENCE_CONFLICT:
    "La experiencia de trabajo no ha podido ser eliminada.",
  GENERAL_UPDATED_INFO_OK: "La información ha sido actualizada.",
  GENERAL_UPDATED_INFO_FAIL:
    "La información no ha podido ser sido actualizada.",
  GENERAL_REMOVE_IMG_MSG: "¿Está seguro que desea eliminar la imagen?",
  FORGOT_PASSWORD_REQUEST_FAIL:
    "No hemos podido completar su solicitud, trate nuevamente.",
  FORGOT_PASSWORD_LINK_REQUEST: "El enlace ha sido enviado nuevamente.",

  ACUDEN_DOCUMENTS_VIEWER_ERROR:
    "El recurso no está disponible en este momento.",
  ACUDEN_DOCUMENTS_VIEWER_ONCLICK:
    "El navegador no admite la visualización de este documento. Puedes descargarlo haciendo clic ",

  PROVIDER_SERVICE_DESCRIPTION_ERROR:
    "La descripción del Servicio es requerida.",
  PROVIDER_ABOUT_US_DESCRIPTION_ERROR:
    "La descripción Sobre Nosotros es requerida.",
  PROVIDER_GENERIC_DESCRIPTION_FAIL:
    "Lo sentimos, la información no pudo ser actualizada en este momento. Trate nuevamente.",

  //Tutorials
  EMPLOYEE_TUTORIAL_ST1_TITLE: "¡Bienvenido(a) a ACUDEN QUALITY SYSTEM!",
  EMPLOYEE_TUTORIAL_ST1_MSG:
    "Este es tu dashboard. Aquí encontrarás atajos a herramientas que te ofrece la plataforma.",

  EMPLOYEE_TUTORIAL_ST2_TITLE: "Navega la plataforma.",
  EMPLOYEE_TUTORIAL_ST2_MSG:
    "Maneja el menú de navegación y accede a ACUDEN Academy, al calendario de eventos, directorio de proveedores, la biblioteca y las noticias de ACUDEN.",

  EMPLOYEE_TUTORIAL_ST3_TITLE: "Visita y completa tu perfil.",
  EMPLOYEE_TUTORIAL_ST3_MSG:
    "Ingresa tu formación educativa, experiencia laboral y certificaciones. Este perfil será visible a la comunidad a través del perfil de proveedores de servicios.",

  EMPLOYEE_TUTORIAL_ST4_TITLE: "Edúcate con los cursos de ACUDEN Academy.",
  EMPLOYEE_TUTORIAL_ST4_MSG:
    "Completa los cursos para desarrollarte profesionalmente y adquirir insignias, certificados y elevar la puntuación de calidad de la empresa en donde ejerces.",

  //CALENDAR TUTORIAL
  CALENDAR_TUTORIAL_ST1_TITLE: "¡Bienvenido(a) al Calendario de Eventos!",
  CALENDAR_TUTORIAL_ST1_MSG:
    "Aquí podrás acceder y registrarte en los talleres, capacitaciones y eventos de ACUDEN.",

  CALENDAR_TUTORIAL_ST2_TITLE: "Encuentra eventos.",
  CALENDAR_TUTORIAL_ST2_MSG:
    "Utiliza este filtro para encontrar los eventos que ocurrirán en los próximos meses.",

  CALENDAR_TUTORIAL_ST3_TITLE: "Aprende más sobre cada evento.",
  CALENDAR_TUTORIAL_ST3_MSG:
    "Accede a la descripción, la fecha, hora, modalidad y ubicación o enlace de todos los eventos. Regístrate para participar.",

  CALENDAR_TUTORIAL_ST4_TITLE: "Mis eventos",
  CALENDAR_TUTORIAL_ST4_MSG:
    "En esta carpeta encontrarás los eventos en los que te has registrado.",

  //GENERAL
  GENERAL_TUTORIAL_ST5_TITLE: "¡Disfruta de la plataforma!",
  GENERAL_TUTORIAL_ST5_MSG:
    "Presiona este icono cuando necesites reiniciar el tutorial.",

  //AQUI
  PROVIDER_TUTORIAL_ST3_TITLE: "Visita y completa tu perfil.",
  PROVIDER_TUTORIAL_ST3_MSG:
    "Este perfil será visible a la comunidad por medio del Directorio de Proveedores de ACUDEN Academy.",

  PROVIDER_TUTORIAL_ST4_TITLE: "Eleva tu puntuación de calidad.",
  PROVIDER_TUTORIAL_ST4_MSG:
    "La calidad de tu organización dependerá del desempeño de tu equipo de trabajo en los cursos e instrumentos de mediación de ACUDEN.",

  PROVIDER_TUTORIAL_ST5_TITLE: "Invita tus empleados.",
  PROVIDER_TUTORIAL_ST5_MSG:
    "Invítalos para que se creen una cuenta, completen su perfil y tomen los cursos de ACUDEN Academy para subir la puntuación de calidad de tu organización.",

  //LANDING
  PROVIDER_LANDING_INFO:
    "Entidad clasificada bajo Centro de Cuido, Red de Cuido, Proveedor Familiar, Head Start, Early Head Start, Intervención Temprana o Distrito Escolar que busca desarrollar profesionalmente a su equipo de trabajo y alzar la calidad de servicio de su empresa.",
  EMPLOYEE_LANDING_INFO:
    "Empleado de un Proveedor de Servicio que busca educarse y desarrollarse en normas de desempeño, protocolos y metodologías educativas que garantizan la más alta calidad en los servicios.",

  //MIS SOLICITUDES ACCESA
  MY_REQUEST_GENERIC: "Mis solicitudes",
  MY_REQUEST: "Mis solicitudes de ACCESA",
  MY_REQUEST_CDF: "Mi solicitud para la Acreditación Centros del Futuro",
  NUMBER_REQUEST: "Número de Solicitud",
  DATE_REQUEST: "Fecha de Solicitud",
  STATE_REQUEST: "Estado",
  BUTTON_SEE_REQUEST_T: "Ver solicitud",
  THERE_ARE_NO_PENDING_REQUESTS: "No hay solicitudes pendientes",
  MASK_NUMBER_REQUEST: "#ACCESA",
  MASK_NUMBER_REQUEST_CDF: "#CDF",
  BUTTON_BACK_ACCESA_REQUEST: "Volver a Mis Solicitudes de ACCESA",
  MASK_NUMBER_REQUEST_DETAILS: "Solicitud ",
  TITLE_DATA_MY_REQUEST_EMPLOYEE: "Datos Solicitante",
  TITLE_DATA_My_REQUEST_SUPPLIER: "Datos Proveedor",
  TITLE_DATA_My_REQUEST_ACADEMIC: "Datos Academicos",
  TITLE_DATA_My_REQUEST_DOCUMENTS_REQUIRED: "Documentos requeridos",

  //MODAL MIS SOLICITUDES
  TITLE_REQUEST_FOR_PROOF_REGISTRATION: "Solicitud de evidencia de",
  CDF_EVALUATION_TITLE: "Someter Evaluación de Ejes Temáticos",
  CDF_EVALUATION_SUBTITLE: "Certificación de Respuestas",
  CDF_NEW_BADGE: "Nueva insignia",
  CDF_EVALUATION_NAME_LABEL:
    "Nombre de la persona que contesta los cuestionarios de los Ejes Temáticos",
  CDF_EVALUATION_JOB_LABEL:
    "Puesto de la persona que contesta los cuestionarios de los Ejes Temáticos",
  CDF_EVALUATION_CERT_AGREE:
    "Certifico que he contestado la evaluación según la veracidad de los datos, conocimientos y documentos que tengo ante mi atención.",
  CDF_EVALUATION_OPEN_QUESTIONNAIRE: "Abrir cuestionario",
  CDF_EVALUATION_SUBMIT: "Someter evaluación",
  CDF_EVALUATION_SUBMIT_ERROR_P1:
    "Lo sentimos, sus cuestionarios no han sido completados en su totalidad. Su puntuación es de: ",
  CDF_EVALUATION_SUBMIT_ERROR_P2: " puntos, de un total de: ",
  CDF_EVALUATION_SUBMIT_ERROR_P3: " puntos. Aún le resta un ",
  CDF_EVALUATION_SUBMIT_ERROR_P4: "% por completar.",
  CDF_EVALUATION_SUBMIT_ERROR:
    "Lo sentinos, no hemos podido someter su evaluación. Trate nuevamente!",
  CDF_EVALUATION_SUBMIT_SUCCESS:
    "Su evaluación ha sido sometida exitosamente. Gracias!",
  CDF_GENERIC_SUBMIT_LOG_SUCCESS: "Se ha registrado su evento. Gracias!",
  CDF_GENERIC_SUBMIT_LOG_FAIL:
    "Lo sentimos, no hemos podido registrar su evento.",
  CDF_QUESTIONNAIRE_UNAVAILABLE: "¡No hay cuestionarios disponible!",
  CDF_CERTIFICATION_SCORE: "Certificado de Puntuación del Centro",
  CDF_SUBMIT_EVALUATION_LOG_DESCRIPTION:
    "Ha sometido los cuestionarios de los ejes temáticas y solicita evaluación.",
  CDF_GENERIC_INSTRUCTION:
    'Contestar en su totalidad todos los reactivos dentro de la evaluación de cada Eje Temático. Al responder "sí", significará que esta es una actividad, práctico o tarea que se realiza actualmente en el Centro. Responder "no", significará que esta actividad, práctica o tarea, en este momento, "no" se realiza en el Centro. Las contestaciones serán luego evaluadas y certificadas por su mentor/mentora para luego asignarle a su Centro una Puntuación de Calidad.',
  INSTRUCTION: "Instrucción",
  TITLE_REQUEST_FOR_PROOF_REGISTRATION_P:
    "Favor de adjuntar documentos que evidencien su matrícula a la institución asociada a la Solicitud",
  WRITE_COMMENT: "Escriba comentario",
  BUTTON_ANSWER_AMENDMENT: "Contestar enmienda",

  //ACCESA ERRORS FIELDS
  THE_FIELD_IS_REQUIRED: "El campo es obligatorio",
  SPECIAL_CHARACTERS_ARE_NOT_ALLOWED: `No se permiten caracteres especiales`,
  INVALID_NUMBER: `Número inválido`,
  INVALID_DATE: `Fecha inválida`,
  INVALID_EMAIL: "Correo electrónico inválido.",
  QUANTITY_MUST_BE_POSITIVE: "La cantidad debe ser positiva",
  INVALID_COST_ACADEMIC: `Costo de matrícula inválido.`,
  CONTACT_ADMIN: "Contacte al administrador",
  FILL_OUT_FORMS: "Completa todos los campos",
  SELECT_DOCUMENT: "Seleccione un documento",
  REQUEST_SUCCESSFUL: "Se ha guardado correctamente su documento",
  FIELD_INVALID:
    "Por favor, verifica el formulario de registro. Algunos datos están incompletos.",
  PERIOD_INVALID: "No hay periodos disponibles para tu solicitud",

  // VARIABLES LOCAL STORAGE
  FORM_CENTER_FUTURE_REQUEST_BASIC: "formCenterFutureRequestBasic",

  //ACCESA BUTTON
  BUTTON_SEE_REQUEST: "Ver mis solicitudes",
  BUTTON_START_REQUEST: "Comenzar solicitud",
  BUTTON_START_REQUEST_FORM_EMPLOYEE: "Comenzar",
  BUTTON_BACK: "Volver",
  BUTTON_CONTINUE: "Continuar",
  BUTTON_CONTINUE_ACCEPT: " Aceptar y Continuar",
  BUTTON_GO_DASHBOARD: "Ir a dashboard",
  BUTTON_EXIT: "Salir",
  BUTTON_VOLVER_ACCESA: "Volver a Accesa",
  BUTTON_VOLVER_CENTROS_FUTURO: "Volver a Centros del futuro",

  BUTTON_VOLVER_CDF: "Volver a Centro del Futuro",

  // ACCESA FORM EMPLOYEE
  ACCESA_TITLE_REQUIRED_FIELDS: "Todos los campos son requeridos",
  ACCESA_TITLE_REQUIRED_DOCUMENTS_MSG_ERROR:"Adjunte todos los archivos",
  ACCESA_FIELDS_NAME: "Nombre*",
  ACCESA_FIELDS_LASTNAME: "Apellidos*",
  ACCESA_FIELDS_NUMBER_SOCIAL_SECURITY: "Número de Seguro Social*",
  ACCESA_FIELDS_NUMBER_PHONE: "Número de teléfono*",
  ACCESA_FIELDS_EMAIL: "Correo electrónico*",
  ACCESA_FIELDS_CODE_ZIP: "Codigo postal*",
  ACCESA_FIELDS_POSTAL_ADDRESS: "Dirección postal*",
  ACCESA_FIELDS_PHYSICAL_ADDRESS: "Dirección física*",
  ACCESA_FIELDS_CITY: "Municipio*",
  ACCESA_FIELDS_GENDER: "Género*",
  ACCESA_FIELDS_OCUPATION: "Ocupación*",
  ACCESA_FIELDS_HASCDA: "Posee credencial Child Development Associate (CDA)*",
  ACCESA_FIELDS_SELECT_OPTION: "Selecciona una opción",
  ACCESA_FIELDS_MALE: "Masculino",
  ACCESA_FIELDS_FAMALE: "Femenino",
  // Form Supplier

  ALL_FIELDS_ARE_REQUIRED: "Todos los campos son requeridos",

  EMPLOYEE_QUESTION_2: "Nombre del Proveedor*",
  SUPPLIER_QUESTION_3:
    "Municipio donde se ubican las instalaciones del proveedor (centro de cuidado u hogar licenciado) en el que usted trabaja.",
  SUPPLIER_QUESTION_4: "Tipo de facilidad del Proveedor*",
  SUPPLIER_QUESTION_5: "Tipo de Entidad*",
  SUPPLIER_QUESTION_6:
    "Estatus de apertura del centro de cuido u hogar licenciado*",
  SUPPLIER_QUESTION_7:
    "¿Cuándo comenzó a trabajar con el proveedor de cuidado infantil? (Ej. Enero-2020)*",
  SUPPLIER_QUESTION_8:
    "Jornada Laboral Semanal* Cantidad de horas que usted trabaja a la semana . (Ej. 40)",

  //FORM DATA ACADEMIC
  ACCESA_FIELDS_NAME_EDUCATIONAL_INSTITUTION:
    "Nombre de la Instutición Educativa*",
  ACCESA_FIELDS_NAME_EDUCATIONAL_INSTITUTION_P: `Escriba el nombre de la institución de educación superior en
  la que está o estará estudiando.`,
  ACCESA_FIELD_ACADEMIC_GRADE: "Grado académico*",
  ACCESA_FIELDS_COURSE_NAME: "Área o programa de estudio*",
  ACCESA_FIELDS_COURSE_NAME_P: `Escriba el área o programa de estudio (Ej: Educación
    Prescolar)`,
  ACCESA_FIELDS_ACADEMIC_PERIOD: "Tipo de periodo académico*",
  ACCESA_FIELDS_ACADEMIC_START_DATE:
    "Fecha de comienzo del semestre/trimestre*",
  ACCESA_FIELDS_ACADEMIC_END_DATE:
    "Fecha de culminación del semestre/trimestre*",
  ACCESA_FIELDS_ACADEMIC_PERIOD_COST: "Costo de matrícula*",
  ACCESA_FIELDS_ACADEMIC_PERIOD_COST_P: `Indique el costo de matrícula para el periodo académico para
  el cual está solicitando.`,
  ACCESA_FIELDS_HAS_ECONOMIC_AID: `¿Ha solicitado o recibido asistencia económica para este periodo
  académico?*`,
  ACCESA_FIELDS_HAS_STUDENT_LOAN: `¿Solicitó o recibió prestamo estudiantil para este periodo
  académico?*`,

  // ACCESA
  ACCESA_TITLE_LANDING_P:
    "Documentos para completar la solicitud del Programa ACCESA",
  ACCESA_TITLE_LANDING: `Programa ACUDEN Child Care Educational`,
  ACCESA_TITLE_LANDING_1: `Scholarship Award(ACCESA)`,

  ACCESA_TITLE_PROGRAM_CHILD: `La Administración para el Cuidado y Desarrollo Integral de la Niñez (ACUDEN), administra el Programa Child Care en Puerto Rico. A través
    de este programa se han recibido fondos del Child Care Stabilization
    Fund en virtud del American Rescue Plan Act (ARPA), dirigidos a
    proveer asistencia a los proveedores de cuidado infantil, para
    mitigar los efectos de la pandemia y para la estabilización de sus
    operaciones, a los fines de que puedan continuar brindando el
    servicio de cuidado infantil.`,

  ACCESA_TITLE_PROGRAM_CHILD_P2: `Conforme lo anterior, se crea el Programa de ACUDEN Child Care
    Educational Scholarship Award (ACCESA) para otorgar becas
    estudiantiles a los empleados de centros de cuido y hogares
    licenciados elegibles, incluyendo proveedores bajo red de cuido, que
    se encuentran estudiando o comenzarán a estudiar algún grado
    dirigido a la niñez temprana.`,

  ACCESA_TITLE_PROGRAM_CHILD_P3: `Las Guías para la Solicitud del Programa ACCESA ofrecen detalles de
    los procesos que deberá realizar el empleado elegible para recibir
    los fondos bajo este programa.`,
  ACCESA_TITLE_PROGRAM_CHILD_P_File: `Instrucciones para completar la solicitud`,
  ACCESA_TITLE_PROGRAM_CHILD_P1_File: `Antes de someter esta solicitud asegúrese de adjuntar TODOS los
          documentos requeridos en la Guía del Programa ACCESA.<br/> <br/>
          Esta solicitud debe ser completada una sola vez. Usted sabrá que su
  solicitud fue debidamente sometida y recibida si, luego de presionar
  el botón de "Someter", le aparece un mensaje indicándole que su
  solicitud fue sometida exitosamente.<br/> <br/>
  De confrontar problemas al subir los documentos, puede comunicarse con
  nuestro equipo de asistencia a través de Contácto.
  <br/> <br/> NOTA: Solamente se comenzarán a evaluar las solicitudes que hayan sido
  sometidas con todos los documentos requeridos. El haber sometido una
  solicitud no le garantiza que la ACUDEN le vaya a conceder la ayuda.`,

  // Centros del futuro
  CENTER_FUTURE_TITLE_LANDING: `Acreditación Centros del Futuro`,
  CENTER_FUTURE_ACCREDITATION: `Centros del Futuro es una aspiración multisectorial para que los niños/as 
  se desarrollen en ambientes que propicien su pleno y óptimo desarrollo. Para promover que dichos ambientes
   estén a la altura de las aspiraciones que tenemos para ellos, la Administración para el Cuidado y Desarrollo
    Integral de la Niñez (ACUDEN), ha desarrollado un instrumento para la medición de la calidad de los servicios 
    que los niños/as reciben. Este ha sido denominado Instrumento de Medición de Calidad: Centros del Futuro.
     El propósito de este instrumento es definir mediante tres (3) ejes temáticos, una serie de criterios para identificar 
     la calidad de los servicios, operaciones y ambiente de los centros de cuidado y desarrollo de la niñez temprana en Puerto Rico.
  <br/> <br/>

Por medio del instrumento Centros del Futuro, se fomenta la autoevaluación y la reflexión del 
personal de los Centros para hacerlos más conscientes del nivel en que se encuentran respecto a los 
criterios de calidad. Esto permite realizar una proyección hacia el nivel de desarrollo al que se aspira y, 
en consecuencia, proveerles el insumo necesario para estructurar planes de desarrollo continuo. Los tres (3) ejes temáticos,
 están dirigidos a mejorar la calidad de los servicios que se proveen a la niñez temprana en los diferentes centros.`,

  CENTER_FUTURE_TITLE_DOCUMENT:
    "Documentos de acompañamiento para la solicitud Centros del Futuro.",
  SUPPLIER_QUESTION_1:
    "¿Trabaja actualmente con algún proveedor de centro de cuido u hogar licenciado?*",
  SUPPLIER_QUESTION_2:
    "Municipio donde ubica las facilidades del Proveedor (centro de cuido u hogar licenciado) en el que usted trabaja.*",

  // My request centros del futuro
  BUTTON_BACK_CENTERS_FUTURE_REQUEST:
    "Volver a mi solicitud Centros del Futuro",
  MASK_NUMBER_REQUEST_CENTERS_FUTURE: "#000",
  TITLE_CENTERS_FUTURE_DETAILS_REQUEST: "Centros del Futuro",
  TITLE_CENTERS_FUTURE_SINGULAR: "Centro del Futuro",
  BUTTON_SEE_PROFILE_CENTER: "Ver perfil de centro",
  TITLE_CENTERS_FUTURE_DETAILS_DATE: "Fecha de Solicitud: ",

  // Centros del futuro informacion basica
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_1: "Nombre del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_2:
    "Nombre de persona que dirige el Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_3: "Teléfono del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_4:
    "Municipio donde ubica el Centro*",
  CENTER_FUTURE_FIELDS_SELECT_OPTION: "Selecciona una opción",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_5: "Dirección Física del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_6: "Dirección Postal del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_7: "Correo electrónico del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_8:
    "Página web y/o redes sociales del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_9:
    "Horario de Trabajos Administrativos del Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_10:
    "Cantidad de salones que posee el Centro*",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_11:
    "Cantidad de niños/as en el Centro* (De la población/es a sermedida mediante este instrumento).",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_12:
    "De atender diferentes grupos de edades, indique la cantidad de niños/as en el Centro por categoría de edad.",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_12_P: "Infantes",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_13: "Maternales",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_14: "Preescolares",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_15: "Total",
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_16: `¿El Centro acepta niños/as con diversidad funcional?* Si el
Centro acepta niños/as con estas características dependiendo de
alguna condición, favor de especificar la misma.`,
  CENTER_FUTURE_BASIC_INFORMATION_QUESTION_17: "Especifique la condición*",
  CENTER_FUTURE_BASIC_INFORMATION_TYPE_STRING: `string`,
  CENTER_FUTURE_BASIC_INFORMATION_TYPE_INT: `int`,
  CENTER_FUTURE_BASIC_INFORMATION_NAME: `nombre`,
  CENTER_FUTURE_BASIC_INFORMATION_NAME_CENTER: `nombreDirigeCentro`,
  CENTER_FUTURE_BASIC_INFORMATION_PHYSICAL_ADDRESS: `direccionFisica`,
  CENTER_FUTURE_BASIC_INFORMATION_DIVERSITY: `diversidad`,
  CENTER_FUTURE_BASIC_INFORMATION_PHONE: `telefono`,
  CENTER_FUTURE_BASIC_INFORMATION_EMAIL: `correo`,
  CENTER_FUTURE_BASIC_INFORMATION_NUMBER_ROOMS: `cantidadSalones`,
  CENTER_FUTURE_BASIC_INFORMATION_NUMBER_CHILDREN: `cantidadNinos`,
  CENTER_FUTURE_BASIC_INFORMATION_INFANTS: `infantes`,
  CENTER_FUTURE_BASIC_INFORMATION_MATERNALS: `maternales`,
  CENTER_FUTURE_BASIC_INFORMATION_PRESCHOOLERS: `preescolares`,
  CENTER_FUTURE_BASIC_INFORMATION_TOTAL: `total`,

  // Centros del futuro informacion general
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_1: "Tipo de organización",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_2:
    "Si es administrada por Gobierno, identifique agencia o municipio que administrador*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_3: "Financiamiento del Centro*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_4: "Horario de servicios*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_5: "Días de servicio*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_6:
    "Indique la población/es de niños/as a ser medida mediante este instrumento*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_7: "El Centro cuenta con:*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8:
    "Acreditaciones/Licencias que posee el Centro*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8_SPECIFICATION:
    "Espeficicación de Acreditaciones/Licencias que posee el Centro*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9:
    "Relación del Centro con ACUDEN*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9_SPECIFICATION:
    "Especificación de relación del Centro con ACUDEN*",
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_10: `Maestros/as del Centro*  Más adelante, se le preguntará sobre los maestros en el Centro. 
    Esta sección tiene como propósito ayudarle a recopilar y organizar la información necesaria.`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_11: `Asistentes de maestros/as del Centro* Más adelante, se le preguntará 
  sobre los asistentes de maestros en el Centro. Esta sección tiene como propósito 
  ayudarle a recopilar y organizar la información necesaria.`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_12: `Más adelante, se le preguntará sobre la proporción entre niños/as y 
  personal del Centro. Responda esta pregunta basándose en la totalidad de niños/as y personal en el Centro.
  Según la Oficina de Licenciamiento:
  Para grupos de Infantes se establece un máximo de 4 niños/as por adulto.
  Para grupos de Maternales se establece un máximo de 4 niños/as por adulto.
  Para grupos de Preescolares se establece un máximo de 8 niños/as por adulto.`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_13: `Cantidad de niños/as Infantes* `,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_14: `Cantidad de niños/as Maternales*  `,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_15: `Cantidad de niños/as Preescolares*`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_16: `Cantidad total de niños/as* `,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_17: `Cantidad total de empleados*`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_18: `Acuerdos de colaboración*
  Más adelante, se le preguntará sobre los acuerdos de colaboración que tiene el Centro. Esta tabla tiene 
  como propósito ayudarle a recopilar y organizar la información necesaria.`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_19: `Cantidad de niños/as Infantes*`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_20: `Nombre del maestro/a`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_21: `Preparación académica`,
  CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_22: `Concentración/Especialidad
  (Ej: educación preescolar)`,
  CENTER_FUTURE_GENERAL_INFORMATION_MASTER: "maestro",
  CENTER_FUTURE_GENERAL_INFORMATION_ASSISTANT: "asistente",
  CENTER_FUTURE_GENERAL_INFORMATION_AGREEMENT: "acuerdo",
  CENTER_FUTURE_GENERAL_INFORMATION_OBJECT: "object",
  CENTER_FUTURE_GENERAL_INFORMATION_LOCAL_STORAGE:
    "formCenterFutureRequestGeneral",
  CENTER_FUTURE_GENERAL_INFORMATION_CITY: "agenciaOMunicipio",
  CENTER_FUTURE_GENERAL_INFORMATION_TITLE_PROFILE: "Perfil del Centro",

  // FORM CARD MASTER
  CENTER_FUTURE_CARD_NAME: "nombre",
  CENTER_FUTURE_CARD_SPECIALTY: "especialidad",
  CENTER_FUTURE_CARD_MASTER_TILE_: "Maestro/a ",
  CENTER_FUTURE_CARD_DELETE: "Eliminar",
  CENTER_FUTURE_CARD_MASTER_ADD_MASTER: "Añadir maestro/a",

  // FORM CARD ASISTANT
  CENTER_FUTURE_CARD_NAME_ASSISTANT: "Nombre del asistente/a",
  CENTER_FUTURE_CARD_ASSITANT: "Asistente/a ",
  CENTER_FUTURE_CARD_ADD_ASSISTANT: "Añadir asistente/a",

  // FORM ACUERDO DE COLABORACION
  CENTER_FUTURE_CARD_NAME_PARTNERSHIP_AGREEMENT: `Agencia`,
  CENTER_FUTURE_CARD_PURPOSE_PARTNERSHIP_AGREEMENT: `Propósito del acuerdo`,
  CENTER_FUTURE_CARD_EXPIRATION_PARTNERSHIP_AGREEMENT: `Vencimiento del acuerdo`,
  CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT: "Acuerdo de colaboración",
  CENTER_FUTURE_CARD_ADD_PARTNERSHIP_AGREEMENT:
    "Añadir acuerdo de colaboración",
  CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_AGENCY: "agencia",
  CENTER_FUTURE_CARD_PARTNERSHIP_AGREEMENT_EXPIRATION: "vencimiento",
  CENTER_FUTURE_CARD_ACADEMIC_PREPARATION_: "preparacionAcademica",
  CENTER_FUTURE_CARD_PURPOSE_: "proposito",

  REQUEST_ACCEPTED: "Su solicitud ha sido <br/>  sometida exitosamente.",
  REQUEST_ACCEPTED_SUBTITLE:
    "Su número de Solicitud es #{solicitud}. La ACUDEN evaluará las solicitudes en el orden en que sean recibidas. Posterior al último día del periodo para solicitar, toda solicitud que se encuentre incompleta o falta de documentos requeridos no podrá ser enmendada y se evaluará de conformidad a lo dispuesto en estas guías. <br/> <br/> De la ACUDEN entender que necesita información adicional a los documentos incluidos en estas instrucciones, podrá solicitarlos previo a la aprobación o denegación de la solicitud. La ACUDEN podrá aprobar cuantías distintas a las solicitadas por el empleado elegible.",
  //CDF
  THEMATIC_BACK_GENERIC: "Volver a mi solicitud",
  THEMATIC_BACK_ARROW_TEXT: "Volver a mi solicitud Centros del Futuro",
  THEMATIC_HEADER_DEFAULT_TITLE: "Eje Temático:",
  THEMATIC_HEADER_DEFAULT_TITLE_PLURAL: "Ejes Temáticos",
  THEMATIC_RESULTS_TITLE: "Resultados de Ejes Temáticos",
  THEMATIC_RESULTS_DESCRIPTION:
    "La puntuación final de la medición de calidad de su Centro se obtuvo sumando los tres totales de los Ejes Temáticos para luego ser divido entre tres (3) y multiplicado por cien (100). La puntuación será colocada en su perfil de Centro y en el Directorio de Centros en la paltaforma ACUDEN Quality System.",
  THEMATIC_RESULTS_MESSAGE:
    "¡Felicidades por haber completado los cuestionarios de los Ejes Temáticos! A continuación podrá acceder a la puntuación que obtuvo por cada eje temático según los grupos de edad a los que le ofrece servicio su Centro.",
  THEMATIC_INSTRUCTIONS: [
    {
      THEMATIC_HEADER_INSTRUCTION:
        "En esta sección, encontrará una serie de reactivos para su evaluación y respuesta. En estos se le preguntará sobre las relaciones entre el personal educativo y no educativo, relaciones con las familias, relaciones con los niños/as, relaciones con la comunidad, y toda relación que involucra al Centro y su personal.",
    },
    {
      THEMATIC_HEADER_INSTRUCTION:
        "La respuesta a cada reactivo será “sí” o “no” según corresponda a cada uno. Al responder “sí”, significará que esta es una actividad, práctica o tarea que se realiza actualmente en el Centro. Responder “no”, significará que esta actividad, práctica o tarea, en este momento, no se realiza en el Centro. Se debe responder todos los reactivos. No existen respuestas correctas o incorrectas.",
    },
    {
      THEMATIC_HEADER_INSTRUCTION:
        "A continuación, encontrará una serie de tablas, en las cuales se identificará un tema y las edades de los niños/as que se atienden en el Centro. Si en su Centro se atiende a más de un grupo de edad, responda este instrumento, con una sola edad, ya sea Infante, Maternal o Preescolar. Al final de cada tabla encontrará un espacio para calcular un subtotal. El mismo le permitirá identificar si ha olvidado responder alguno de los reactivos.",
    },
    {
      THEMATIC_HEADER_INSTRUCTION:
        "Al final de todas las tablas encontrará una tabla identificada como “Tabulación del Eje 1”. Esta sumará todos los subtotales. El subtotal de este eje, lo unirá luego a los subtotales de los otros dos ejes, lo cual le dará la puntuación final de su Centro.",
    },
  ],
  THEMATIC_SUCCESS_PROGRESS_SAVE_MSG:
    "¡Perfecto! ¡Su progreso se ha guardado exitosamente!",
  THEMATIC_MODAL_SEE_DETAIL_TITLE: `Aquí se desglosa la suma de todos los “sí” que
    respondió y sumó en cada una de las tablas anteriores,
    según la población que sirve su Centro.`,
  THEMATIC_MODAL_SEE_DETAIL_TOTAL_YES: "total de “Sí” respondidos",
  THEMATIC_MODAL_SEE_DETAIL_SUBTOTAL: "Subtotal",
  THEMATIC_MODAL_SEE_DETAIL_TOTAL_YES_ANSWER: "Total de respuestas Sí",
  THEMATIC_MODAL_SEE_DETAIL_BACK_BUTTON: " Volver a mi solicitud",

  //CDF ERRORS
  CDF_QUESTIONNAIRE_ERROR_MSG:
    "El cuestionario no es válido. Trate nuevamente!",
  GENERIC_CDF_ANSWER_ERROR:
    "Lo sentimos, se ha producido un error. Respuesta o información inválida. Trate nuevamente.",
  //HELPS CENTER

  HELP_CENTER_TITLE: "Centro de ayuda",
  HELP_CENTER_INTRODUCTION: "Introducción",
  HELP_CENTER_VIDEO_TUTORIALS: "Video Tutoriales",
  HELP_CENTER_FREQUENT_QUESTIONS: "Preguntas Frecuentes",
  HELP_CENTER_CONTACT: "Contacto",
  HELP_CENTER_INTRODUCTORY_VIDEO: "Vídeo introductorio",
  HELP_CENTER_INTRODUCTORY_VIDEO_P: `Conoce sobre ACUDEN Quality System, una plataforma que integra cursos, talleres,
  herramientas y certificaciones para elevar el nivel de calidad de los servicios de la niñez
  temprana en Puerto Rico.`,
  HELP_CENTER_INTRODUCTORY_VIDEO_TITLE_BTN: "Reproducir Video",
  HELP_CENTER_TITLE_VIDEO: "Video tutorial",
  HELP_CENTER_BUTTON_SEE_VIDEO: "Ver Video",
  HELP_CENTER_CARD_TEXT: `Enim ad magna sit qui in proident do cillum dolor. Ut
  magna irure occaecat nostrud pariatur anim aute. Proident
  enim voluptate officia.`,
  HELP_CENTER_TITLE_CONTACT: "Contáctanos",
  HELP_CENTER_TITLE_CONTACT_1:
    "Llena el formulario para enviar preguntas o comentarios relacionados a la plataforma ACUDEN Quality System. Todos los campos son requeridos.",
  HELP_CENTER_CONTACT_FIELD_NAME: "Nombre",
  HELP_CENTER_CONTACT_FIELD_lAST_NAME: "Apellidos",
  HELP_CENTER_CONTACT_FIELD_E_MAIL: "Correo electrónico",
  HELP_CENTER_CONTACT_FIELD_SUBJECT: "Asunto",
  HELP_CENTER_CONTACT_FIELD_MESSAGE: "Mensaje",
  HELP_CENTER_MENU_BUTTON_SEND: "Enviar",
  HELP_CENTER_REQUEST_CONTACT: "Se ha enviado correctamente su solicitud",
  MENU_BUTTON_INTRODUCTION: "Introducción",
  MENU_BUTTON_VIDEO_TUTORIALS: "Video tutoriales",
  MENU_BUTTON_FREQUENT_QUESTIONS: "Preguntas frecuentes",
  MENU_BUTTON_CONTACT: "Contacto",
  HELP_CENTER_BEHAVIOR: "smooth",
  HELP_CENTER_BLOCK: "start",
  HELP_CENTER_FIELD_INVALID:
    "Por favor, verifica el formulario de contacto. Algunos datos están incompletos.",
};
/**
 * Menu principal Help center
 */
export const HELP_CENTER_MENU_ITEMS = [
  {
    MENU_BUTTON_TEXT: "Introducción",
  },
  {
    MENU_BUTTON_TEXT: "Video tutoriales",
  },
  {
    MENU_BUTTON_TEXT: "Preguntas frecuentes",
  },
  {
    MENU_BUTTON_TEXT: "Contacto",
  },
];
/**
 * Frequent questions
 */
export const FREQUENTSQUESTIONS = [
  {
    question:
      "¿Cómo puedo registrarme si soy empleado de un proveedor de servicios?",
    answer: `Los proveedores de servicios invitan a sus empleados a través de sus correos electrónicos.
        Los empleados recibirán un correo electrónico con un enlace para comenzar su proceso de registro a la plataforma.`,
  },
  {
    question: "¿Cómo se clasifican los proveedores de servicios?",
    answer: `Los proveedores de servicios se clasifican en Centro de cuido, Red de cuido, Proveedor familiar,
                                       Head Start, Early Head Start, Intervención temprana y Distrito escolar.`,
  },
  {
    question:
      "¿Cuándo los proveedores de servicio tendrán acceso a la plataforma una vez llenen el formulario de registro?",
    answer: `Una vez completado el formulario de registro, el proveedor de servicios debe esperar a que la información provista
                                        sea corroborada y validada por ACUDEN. Una vez validada, recibirá una notificación de validación o negación a través
                                        del correo electrónico. De ser aceptado, encontrará un enlace para iniciar sesión y disfrutar de los servicios de la plataforma.`,
  },
  {
    question:
      "¿Las certificaciones que se otorgan en la plataforma a los empleados de proveedores de servicio se pueden descargar?",
    answer: `Sí. Las certificaciones otorgadas en la plataforma pueden ser descargadas. Puede encontrar su certificaciones en su perfil,
    en la sección de certificaciones e insignias.`,
  },
  {
    question: "¿Puedo registrarme aunque no tenga dependientes?",
    answer: `Sí. Toda la comunidad en general puede registrarse en la plataforma y beneficiarse de los servicios que ofrece la misma.`,
  },
  {
    question:
      "¿Puedo registrar a mis dependientes en un centro a través de esta plataforma?",
    answer: `No. La plataforma no ofrece la opción de matricular a sus dependientes en un centro. En el directorio de proveedores puede
    filtrar según la localización y la categoría del proveedor al igual que guardar sus proveedores de servicio favoritos.
    Además, puede visitar sus perfiles para ver su información de contacto, información general, empleados y fotos.`,
  },
  {
    question:
      "¿Para acceder al directorio de proveedores, la biblioteca y el calendario debo tener una cuenta?",
    answer: `Sí. Para poder ver los perfiles de los proveedores de servicios, ver y descargar documentos y registrarse en un evento debe estar registrado(a).`,
  },
  {
    question:
      "¿Si un empleado renuncia a su puesto o el centro cesa sus operaciones puede el empleado seguir accediendo a su cuenta aunque ya no esté enlazada a ningún proveedor de servicio?",
    answer: `Sí. Una vez el empleado es desvinculado por el proveedor de servicios, o el centro elimina su cuenta, este aún puede acceder y
    encontrar toda su información incluyendo cursos en progreso y sus certificaciones e insignias. Aunque su cuenta permanezca activa,
    su perfil no será visible a la comunidad hasta ser invitado por otro proveedor de servicios. Al recibir la invitación solo debe
    aceptar o denegar la invitación. De aceptarla, solo debe iniciar sesión sin la necesidad de registrarse nuevamente.`,
  },
];
/**
 * Text Video tutoriales
 */
export const VIDEO_TUTORIALS = [
  {
    title: "Directorio de Centros (Video tutorial 1)",
    text: `Conoce cómo filtrar, buscar y acceder a los perfiles de los centros del cuidado de la niñez que se
    han registrado en la plataforma.`,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    img: `${ImgVideoTutorials1}`,
  },
  {
    title: "Biblioteca virtual (Video tutorial 2)",
    text: `Aprende cómo encontrar, acceder y descargar los manuales y recursos educativos de ACUDEN.`,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    img: `${ImgVideoTutorials2}`,
  },
  {
    title: "ACUDEN Academy (Video tutorial 3)",
    text: `Conoce acerca de ACUDEN Academy, una academia virtual para profesionales de la niñez
    temprana.`,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    img: `${ImgVideoTutorials3}`,
  },
  {
    title: "Centros del Futuro (Video tutorial 4)",
    text: `Accede a un tutorial que detalla el proceso para solicitar la evaluación de su Centro a través del
    instrumento Centros del Futuro.`,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    img: `${ImgVideoTutorials4}`,
  },
  {
    title: "ACCESA (Video tutorial 5)",
    text: ` Conoce acerca el Programa ACCESA, la beca de estudios para los
    a un tutorial que detalla el proceso para solicitar la evaluación de su Centro a través del
    instrumento Centros del Futuro.`,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    img: `${ImgVideoTutorials5}`,
  },
];

/*
 * Titulos de formularios en mis solicitudes
 */
export const TITLE_QUESTION_ACCESA = [
  { ACCESA_FIELDS_NAME: "Nombre*" },
  { ACCESA_FIELDS_LASTNAME: "Apellidos*" },
  { ACCESA_FIELDS_NUMBER_SOCIAL_SECURITY: "Número de Seguro Social*" },
  { ACCESA_FIELDS_NUMBER_PHONE: "Número de teléfono*" },
  { ACCESA_FIELDS_EMAIL: "Correo electrónico*" },
  { ACCESA_FIELDS_POSTAL_ADDRESS: "Dirección postal*" },
  { ACCESA_FIELDS_PHYSICAL_ADDRESS: "Dirección física*" },
  { ACCESA_FIELDS_CITY: "Municipio*" },
  { ACCESA_FIELDS_CODE_ZIP: "Codigo postal*" },
  { ACCESA_FIELDS_GENDER: "Género*" },
  { ACCESA_FIELDS_OCUPATION: "Ocupación*" },
  {
    ACCESA_FIELDS_HASCDA: "Posee credencial Child Development Associate (CDA)*",
  },
  {
    SUPPLIER_QUESTION_1:
      "¿Trabaja actualmente con algún proveedor de centro de cuido u hogar licenciado?*",
  },
  { EMPLOYEE_QUESTION_2: "Nombre del Proveedor*" },
  {
    SUPPLIER_QUESTION_3:
      "Municipio donde se ubican las instalaciones del proveedor (centro de cuidado u hogar licenciado) en el que usted trabaja.",
  },

  { SUPPLIER_QUESTION_4: "Tipo de facilidad del Proveedor*" },

  { SUPPLIER_QUESTION_5: "Tipo de Entidad*" },

  {
    SUPPLIER_QUESTION_6:
      "Estatus de apertura del centro de cuido u hogar licenciado*",
  },

  {
    SUPPLIER_QUESTION_7:
      "¿Cuándo comenzó a trabajar con el proveedor de cuidado infantil? (Ej. Enero-2020)*",
  },
  {
    SUPPLIER_QUESTION_8:
      "Jornada Laboral Semanal* Cantidad de horas que usted trabaja a la semana . (Ej. 40)",
  },

  {
    ACCESA_FIELDS_NAME_EDUCATIONAL_INSTITUTION: `Nombre de la Instutición Educativa* Escriba el nombre de la institución de educación superior en
      la que está o estará estudiando.`,
  },

  { ACCESA_FIELD_ACADEMIC_GRADE: "Grado académico*" },
  {
    ACCESA_FIELDS_COURSE_NAME: `Área o programa de estudio* Escriba el área o programa de estudio (Ej: Educación
    Prescolar)`,
  },

  { ACCESA_FIELDS_ACADEMIC_PERIOD: "Tipo de periodo académico*" },
  {
    ACCESA_FIELDS_ACADEMIC_START_DATE:
      "Fecha de comienzo del semestre/trimestre*",
  },
  {
    ACCESA_FIELDS_ACADEMIC_END_DATE:
      "Fecha de culminación del semestre/trimestre*",
  },
  {
    ACCESA_FIELDS_ACADEMIC_PERIOD_COST: ` Costo de matrícula* Indique el costo de matrícula para el periodo académico para
  el cual está solicitando.`,
  },

  {
    ACCESA_FIELDS_HAS_ECONOMIC_AID: `¿Ha solicitado o recibido asistencia económica para este periodo
  académico?*`,
  },
  {
    ACCESA_FIELDS_HAS_STUDENT_LOAN: `¿Solicitó o recibió prestamo estudiantil para este periodo
  académico?*`,
  },
];
/*
 * Titulos de formulario de informacion basica CDF
 */
export const TITLE_QUESTION_CDF_FORM = [
  { CDF_FORM_BASIC_INFORMATION_QUESTION_1: "Nombre del Centro*" },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_2:
      "Nombre de persona que dirige el Centro*",
  },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_3: "Teléfono del Centro*" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_4: "Municipio donde ubica el Centro*" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_5: "Dirección Física del Centro*" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_6: "Dirección Postal del Centro*" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_7: "Correo electrónico del Centro*" },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_8:
      "Página web y/o redes sociales del Centro*",
  },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_9:
      "Horario de Trabajos Administrativos del Centro*",
  },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_9_1:
      "Indique la población/es de niños/as a ser medida mediante este instrumento*",
  },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_10:
      "Cantidad de salones que posee el Centro*",
  },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_11:
      "Cantidad de niños/as en el Centro* (De la población/es a sermedida mediante este instrumento).",
  },
  {
    CDF_FORM_BASIC_INFORMATION_QUESTION_12:
      "De atender diferentes grupos de edades, indique la cantidad de niños/as en el Centro por categoría de edad.*",
  },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_13: "Maternales" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_14: "Preescolares" },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_15: "Total" },
  {
    CDF_FORM_INFORMATION_QUESTION_16: `¿El Centro acepta niños/as con diversidad funcional?* Si el
Centro acepta niños/as con estas características dependiendo de
alguna condición, favor de especificar la misma.`,
  },
  { CDF_FORM_BASIC_INFORMATION_QUESTION_17: "Especifique la condición*" },
  { CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_1: "Tipo de organización" },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_2:
      "Si es administrada por Gobierno, identifique agencia o municipio que administrador*",
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_3: "Financiamiento del Centro*",
  },
  { CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_4: "Horario de servicios*" },
  { CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_5: "Días de servicio*" },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_6:
      "Indique la población/es de niños/as a ser medida mediante este instrumento*",
  },
  { CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_7: "El Centro cuenta con:*" },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8:
      "Acreditaciones/Licencias que posee el Centro*",
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_8_SPECIFICATION:
      "Espeficicación de Acreditaciones/Licencias que posee el Centro*",
  },

  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9:
      "Relación del Centro con ACUDEN*",
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_9_SPECIFICATION:
      "Especificación de relación del Centro con ACUDEN*",
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_10: `Maestros/as del Centro*  Más adelante, se le preguntará sobre los maestros en el Centro. 
    Esta sección tiene como propósito ayudarle a recopilar y organizar la información necesaria.`,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_11: `Asistentes de maestros/as del Centro* Más adelante, se le preguntará 
  sobre los asistentes de maestros en el Centro. Esta sección tiene como propósito 
  ayudarle a recopilar y organizar la información necesaria.`,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_12: `Más adelante, se le preguntará sobre la proporción entre niños/as y 
  personal del Centro. Responda esta pregunta basándose en la totalidad de niños/as y personal en el Centro.
  Según la Oficina de Licenciamiento:
  Para grupos de Infantes se establece un máximo de 4 niños/as por adulto.
  Para grupos de Maternales se establece un máximo de 4 niños/as por adulto.
  Para grupos de Preescolares se establece un máximo de 8 niños/as por adulto.`,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_14: `Cantidad de niños/as Maternales*  `,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_15: `Cantidad de niños/as Preescolares*`,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_16: `Cantidad total de niños/as* `,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_17: `Cantidad total de empleados*`,
  },
  {
    CENTER_FUTURE_GENERAL_INFORMATION_QUESTION_18: `Acuerdos de colaboración*
  Más adelante, se le preguntará sobre los acuerdos de colaboración que tiene el Centro. Esta tabla tiene 
  como propósito ayudarle a recopilar y organizar la información necesaria.`,
  },
];
/**
 * Use Terms config & topics.
 */
export const USE_TERMS_CONFIG = {
  TITLE: "Términos y condiciones",
  HEADER: "Términos y condiciones ACUDEN Quality System",
  SUBHEADER: [
    {
      p:
        "El acceso a esta plataforma, constituye la aceptación expresa de los siguientes Términos y\n" +
        "Condiciones. Los servicios que se ofrecen a través de la misma están sujetos al estricto cumplimiento\n" +
        "de estos Términos y Condiciones, por lo que si usted decide no acatarlas, deberá abstenerse de utilizar\n" +
        "los servicios ofrecidos por esta plataforma. La Administración del ACUDEN Quality System se reserva\n" +
        "el derecho de terminar o suspender, en cualquier momento, por cualquier razón y sin necesidad de\n" +
        "aviso o notificación previa, la prestación de servicios a cualquier usuario que determine que esté\n" +
        "incumpliendo con estas normas o que represente un riesgo a la seguridad de esta plataforma o del\n" +
        "público en general.",
    },
    {
      p:
        "Cualquier persona que use esta plataforma, expresamente consiente a que su actividad sea\n" +
        "monitoreada por la Administración de la misma. Usted, el Usuario, queda advertido de que el\n" +
        "Administrador de esta plataforma podría proveer evidencia a las autoridades pertinentes, acerca de\n" +
        "posible actividad criminal que sea identificada durante el monitoreo. Si usted, el Usuario, no consiente\n" +
        "a que su actividad en este portal cibernético sea monitoreada, deberá salir de este sistema\n" +
        "inmediatamente.",
    },
    {
      p:
        "El Departamento de la Familia y la ACUDEN se reservan el derecho de sustituir o modificar el\n" +
        "contenido de estos Términos y Condiciones, por lo que se recomienda al usuario consultar\n" +
        "periódicamente los mismos. Asimismo, se reservan la facultad de ampliar, limitar o restringir la\n" +
        "capacidad, disponibilidad y operatividad del contenido y servicios ofrecidos a través de esta\n" +
        "plataforma.",
    },
  ],
  TOPICS: [
    {
      id: "1",
      title: "Derecho Aplicable",
      description: [
        {
          d:
            "1. Estos Términos y Condiciones, el contenido de esta plataforma y los servicios ofrecidos a través de la\n" +
            "misma, se rigen por las leyes de Puerto Rico. El usuario se compromete a utilizar esta plataforma y los\n" +
            "servicios que se proveen a través de la misma de conformidad con la Constitución del Estado Libre\n" +
            "Asociado de Puerto Rico, leyes aplicables, normas o reglamentos de uso que se publiquen,\n" +
            "condiciones particulares aplicables a los servicios aquí ofrecidos y demás avisos, de conformidad con\n" +
            "la moral y el orden público.",
        },
      ],
    },
    {
      id: "2",
      title: "Obligaciones de los Usuarios",
      description: [
        {
          d:
            "1. El Usuario garantiza que toda la información y datos que provea para facilitar el procesamiento de\n" +
            "los Servicios que solicita y para la utilización de las herramientas de la plataforma, es auténtica,\n" +
            "correcta y veraz.",
        },
        {
          d:
            "2. Es su responsabilidad como Usuario mantener su información actualizada en todo momento. El\n" +
            "Usuario será el único y absoluto responsable de los daños y perjuicios que puedan resultar a causa\n" +
            "de cualquier representación falsa o incorrecta hecha por éste al usar la plataforma. Si facilita datos\n" +
            "falsos, inexactos o incompletos o la Administración del ACUDEN Quality System tiene motivos\n" +
            "\n" +
            "fundados para sospechar tal conducta, la cuenta del usuario podrá ser cancelada por la ACUDEN y\n" +
            "se le denegará acceso y uso de la plataforma.",
        },
        {
          d:
            "3. El Usuario es responsable de proteger su información personal (nombre, dirección de correo\n" +
            "electrónico, seguro social, números de contacto, entidad a la que pertenece, entre otros datos) que\n" +
            "provea a la plataforma para utilizar las herramientas y recibir los Servicios que solicita. Usted se\n" +
            "compromete a cerrar su cuenta al final de cada sesión utilizando el enlace de “SALIR” y a notificar\n" +
            "inmediatamente cualquier pérdida de su contraseña o acceso no autorizado por parte de terceros a\n" +
            "su cuenta.",
        },
        {
          d:
            "4. El Usuario se compromete a abstenerse de utilizar esta plataforma de cualquier manera o forma\n" +
            "que pueda dañar, inutilizar o impedir el funcionamiento normal de la misma, incluyendo los\n" +
            "documentos y archivos almacenados en los recursos de los sistemas informáticos a los que accede\n" +
            "la misma. Cualquier usuario que atente contra la seguridad o contra el funcionamiento de los\n" +
            "sistemas informáticos del Gobierno de Puerto Rico podría estar sujeta a penalidades\n" +
            "administrativas y criminales.",
        },
        {
          d:
            "5. El Usuario se obliga a no utilizar la plataforma para realizar actividades contrarias a la ley, moral,\n" +
            "buenas costumbres y orden público con fines o efectos ilícitos, prohibidos o lesivos a los derechos\n" +
            "e intereses de terceros.",
        },
        {
          d:
            "6. El Usuario se obliga a no alterar los dispositivos técnicos de protección de la información\n" +
            "suministrada a la plataforma, de las menciones de Derecho de Autor u otros datos que identifiquen\n" +
            "los derechos de propiedad intelectual del Gobierno de Puerto Rico, utilizados para ofrecer los\n" +
            "Servicios en esta plataforma.",
        },
        {
          d:
            "7. El Usuario responderá por todo uso que se gestione bajo su Nombre de Usuario , si alguno, así\n" +
            "como desde su dirección del protocolo de Internet (mejor conocido como “IP Address”), o cualquier\n" +
            "cuenta creada con su información para el uso y acceso a los Servicios y herramientas.",
        },
        {
          d:
            "8. Será responsabilidad del Usuario notificar a la Administración del ACUDEN Quality System a través\n" +
            "del área de Apoyo Técnico sobre cualquier irregularidad, error o imprecisión de la cual se percate\n" +
            "durante el uso de la plataforma.",
        },
      ],
    },
    {
      id: "3",
      title: "Obligaciones de la ACUDEN",
      description: [
        {
          d:
            "1. La ACUDEN se compromete a brindar servicios de alta calidad a través de esta plataforma, dentro\n" +
            "de las circunstancias y particularidades del medio cibernético, así como dentro de su capacidad\n" +
            "para tales fines.",
        },
        {
          d:
            "2. La ACUDEN se compromete a adoptar medidas de seguridad rigurosas, cónsonas con los\n" +
            "estándares de seguridad de la industria cibernética, a fin de garantizar en la medida que sea\n" +
            "posible y razonable, la seguridad y confidencialidad de las comunicaciones con el fin de minimizar\n" +
            "los riesgos que conlleva el uso del medio cibernético. No obstante, se hace la salvedad de que las\n" +
            "medidas de seguridad de los servicios y sistemas de informática no son invulnerables, los canales\n" +
            "de comunicación electrónica utilizados en Internet no son seguros y puede ser posible que\n" +
            "comunicaciones en este medio puedan ser interceptadas y/o modificadas por personas no\n" +
            "autorizadas. Por tanto, el Gobierno de Puerto Rico, el Departamento de la Familia, ni la ACUDEN\n" +
            "se hacen responsables por fallos en la seguridad, en ámbitos operativos y fuera de su control\n" +
            "exclusivo.",
        },
        {
          d:
            "3. La ACUDEN se compromete a cumplir con la Política de Privacidad establecida para el ACUDEN\n" +
            "Quality System.",
        },
      ],
    },
    {
      id: "4",
      title: "Calidad de los Servicios",
      description: [
        {
          d:
            "La ACUDEN aspira a ofrecer servicios a través de esta plataforma las 24 horas del día durante todo el\n" +
            "año. No obstante, existe la posibilidad de que en ocasiones, no sea posible mantener la continuidad\n" +
            "del servicio, debido a causas ajenas a su voluntad o a actualizaciones u operaciones de\n" +
            "mantenimiento que impliquen la suspensión de acceso o utilización de la plataforma. Por lo tanto, al\n" +
            "utilizar esta plataforma, el Usuario entiende y acepta que no se garantiza la disponibilidad o la\n" +
            "continuidad del funcionamiento del ACUDEN Quality System y de los servicios y herramientas que se\n" +
            "proveen a través de éste. Tampoco se garantiza la efectividad de los enlaces de la plataforma para\n" +
            "acceder a las distintas páginas o áreas que forman parte de la plataforma o aquéllas desde las cuales\n" +
            "se prestan servicios. De igual manera, la ACUDEN no garantiza la ausencia de virus u otros elementos\n" +
            "escondidos en el contenido de esta plataforma, que puedan producir alteraciones o daños al sistema\n" +
            "informático (software y hardware) o a los documentos y archivos electrónicos almacenados en el\n" +
            "mismo y no será responsable de los daños que éstos puedan causar.",
        },
        {
          d:
            "Asimismo, a través de esta plataforma se ofrecen dispositivos técnicos de enlace, directorios y motores\n" +
            "de búsqueda que permiten acceder a sitios y páginas web pertenecientes o gestionadas por terceros,\n" +
            "lo cual no implica relación alguna entre la plataforma y los propietarios de las páginas, sitios o\n" +
            "aplicaciones que ofrecen dichos dispositivos técnicos. El el Departamento de la Familia, ni la ACUDEN\n" +
            "asumen responsabilidad alguna por el contenido y los servicios que se ofrecen a través de dichas\n" +
            "páginas.",
        },
        {
          d:
            "El Gobierno de Puerto Rico, el Departamento de la Familia, ni la ACUDEN serán responsables por\n" +
            "fallas en el sistema que hayan sido causadas por fuerza mayor, por pérdidas o daños (incluyendo daño\n" +
            "o pérdidas de datos), por cualquier gasto incurrido, o por ganancias dejadas de recibir, que estén\n" +
            "relacionadas al uso del ACUDEN Quality System o a la no disponibilidad del mismo.",
        },
      ],
    },
    {
      id: "5",
      title: "Propiedad Intelectual",
      description: [
        {
          d:
            "Esta plataforma contiene información protegida por los derechos de propiedad intelectual y derechos\n" +
            "de autor. Esto incluye, pero no se limita a, las imágenes, textos, logos, documentos, archivos\n" +
            "descargables y todo lo que contribuye a la creación de la plataforma. El Gobierno de Puerto Rico y sus\n" +
            "agencias tienen derechos propietarios sobre todo el contenido que aparece en la misma. El Gobierno\n" +
            "de Puerto Rico y sus agencias, se reservan todos los derechos que existen o puedan existir sobre este\n" +
            "contenido. La publicación de información en esta plataforma no constituye una cesión de los derechos\n" +
            "o una licencia para utilizar la información sin obtener el consentimiento previo del Gobierno de Puerto\n" +
            "Rico y/o sus agencias.",
        },
      ],
    },
  ],
};
/**
 * Privacy Policy config & topics.
 */
export const PRIVACY_POLICY_CONFIG = {
  TITLE: "Política de Privacidad",
  HEADER: "Política de Privacidad ACUDEN Quality System",
  SUBHEADER: [
    {
      p: "El propósito de esta declaración es informarle al Usuario que información es recopilada a través de nuestra plataforma, para qué se recopila, el uso que se le dará, con quién es compartida y las medidas de seguridad que se utilizan para proteger la misma.",
    },
    {
      p: "La política pública con relación al ACUDEN Quality System es que no se recopilará ninguna información personal del Usuario al acceder a la plataforma, a menos que dicha información sea proporcionada voluntariamente.",
    },
  ],
  TOPICS: [
    {
      id: "1",
      title: "Información recopilada automáticamente",
      description: [
        {
          d:
            "Al registrarse y/o ingresar a la plataforma de ACUDEN Quality System se le pide a los Usuarios\n" +
            "información personal con el único propósito de poder utilizar las herramientas de la plataforma,\n" +
            "brindarle los Servicios solicitados y comprobar la identidad del Usuario. Además, el servidor de la\n" +
            "plataforma recoge automáticamente cierta información de carácter no-identificable sobre los Usuarios.\n" +
            "En específico, cada vez que se reciba una solicitud de protocolo de transmisión de hipertexto (http\n" +
            "request), se recogerá y guardará información sobre la fecha y la hora de la solicitud, la dirección del\n" +
            "protocolo de internet de donde se origina la solicitud, el propósito de la misma, el tipo de navegador y\n" +
            "sistema operativo que se utilizó para ver la plataforma, las secciones que se visitaron y la página\n" +
            "externa que originó la visita a la plataforma, entre otros.",
        },
      ],
    },
    {
      id: "2",
      title: "Uso de la información personal de los Usuarios",
      description: [
        {
          d:
            "Se guardará información personal sobre los Usuarios (ej. nombre, dirección de correo electrónico,\n" +
            "seguro social, números de contacto, entidad a la que pertenece, etc.) solamente si éstos deciden\n" +
            "proveerla libre y voluntariamente. La información personal que voluntariamente provea el Usuario al\n" +
            "momento de accesar a la plataforma y los Servicios, se utilizará únicamente con el propósito de brindar\n" +
            "los Servicios solicitados, comprobar la identidad del Usuario y garantizar la seguridad y confiabilidad\n" +
            "de la transacción.",
        },
        {
          d:
            "La información del Usuario recogida en o a través del ACUDEN Quality System no será vendida ni\n" +
            "cedida a terceros. La información personal que el Usuario provea en esta plataforma será utilizada\n" +
            "solamente para la administración y el manejo de los Servicios ofrecidos en el mismo, para\n" +
            "identificación del Usuario mientras utiliza las herramientas de la plataforma y para otros propósitos\n" +
            "descritos en esta declaración o en el sitio en donde se solicite la información. También se podrá\n" +
            "recopilar información de tipo genérico para propósitos estadísticos y para el mantenimiento y\n" +
            "mejoramiento de la plataforma. Con ese fin, se analizará dicha información de vez en cuando para\n" +
            "determinar los intereses de los Usuarios y la frecuencia con la cual nos visitan. La información\n" +
            "recogida para estos fines está en un formato que no permite identificar personalmente al Usuario.",
        },
      ],
    },
    {
      id: "3",
      title: "Con quién se comparte la información personal de los Usuarios",
      description: [
        {
          d:
            "La información personal de los Usuarios será compartida únicamente con personal del Departamento\n" +
            "de la Familia y de la ACUDEN. En tales ocasiones, únicamente será revelada la información que sea\n" +
            "necesaria para llevar a cabo la transacción. También podrá revelarse información a las agencias\n" +
            "(locales y federales) responsables de mantener la ley y el orden público en Puerto Rico, únicamente si\n" +
            "dicha divulgación es autorizada o requerida por la legislación aplicable o por una orden judicial.",
        },
        {
          d:
            "En casos en que la legislación aplicable no permita divulgar la información personal del Usuario o que\n" +
            "no medie una orden judicial, la Administración del ACUDEN Quality System no podrá compartir\n" +
            "información personal con otras personas, a menos que obtenga consentimiento del Usuario.",
        },
      ],
    },
    {
      id: "4",
      title: "Acceso a la información personal recopilada",
      description: [
        {
          d:
            "Cada Usuario tendrá acceso a su información personal que conste en su perfil recopilada en o a través\n" +
            "de la plataforma. La Administración del ACUDEN Quality System se compromete a corregir cualquier\n" +
            "error relativo a su información personal que usted notifique a través del área de apoyo técnico\n" +
            "disponible en la plataforma.",
        },
      ],
    },
    {
      id: "5",
      title: "Protección de la información recopilada",
      description: [
        {
          d:
            "La Internet fue diseñada originalmente como un sistema abierto sin ningún sistema de seguridad. Sin\n" +
            "embargo, la información de los Usuarios recopilada y guardada será  protegida y no se utilizará la\n" +
            "Internet para proveer Servicios a menos que se pueda realizar de una manera segura. A esos efectos,\n" +
            "se tomarán las precauciones razonables para mantener la seguridad, confidencialidad e integridad de\n" +
            "la información recopilada en y a través de esta plataforma. Ocasionalmente, se contratarán terceros\n" +
            "para que provean ciertos Servicios con respecto a la plataforma y su base de datos, a quienes se le\n" +
            "hará las debidas exigencias de manera que no comprometan la seguridad, confidencialidad e\n" +
            "integridad de la información personal a la cual dichos contratistas puedan tener acceso durante el\n" +
            "curso del desempeño de sus Servicios.",
        },
      ],
    },
    {
      id: "6",
      title: "Advertencia con respecto al uso de correo electrónico",
      description: [
        {
          d:
            "El correo electrónico no es un medio seguro para la transmisión de información personal. Por lo tanto,\n" +
            "se le advierte al Usuario que no debe enviar información personal a través del correo electrónico. La\n" +
            "plataforma ofrece la oportunidad de hacer preguntas, solicitar mayor información y enviar comentarios.\n" +
            " El uso de este servicio es voluntario y puede requerir su dirección de correo electrónico.  La\n" +
            "información que usted provea por este medio no será cifrada (encrypted), por lo cual podría ser\n" +
            "interceptada durante su transmisión por terceras personas ajenas al Departamento de la Familia y la\n" +
            "ACUDEN. No se solicitará mediante correo electrónico que el Usuario provea datos sobre su\n" +
            "información personal.  Por tanto, en ninguna circunstancia el Usuario debe responder a mensajes de\n" +
            "correos electrónicos no solicitados que aleguen ser provenientes del Departamento de la Familia o de\n" +
            "la ACUDEN.",
        },
      ],
    },
    {
      id: "7",
      title: "Uso de “cookies”",
      description: [
        {
          d:
            "Utilizamos cookies en nuestro sitio para personalizar la experiencia de nuestros visitantes y para\n" +
            "apoyar algunas de las funciones necesarias. También usamos cookies para entender mejor cómo los\n" +
            "visitantes usan nuestra plataforma. Una cookie es un archivo de texto que se coloca en el disco de su\n" +
            "computadora por un servidor web. Las cookies no se pueden usar para ejecutar programas of infectar\n" +
            "su computadora con virus. Las cookies son asignadas a su navegador y perfil de su computadora y\n" +
            "solo pueden ser leídas por el servidor web que le asignó la cookie a usted. Usted también tiene\n" +
            "opciones con respecto a las cookies. Al modificar las preferencias del navegador, tiene la opción de\n" +
            "aceptar todas las cookies, ser notificado cuando se coloque una cookie o de rechazar todas las\n" +
            "cookies. Sin embargo, tenga en cuenta que si rechaza algunas o todas las cookies, su experiencia en\n" +
            "esta plataforma y en otros sitios de Internet puede que no sea una completa. Además, si usted no\n" +
            "permite las cookies, usted no será capaz de tomar ventaja de la entrega de contenido personalizado\n" +
            "que ofrecen otros sitios de Internet o nosotros.",
        },
      ],
    },
  ],
};
/**
 * Rutas utilizadas en la aplicación.
 */
export const PORTAL_ROUTES = {
  // Rutas
  LANDING_ROUTE: "/",
  LOGIN_ROUTE: "/login",
  REGISTRATION_ROUTE: "/select-register",
  FORGOT_PASSWORD_ROUTE: "/forgotPassword",
  FORGOT_PASSWORD_CONFIRMATION_ROUTE: "/forgotPassword/confirmation",
  DASHBOARD_ROUTE: "/dashboard",
  HELP_ROUTE: "/help-center",
  NEWS: "/news",
  NEWS_DETAILS: "/news-details/",
  LIBRARY_ROUTE: "/library",
  LIBRARY_PREVIEW_ROUTE: "/library-preview",
  CONTACT_ROUTE: "/contact-us",
  ABOUT_ROUTE: "/about-us",
  RESOURCES_ROUTE: "/resources",
  EMPLOYEE_PROFILE_ROUTE: "/employee-profile/",
  PROVIDER_EMPLOYEE_ROUTE: "/provider-employee/",
  PROVIDER_PROFILE_ROUTE: "/service-profile/",
  PROVIDER_DIRECTORY_ROUTE: "/provider-directory",
  PROVIDER_GUEST_ROUTE: "/service-profile/guest",
  PROVIDER_REGISTER_ROUTE: "/provider-register",
  CALENDAR_ROUTE: "/calendar",
  LMS_ROUTE: "/lms",
  NEWS_ROUTE: "/news",
  NEWS_DETAILS_ROUTE: "/news-details/",
  SETTINGS_ROUTE: "/settings",
  PRIVACY_POLICY_ROUTE: "/privacy-policy",
  USE_TERMS_ROUTE: "/use-terms",
  ACCESA_ROUTE: "/landing-accesa",
  FORM_SUPPLIER_REQUEST: "/form-supplier-request",
  FORM_EMPLOYEE_REQUEST: "/form-employee-request",
  START_REQUEST: "/start-request",
  SEE_REQUEST: "/see-request",
  LANDING_ACCESA: "/landing-accesa",
  LANDING_CENTERS_FUTURE: "/landing-center-future",
  ACADEMY_DATA: "/academy-data",
  DOCUMENT_REQUIRED: "/document-required",
  BENEFITS: "/benefits",
  TERMS_CONDITIONS: "/terms-conditions",
  SUCCESSFULL_REQUEST: "/successfull-request",
  MY_REQUEST: "/my-request",
  DETAILTS_REQUEST: "/detailts-request",
  LANDING_CENTER_FUTURE: "/landing-center-future",
  FORM_GENERAL_INFORMATION_CENTER: "/form-general-information-center",
  FORM_BASIC_INFORMATION_CENTERS_FUTURE:
    "/form-basic-information-centers-future",
  REQUEST_SENT_CENTERS_FUTURE: "/request-sent-centers-future",
  MY_REQUEST_CENTERS_FUTURE: "/my-request-centers-future",
  DETAILTS_REQUEST_CENTERS_FUTURE: "/details-request-centers-future/",
  CDF_HISTORY_ROUTE: "/cdf/history",
  CDF_THEMATIC_TABLE_ROUTE: "/cdf/questionnaire",
  CDF_RESULTS_ROUTE: "/cdf/results",
};
/**
 * Constants used in the application.
 */
export const CONSTANTS = {
  CONTENT_TYPE_JSON: "application/json",

  // HTTP
  HTTP_OK: 200,
  HTTP_ACCEPTED: 202,
  HTTP_NO_CONTENT: 204,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_CONFLICT: 409,
  HTTP_INTERNAL_ERROR: 500,
  HTTP_LOCAL_ERROR: 5000,
  NETWORK_ERROR: "ERR_NETWORK",

  // Controllers
  DEFAULT_PAGE_NUMBER: 0,
  DEFAULT_PAGE_SIZE: 8,
  DEFAULT_CARDS_ITEMS_PER_PAGE: 2,
  DEFAULT_CARDS_ITEMS_PER_PAGE_VIDEO_CARDS: 4,
  DEFAULT_SORT_DIR: "desc",
  ASC_SORT: "asc",
  DEFAULT_SORT_BY: "createdOn",

  // General
  MIN_RAND: 16754,
  MAX_RAND: 364987287,
  AVAILABLE_IMAGE_FORMATS: ["jpeg", "jpg", "png"],
  AVAILABLE_DOCUMENT_VIEWER_IMG_FORMATS: ["jpg", "jpeg", "png", "gif", "svg"],
  MAX_IMAGE_SIZE: 200,
  IMAGE_SIZE_UNIT: "MB",
  LOADING_SPINNER_COLOR: "#092c4c",
  DEFAULT_SPINNER_SIZE: 150,
  DEFAULT_PULSAR_SIZE: 50,
  FILE_MAX_SIZE: 2 * 1024 * 1024,

  ADMIN_ROLE: 1,

  FORGOT_CONTEXT: "forgot",

  DEFAULT_INPRENDE_VIDEO: [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ],
};
/**
 * User status constants.
 */
export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  BLOCKED: "BLOCKED",
  BANNED: "BANNED",
  DELETED: "DELETED",
};
/**
 * Entities status constants.
 */
export const ENTITY_STATUS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  DELETED: "DELETED",
  INACTIVE: "INACTIVE",
  DENIED: "DENIED",
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
};
/**
 * CDF Accreditation statuses
 *
 * @type {{IN_PROGRESS: string, NEW: string, COMPLETED: string, CANCELED: string}}
 */
export const CDF_STATUS = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
};
/**
 * CDF Activity Log types.
 *
 * @type {{RESULTS: string, OTHER: string, COMPLETED: string, PENDING: string, APPROVED: string}}
 */
export const CDF_LOG_TYPE = {
  PENDING: "ACTION_PENDING",
  COMPLETED: "ACTION_COMPLETED",
  APPROVED: "APPROVED",
  RESULTS: "RESULTS",
  OTHER: "OTHER",
  LAST: "LAST",
};
/**
 * CDF Questionnaire Population Types (API ENUMS)
 * @type {{PRESCHOOL: string, MATERNAL: string, INFANT: string}}
 */
export const CDF_POPULATION = {
  INFANT: "Infantes",
  MATERNAL: "Maternales",
  PRESCHOOL: "Preescolares",
};
export const LOG_ACTION_TYPES = {
  BASIC: "ACTION_BASIC",
  QUESTIONNAIRE: "ACTION_QUESTIONNAIRE",
  ATTACHMENT: "ACTION_ATTACHMENT",
  PLANNING: "ACTION_PLANNING",
  EVALUATION: "ACTION_EVALUATION",
};
/**
 * CDF Questionnaire colors
 * @type {{RELATIONS: string, ASPECTS: string, SUPERVISORS: string}}
 */
export const CDF_THEMES = {
  RELATIONS: {
    color: "bg-[#14A8A4]",
    code: "RELATIONS",
    name: "Relaciones",
  },
  ASPECTS: {
    color: "bg-[#A7D02A]",
    code: "ASPECTS",
    name: "Aspectos",
  },
  SUPERVISORS: {
    color: "bg-[#FF6673]",
    code: "SUPERVISORS",
    name: "Supervisores",
  },
};
/**
 * CDF Scorecards config (colors, size, etc) by Cardtype
 * @type {{THEMATIC_03: {}, THEMATIC_02: {}, THEMATIC_01: {}}}
 */
export const CDF_SCORE_CARDS_CONFIG = {
  THEMATIC_01: {
    theme: "RELATIONS",
    headerColor: "bg-[#b8e5e3]",
    baseCircleColor: "stroke-[#b8e5e3]",
    scoreCircleColor: "stroke-[#16afab]",
  },
  THEMATIC_02: {
    theme: "ASPECTS",
    headerColor: "bg-[#ffe4e4]",
    baseCircleColor: "stroke-[#ffe4e4]",
    scoreCircleColor: "stroke-[#ff6672]",
  },
  THEMATIC_03: {
    theme: "SUPERVISORS",
    headerColor: "bg-[#e5f1bf]",
    baseCircleColor: "stroke-[#e5f1bf]",
    scoreCircleColor: "stroke-[#a7d02b]",
  },
};
/**
 * CDF Score card definition configuration.
 * @type {{TITLE: string, SCORES_DEFINITIONS: [{color: string, name: string, description: string, range: string},{color: string, name: string, description: string, range: string},{color: string, name: string, description: string, range: string},{color: string, name: string, description: string, range: string}]}}
 */
export const CDF_SCORES_DEFINITIONS = {
  TITLE: "Significado de la puntuación obtenida",
  SCORES_DEFINITIONS: [
    {
      name: "Centro en Plan de Mejoramiento",
      description:
        "Representa que este es un Centro en Plan de Mejoramiento. Este Centro cumple con algunas de las prácticas recomendadas y estándares básicos. Puede que el Centro cumpla con algunas leyes, prácticas y reglamentaciones que se esperan para operar en Puerto Rico, pero es necesario atender otras áreas para establecer un estándar de calidad más elevado.",
      rangeText: "0% - 25%",
      range: "0-25",
      color: "#5c6f80",
    },
    {
      name: "Centro de Calidad Básica",
      description:
        "Representa que este es un Centro de Calidad Básica. Este Centro cumple con los estándares básicos de calidad y cumple con la mayoría de las leyes, prácticas apropiadas y reglamentaciones que se esperan para operar en Puerto Rico.",
      rangeText: "26% - 50%",
      range: "26-50",
      color: "#ff6673",
    },
    {
      name: "Centro de Calidad Intermedia",
      description:
        "Representa que es un Centro de Calidad Intermedia. Este Centro sobrepasa los estándares básicos de calidad y cumple con las leyes, prácticas apropiadas y reglamentaciones. Esta puntuación representa además que el Centro, realiza actividades, tareas y prácticas más allá de las requeridas. Por lo que está en vías de convertirse en un Centro del Futuro.",
      rangeText: "51% - 75%",
      range: "51-75",
      color: "#12a7a3",
    },
    {
      name: "Centro del Futuro",
      description:
        "Representa que este es un Centro del Futuro. Este Centro sobrepasa estándares de calidad, más allá de lo básico o requerido. Este Centro satisface cabalmente los requerimientos de calidad y cumple con las leyes, prácticas apropiadas y reglamentaciones.",
      rangeText: "76% - 100%",
      range: "76-100",
      color: "#a7d02a",
    },
  ],
};
export const LMS_BADGE_TYPES = {
  NEONATO: NEONATO,
  FUTURISTA: FUTURISTA,
  INFANTE: INFANTE,
  ANDARIN: ANDARIN,
  PREESCOLAR: PREESCOLAR,
  ESCOLAR: ESCOLAR,
  PROFESIONAL: PROFESIONAL,
};
/**
 * Alert types
 */
export const ALERT_TYPES = {
  INFO: "blue",
  WARNING: "yellow",
  SUCCESS: "green",
  DANGER: "red",
  SEVERITY_SUCCESS: "success",
  SEVERITY_WARNING: "warn",
  SEVERITY_ERROR: "error",
};
/**
 * Library content formats
 */
export const LIBRARY_CONTENT_FORMATS = {
  MANUALS: {
    type: "manuals",
    name: "Manuales Educativos",
    icon: "HiBookOpen",
    color: "rgb(31 205 111)",
  },
  BROCHURES: {
    type: "brochures",
    name: "Folletos",
    icon: "ImMap",
    color: "rgb(251 146 60)",
  },
  DOCUMENTS: {
    type: "documents",
    name: "Documentos",
    icon: "HiDocumentText",
    color: "rgb(3 105 161)",
  },
  VIDEOS: {
    type: "videos",
    name: "Videos",
    icon: "BsPlayFill",
    color: "rgb(233 105 161)",
  },
};
/**
 * Library content categories
 */
export const LIBRARY_CONTENT_CATEGORIES = {
  DEVELOPMENT: {
    type: "desarrollo",
    name: "Desarrollo",
  },
  EDUCATION: {
    type: "educacion",
    name: "Educación",
  },
  LEADERSHIP: {
    type: "liderazgo",
    name: "Liderazgo",
  },
  HEALTH: {
    type: "salud",
    name: "Salud",
  },
};
/**
 * Employee tutorial steps config.
 * @type {[{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string}]}
 */
export const EMPLOYEE_TUTORIAL_STEPS = [
  {
    target: "body",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST1_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST1_MSG}
      />
    ),
    placement: "center",
    locale: { skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-2",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST2_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST2_MSG}
      />
    ),
    placement: "bottom",
    locale: { skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-3",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST3_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST3_MSG}
      />
    ),
    placement: "top",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-4",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST4_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST4_MSG}
      />
    ),
    placement: "left",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-5",
    content: (
      <TutorialBasicCard
        title={STRINGS.GENERAL_TUTORIAL_ST5_TITLE}
        message={STRINGS.GENERAL_TUTORIAL_ST5_MSG}
      />
    ),
    placement: "left",
    locale: { back: "Volver", skip: "Saltar", last: "Finalizar" },
    disableBeacon: true,
  },
];
/**
 * Providers tutorial steps config.
 *
 * @type {[{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string}]}
 */
export const PROVIDERS_TUTORIAL_STEPS = [
  {
    target: "body",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST1_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST1_MSG}
      />
    ),
    placement: "center",
    locale: { next: "Continuar", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-2",
    content: (
      <TutorialBasicCard
        title={STRINGS.EMPLOYEE_TUTORIAL_ST2_TITLE}
        message={STRINGS.EMPLOYEE_TUTORIAL_ST2_MSG}
      />
    ),
    placement: "bottom",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-emp-step-3",
    content: (
      <TutorialBasicCard
        title={STRINGS.PROVIDER_TUTORIAL_ST3_TITLE}
        message={STRINGS.PROVIDER_TUTORIAL_ST3_MSG}
      />
    ),
    placement: "bottom",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-pro-step-4",
    content: (
      <TutorialBasicCard
        title={STRINGS.PROVIDER_TUTORIAL_ST4_TITLE}
        message={STRINGS.PROVIDER_TUTORIAL_ST4_MSG}
      />
    ),
    placement: "right",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-pro-step-5",
    content: (
      <TutorialBasicCard
        title={STRINGS.PROVIDER_TUTORIAL_ST5_TITLE}
        message={STRINGS.PROVIDER_TUTORIAL_ST5_MSG}
      />
    ),
    placement: "left",
    locale: { next: "Continuar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
  {
    target: ".acu-pro-step-6",
    content: (
      <TutorialBasicCard
        title={STRINGS.GENERAL_TUTORIAL_ST5_TITLE}
        message={STRINGS.GENERAL_TUTORIAL_ST5_MSG}
      />
    ),
    placement: "left",
    locale: { last: "Finalizar", back: "Volver", skip: "Saltar" },
    disableBeacon: true,
  },
];
/**
 * Employee tutorial steps config.
 * @type {[{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string},{placement: string, locale: {skip: string}, content: JSX.Element, target: string}]}
 */
export const CALENDAR_TUTORIAL_STEPS = [
  {
    target: "body",
    content: (
      <TutorialBasicCard
        title={STRINGS.CALENDAR_TUTORIAL_ST1_TITLE}
        message={STRINGS.CALENDAR_TUTORIAL_ST1_MSG}
      />
    ),
    placement: "center",
    locale: { skip: "Saltar" },
  },
  {
    target: ".acu-cal-step-2",
    content: (
      <TutorialBasicCard
        title={STRINGS.CALENDAR_TUTORIAL_ST2_TITLE}
        message={STRINGS.CALENDAR_TUTORIAL_ST2_MSG}
      />
    ),
    placement: "bottom",
    locale: { skip: "Saltar" },
  },
  {
    target: ".acu-cal-step-3",
    content: (
      <TutorialBasicCard
        title={STRINGS.CALENDAR_TUTORIAL_ST3_TITLE}
        message={STRINGS.CALENDAR_TUTORIAL_ST3_MSG}
      />
    ),
    placement: "top",
    locale: { skip: "Saltar" },
  },
  {
    target: ".acu-cal-step-4",
    content: (
      <TutorialBasicCard
        title={STRINGS.CALENDAR_TUTORIAL_ST4_TITLE}
        message={STRINGS.CALENDAR_TUTORIAL_ST4_MSG}
      />
    ),
    placement: "left",
    locale: { skip: "Saltar" },
  },
  {
    target: ".acu-cal-step-5",
    content: (
      <TutorialBasicCard
        title={STRINGS.GENERAL_TUTORIAL_ST5_TITLE}
        message={STRINGS.GENERAL_TUTORIAL_ST5_MSG}
      />
    ),
    placement: "left",
    locale: { skip: "Saltar" },
  },
];
/**
 * Available genders for selects
 *
 * @type {[{name: string, id: string},{name: string, id: string},{name: string, id: string},{name: string, id: string}]}
 */
export const GENDERS = [
  {
    id: "MALE",
    name: "Masculino",
  },
  {
    id: "FEMALE",
    name: "Femenino",
  },
  {
    id: "UNSPECIFIED",
    name: "Otro",
  },
  {
    id: "NOT_ANSWER",
    name: "Prefiero no contestar",
  },
];
/**
 * Documents requeridos solicitud becas empleados
 */
export const DOCUMENTS = [
  {
    text: "Guías de ACCESA",
    url: guiaAccesa,
    name: "GuíasDeACCESA.pdf",
  },
  {
    text: "Lista de Documentos requeridos",
    url: listaDocumentos,
    name: "ListaDeDocumentoRequeridos.pdf",
  },
  {
    text: "Certificación de Empleo",
    url: certificadosEmpleado,
    name: "CertificacionEmpleadoAccesa.pdf",
  },
  {
    text: "Certificación de Asistencia Económica",
    url: certificadosAsistencia,
    name: "CertificacionDeAsistenciaEconomica.pdf",
  },
  {
    text: "FORMA SC 730 del Departamento de Hacienda",
    url: forma_SC730,
    name: "FORMA_SC730.pdf",
  },
];
/**
 * Documents requeridos solicitud becas proveedores
 */
export const DOCUMENTS_SUPPLIER = [
  {
    text: "Guía Instrumento de Medición Centros del Futuro",
    url: guiaCentrosDelFuturo,
    name: "Guía_Instrumento_de_Medición_Centros_del_Futuro.pdf",
  },
  {
    text: "Definiciones de términos operacionales",
    url: definicionTerminos,
    name: "Definiciones_de_términos_operacionales.pdf",
  },
  {
    text: "Puntuaciones obtenidas del Instrumento de Medición Centros del Futuro",
    url: puntuacionInstrumentoMedicionCentros,
    name: "Puntuaciones_obtenidas_del_Instrumento_de_Medición_Centros_del_Futuro.pdf",
  },
];
/**
 * Documents requeridos para solicitud
 */
export const TITLE_DOCUMENTS = [
  {
    name: "1. ID del solicitante*",
  },
  {
    name: "2. Evidencia de cuenta bancaria*",
  },
  {
    name: "3. Evidencia de matrícula*",
  },
  {
    name: "4. Certificación de Asistencia Económica para Estudios*",
  },
  {
    name: "5. Evidencia de Beca o Asistencia Económica (si aplica)*",
  },
  {
    name: "6. Evidencia de préstamo estudiantil (si aplica)*",
  },
  {
    name: "7. Certificación de Empleado*",
  },
  {
    name: "8. Copia de la Licencia del proveedor expedida por el Departamento de la Familia*",
  },
  {
    name: "9. Certificación Negativa de ASUME*",
  },
  {
    name: "10. Certificado de Radicación de Planillas (Dpto. Hacienda)*",
  },
  {
    name: "11. Certificado de No Deuda (Dpto. Hacienda)*",
  },
  {
    name: "12. Certificado de No Deuda del CRIM (todos los conceptos)*",
  },
  {
    name: "13. Certificado de Buena Conducta*",
  },
  {
    name: "14. Forma SC 730 *",
  },
];
/**
 * Meses
 */
export const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**

 * Academic degree

 */

export const ACADEMIC_DEGREE = [
  { default: "", name: "Selecciona una opción" },

  { default: "Grado Técnico", name: "Grado Técnico" },

  { default: "Grado Asociado", name: "Grado Asociado" },

  { default: "Bachillerato", name: "Bachillerato" },

  { default: "Maestría", name: "Maestría" },

  { default: "Maestría", name: "Maestría" },
];

export const ACADEMIC_PERIOD = [
  {
    default: "",

    name: "Selecciona una opción",
  },

  {
    default: "SEMESTRE",

    name: "SEMESTRE",
  },

  {
    default: "TRIMESTRE",

    name: "TRIMESTRE",
  },
];

/**
 * Option select true or false.
 */
export const HAS_OPTION_TRUE_OR_FALSE = [
  {
    default: "",
    name: "Selecciona una opción",
  },
  {
    default: true,
    name: "Sí",
  },
  {
    default: false,
    name: "No",
  },
];
/**
 * Option select Close or Open.
 */
export const OPTION_CLOSE_OPEN = [
  {
    default: "",
    name: "Selecciona una opción",
  },
  {
    default: "Abierto",
    name: "Abierto",
  },
  {
    default: "Cerrado Temporalmente",
    name: "Cerrado Temporalmente",
  },
  {
    default: "Cerrado Permanentemente",
    name: "Cerrado Permanentemente",
  },
];
/**
 * Option select type entity.
 */
export const OPTION_TYPE_ENTITY = [
  {
    default: "",
    name: "Selecciona una opción",
  },
  {
    default: "Corporación Con Fines de Lucro",
    name: "Corporación Con Fines de Lucro",
  },
  {
    default: "Corporación Sin Fines de Lucro",
    name: "Corporación Sin Fines de Lucro",
  },
  {
    default: "Municipio o Instrumentalidad Pública",
    name: "Municipio o Instrumentalidad Pública",
  },
  {
    default: "DBA",
    name: "DBA",
  },
];
/**
 * Option select type entity.
 */
export const OPTION_TYPE_AGENCY_OR_CITY = [
  {
    default: "",
    name: "Selecciona una opción",
  },
  {
    default: "Agencia",
    name: "Agencia",
  },
  {
    default: "Municipio",
    name: "Municipio",
  },
];
/**
 * Option select finanaciamiento centro.
 */
export const OPTION_CENTER_FINANCING = [
  {
    name: "Fondos privados",
  },
  {
    name: "Head Start",
  },
  {
    name: "Early Head Start",
  },
  {
    name: "Child Care",
  },
  {
    name: "Departamiento de Educación",
  },
];
/**
 * Option select finanaciamiento centro.
 */

export const OPTION_CENTER_FUTURE_HOURS_OF_SERVICES = [
  {
    name: "Tiempo completo (6 horas o más al día)",
  },
  {
    name: "Tiempo parcial (menos de 6 horas al día)",
  },
  {
    name: "Días feriados",
  },
  {
    name: "Horario nocturno (después de las 6:00 p.m.)",
  },
  {
    name: "Fines de semana",
  },
];

/**
 * Option select finnaciamiento centro.
 */

export const OPTION_CENTER_FUTURE_DAYS_SERVICES = [
  {
    name: "Lunes",
  },
  {
    name: "Martes",
  },
  {
    name: "Miércoles",
  },
  {
    name: "Jueves",
  },
  {
    name: "Viernes",
  },
  {
    name: "Sabado",
  },
  {
    name: "Domingo",
  },
];
/**
 * Option select poblacion centros del futuro.
 */

export const OPTION_CENTER_FUTURE_POPULATION = [
  {
    name: "Infantes",
  },
  {
    name: "Maternales",
  },
  {
    name: "Preescolares",
  },
];
/**
 * Option select patios centros del futuro.
 */

export const OPTION_CENTER_FUTURE_YARD = [
  {
    name: "Patio exterior",
  },
  {
    name: "Patio interior",
  },
  {
    name: "No cuenta con patio",
  },
];
/**
 * Option select acreditaciones centros del futuro.
 */

export const OPTION_CENTER_FUTURE_ACCREDITATIONS = [
  {
    name: "NAEYC",
  },
  {
    name: "Departamento de la Familia",
  },
  {
    name: "Consejo General de Educación",
  },
  {
    name: "Certificación Proveedor elegible de Child Care",
  },
  {
    name: "Otra (Especifique)",
  },
];
/**
 * Option select relacion de centros del futuro y accuden.
 */

export const OPTION_CENTER_FUTURE_CENTER_RATIO = [
  {
    name: "Centro participante Programa Vales",
  },
  {
    name: "Contrato delegación de fondos",
  },
  {
    name: "Centro administrado",
  },
  {
    name: "Otra (Especifique)",
  },
  {
    name: "Ninguna",
  },
];

/**
 * Option select relacion de centros del futuro y accuden.
 */

export const OPTION_ACADEMIC_PREPARATION = [
  {
    default: "",
    name: "Selecciona una opcion",
  },
  {
    default: "Certificado profesional",
    name: "Certificado profesional",
  },
  {
    default: "CDA (Certificado de Asociado en Desarrollo Profesional)",
    name: "CDA (Certificado de Asociado en Desarrollo Profesional)",
  },
  {
    default: "Grado Asociado",
    name: "Grado Asociado",
  },
  {
    default: "Bachillerato",
    name: "Bachillerato",
  },
  {
    default: "Maestría",
    name: "Maestría",
  },
  {
    default: "Doctorado",
    name: "Doctorado",
  },
  {
    default: "Otro (Especifique)",
    name: "Otro (Especifique)",
  },
];

/**
 * Towns
 */
export const TOWNS = {
  TOWNS_JSON: [
    {
      id: 1,
      name: "Adjuntas",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Aguada",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Aguadilla",
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Aguas Buenas",
      status: "ACTIVE",
    },
    {
      id: 5,
      name: "Aibonito",
      status: "ACTIVE",
    },
    {
      id: 6,
      name: "Añasco",
      status: "ACTIVE",
    },
    {
      id: 7,
      name: "Arecibo",
      status: "ACTIVE",
    },
    {
      id: 8,
      name: "Arroyo",
      status: "ACTIVE",
    },
    {
      id: 9,
      name: "Barceloneta",
      status: "ACTIVE",
    },
    {
      id: 10,
      name: "Barranquitas",
      status: "ACTIVE",
    },
    {
      id: 11,
      name: "Bayamón",
      status: "ACTIVE",
    },
    {
      id: 12,
      name: "Cabo Rojo",
      status: "ACTIVE",
    },
    {
      id: 13,
      name: "Caguas",
      status: "ACTIVE",
    },
    {
      id: 14,
      name: "Camuy",
      status: "ACTIVE",
    },
    {
      id: 15,
      name: "Canóvanas",
      status: "ACTIVE",
    },
    {
      id: 16,
      name: "Carolina",
      status: "ACTIVE",
    },
    {
      id: 17,
      name: "Cataño",
      status: "ACTIVE",
    },
    {
      id: 18,
      name: "Cayey",
      status: "ACTIVE",
    },
    {
      id: 19,
      name: "Ceiba",
      status: "ACTIVE",
    },
    {
      id: 20,
      name: "Ciales",
      status: "ACTIVE",
    },
    {
      id: 21,
      name: "Cidra",
      status: "ACTIVE",
    },
    {
      id: 22,
      name: "Coamo",
      status: "ACTIVE",
    },
    {
      id: 23,
      name: "Comerío",
      status: "ACTIVE",
    },
    {
      id: 24,
      name: "Corozal",
      status: "ACTIVE",
    },
    {
      id: 25,
      name: "Culebra",
      status: "ACTIVE",
    },
    {
      id: 26,
      name: "Dorado",
      status: "ACTIVE",
    },
    {
      id: 27,
      name: "Fajardo",
      status: "ACTIVE",
    },
    {
      id: 28,
      name: "Florida",
      status: "ACTIVE",
    },
    {
      id: 29,
      name: "Guánica",
      status: "ACTIVE",
    },
    {
      id: 30,
      name: "Guayama",
      status: "ACTIVE",
    },
    {
      id: 31,
      name: "Guayanilla",
      status: "ACTIVE",
    },
    {
      id: 32,
      name: "Guaynabo",
      status: "ACTIVE",
    },
    {
      id: 33,
      name: "Gurabo",
      status: "ACTIVE",
    },
    {
      id: 34,
      name: "Hatillo",
      status: "ACTIVE",
    },
    {
      id: 35,
      name: "Hormigueros",
      status: "ACTIVE",
    },
    {
      id: 36,
      name: "Humacao",
      status: "ACTIVE",
    },
    {
      id: 37,
      name: "Isabela",
      status: "ACTIVE",
    },
    {
      id: 38,
      name: "Jayuya",
      status: "ACTIVE",
    },
    {
      id: 39,
      name: "Juana Díaz",
      status: "ACTIVE",
    },
    {
      id: 40,
      name: "Juncos",
      status: "ACTIVE",
    },
    {
      id: 41,
      name: "Lajas",
      status: "ACTIVE",
    },
    {
      id: 42,
      name: "Lares",
      status: "ACTIVE",
    },
    {
      id: 43,
      name: "Las Marías",
      status: "ACTIVE",
    },
    {
      id: 44,
      name: "Las Piedras",
      status: "ACTIVE",
    },
    {
      id: 45,
      name: "Loíza",
      status: "ACTIVE",
    },
    {
      id: 46,
      name: "Luquillo",
      status: "ACTIVE",
    },
    {
      id: 47,
      name: "Manatí",
      status: "ACTIVE",
    },
    {
      id: 48,
      name: "Maricao",
      status: "ACTIVE",
    },
    {
      id: 49,
      name: "Maunabo",
      status: "ACTIVE",
    },
    {
      id: 50,
      name: "Mayagüez",
      status: "ACTIVE",
    },
    {
      id: 51,
      name: "Moca",
      status: "ACTIVE",
    },
    {
      id: 52,
      name: "Morovis",
      status: "ACTIVE",
    },
    {
      id: 53,
      name: "Naguabo",
      status: "ACTIVE",
    },
    {
      id: 54,
      name: "Naranjito",
      status: "ACTIVE",
    },
    {
      id: 55,
      name: "Orocovis",
      status: "ACTIVE",
    },
    {
      id: 56,
      name: "Patillas",
      status: "ACTIVE",
    },
    {
      id: 57,
      name: "Peñuelas",
      status: "ACTIVE",
    },
    {
      id: 58,
      name: "Ponce",
      status: "ACTIVE",
    },
    {
      id: 59,
      name: "Quebradillas",
      status: "ACTIVE",
    },
    {
      id: 60,
      name: "Rincón",
      status: "ACTIVE",
    },
    {
      id: 61,
      name: "Río Grande",
      status: "ACTIVE",
    },
    {
      id: 62,
      name: "Sabana Grande",
      status: "ACTIVE",
    },
    {
      id: 63,
      name: "Salinas",
      status: "ACTIVE",
    },
    {
      id: 64,
      name: "San Germán",
      status: "ACTIVE",
    },
    {
      id: 65,
      name: "San Juan",
      status: "ACTIVE",
    },
    {
      id: 66,
      name: "San Lorenzo",
      status: "ACTIVE",
    },
    {
      id: 67,
      name: "San Sebastián",
      status: "ACTIVE",
    },
    {
      id: 68,
      name: "Santa Isabel",
      status: "ACTIVE",
    },
    {
      id: 69,
      name: "Toa Alta",
      status: "ACTIVE",
    },
    {
      id: 70,
      name: "Toa Baja",
      status: "ACTIVE",
    },
    {
      id: 71,
      name: "Trujillo Alto",
      status: "ACTIVE",
    },
    {
      id: 72,
      name: "Utuado",
      status: "ACTIVE",
    },
    {
      id: 73,
      name: "Vega Alta",
      status: "ACTIVE",
    },
    {
      id: 74,
      name: "Vega Baja",
      status: "ACTIVE",
    },
    {
      id: 75,
      name: "Vieques",
      status: "ACTIVE",
    },
    {
      id: 76,
      name: "Villalba",
      status: "ACTIVE",
    },
    {
      id: 77,
      name: "Yabucoa",
      status: "ACTIVE",
    },
    {
      id: 78,
      name: "Yauco",
      status: "ACTIVE",
    },
  ],
};

export const GRADE_CERTIFICATES = [
  { id: "certificate", name: "Certificado Profesional" },
  {
    id: "CDA",
    name: "CDA (Certificado de Asociado en Desarrollo Profesional)",
  },
  { id: "asociado", name: "Grado Asociado" },
  { id: "bachillerato", name: "Bachillerato" },
  { id: "maestria", name: "Maestria" },
  { id: "doctorado", name: "Doctorado" },
  { id: "other", name: "Otro (Especifique)" },
];

export const MONTHS = [
  { id: "01", name: "Enero" },
  { id: "02", name: "Febrero" },
  { id: "03", name: "Marzo" },
  { id: "04", name: "Abril" },
  { id: "05", name: "Mayo" },
  { id: "06", name: "Junio" },
  { id: "07", name: "Julio" },
  { id: "08", name: "Agosto" },
  { id: "09", name: "Septiembre" },
  { id: "10", name: "Octubre" },
  { id: "11", name: "Noviembre" },
  { id: "12", name: "Diciembre" },
];

/**
 * Available Temporarily Closed options for selects
 *
 * @type {[{name: string, id: boolean},{name: string, id: boolean}]}
 */
export const CENTER_CLOSED_OPTIONS = [
  {
    id: false,
    name: "No",
  },
  {
    id: true,
    name: "Yes",
  },
];

/**
 * Option select finanaciamiento centro.
 */

export const BASIC_INFORMATION_ABOUT_CENTER =
  "A continuación, se le presentará una serie de declaraciones relacionadas al perfil de su Centro. Comprende la recopilación de datos generales y características del Centro y el personal que labora en el mismo. <br/> <br/> Algunos reactivos le solicitarán completar la información, si dicha información no aplica, coloque un “N/A” (recomendamos no dejar espacios en blanco). Por favor utilice los espacios provistos o seleccione las opciones presentadas para contestar las declaraciones. Su evaluación debe ser adecuada y conforme a las prácticas del Centro.";

export const POBLATION_CHILDREN = [
  {
    default: "",
    name: "Infantes",
  },

  {
    default: "",
    name: "Maternales",
  },

  {
    default: "",
    name: "Preescolares",
  },
];

/**
 * defaultSchedule- provider working hours json format
 */
export const defaultSchedule = {
  Lunes: {
    desde: "",
    hasta: "",
  },
  Martes: {
    desde: "",
    hasta: "",
  },
  Miércoles: {
    desde: "",
    hasta: "",
  },
  Jueves: {
    desde: "",
    hasta: "",
  },
  Viernes: {
    desde: "",
    hasta: "",
  },
  Sábado: {
    desde: "",
    hasta: "",
  },
  Domingo: {
    desde: "",
    hasta: "",
  },
};

/**
 * availableProviderHours - Available timeslots
 */
export const availableProviderHours = [
  { id: "7:00 am", name: "7:00 am" },
  { id: "7:15 am", name: "7:15 am" },
  {
    id: "7:30 am",
    name: "7:30 am",
  },
  { id: "7:45 am", name: "7:45 am" },
  { id: "8:00 am", name: "8:00 am" },
  { id: "8:15 am", name: "8:15 am" },
  {
    id: "8:30 am",
    name: "8:30 am",
  },
  { id: "8:45 am", name: "8:45 am" },
  { id: "9:00 am", name: "9:00 am" },
  { id: "9:15 am", name: "9:15 am" },
  {
    id: "9:30 am",
    name: "9:30 am",
  },
  { id: "9:45 am", name: "9:45 am" },
  { id: "10:00 am", name: "10:00 am" },
  { id: "10:15 am", name: "10:15 am" },
  {
    id: "10:30 am",
    name: "10:30 am",
  },
  { id: "10:45 am", name: "10:45 am" },
  { id: "11:00 am", name: "11:00 am" },
  { id: "11:15 am", name: "11:15 am" },
  {
    id: "11:30 am",
    name: "11:30 am",
  },
  { id: "11:45 am", name: "11:45 am" },
  { id: "12:00 pm", name: "12:00 pm" },
  { id: "12:15 pm", name: "12:15 pm" },
  {
    id: "12:30 pm",
    name: "12:30 pm",
  },
  { id: "12:45 pm", name: "12:45 pm" },
  { id: "1:00 pm", name: "1:00 pm" },
  { id: "1:15 pm", name: "1:15 pm" },
  {
    id: "1:30 pm",
    name: "1:30 pm",
  },
  { id: "1:45 pm", name: "1:45 pm" },
  { id: "2:00 pm", name: "2:00 pm" },
  { id: "2:15 pm", name: "2:15 pm" },
  {
    id: "2:30 pm",
    name: "2:30 pm",
  },
  { id: "2:45 pm", name: "2:45 pm" },
  { id: "3:00 pm", name: "3:00 pm" },
  { id: "3:15 pm", name: "3:15 pm" },
  {
    id: "3:30 pm",
    name: "3:30 pm",
  },
  { id: "3:45 pm", name: "3:45 pm" },
  { id: "4:00 pm", name: "4:00 pm" },
  { id: "4:15 pm", name: "4:15 pm" },
  {
    id: "4:30 pm",
    name: "4:30 pm",
  },
  { id: "4:45 pm", name: "4:45 pm" },
  { id: "5:00 pm", name: "5:00 pm" },
  { id: "5:15 pm", name: "5:15 pm" },
  {
    id: "5:30 pm",
    name: "5:30 pm",
  },
  { id: "5:45 pm", name: "5:45 pm" },
  { id: "6:00 pm", name: "6:00 pm" },
  { id: "6:15 pm", name: "6:15 pm" },
  {
    id: "6:30 pm",
    name: "6:30 pm",
  },
  { id: "6:45 pm", name: "6:45 pm" },
  { id: "7:00 pm", name: "7:00 pm" },
  { id: "7:15 pm", name: "7:15 pm" },
  {
    id: "7:30 pm",
    name: "7:30 pm",
  },
  { id: "7:45 pm", name: "7:45 pm" },
  { id: "8:00 pm", name: "8:00 pm" },
  { id: "8:15 pm", name: "8:15 pm" },
  {
    id: "8:30 pm",
    name: "8:30 pm",
  },
  { id: "8:45 pm", name: "8:45 pm" },
  { id: "9:00 pm", name: "9:00 pm" },
  { id: "9:15 pm", name: "9:15 pm" },
  {
    id: "9:30 pm",
    name: "9:30 pm",
  },
  { id: "9:45 pm", name: "9:45 pm" },
  { id: "10:00 pm", name: "10:00 pm" },
  { id: "10:15 pm", name: "10:15 pm" },
  {
    id: "10:30 pm",
    name: "10:30 pm",
  },
  { id: "10:45 pm", name: "10:45 pm" },
];

/**
 * extensions / Mime types dictionary
 */
export const MIME_TYPES = {
  // Images
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",

  // Video
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".avi": "video/x-msvideo",
  ".mpeg": "video/mpeg",
  ".mov": "video/quicktime",
  ".mkv": "video/x-matroska",

  // Documents
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".txt": "text/plain",
};
