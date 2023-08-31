import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import FormTitle from '../../../components/Form/FormTitle';
import { PORTAL_ROUTES, STRINGS } from '../../../config/config';
import { scrollToTop } from '../../../components/utils';
/**
 * Benefits
 *
 * Esta view representa los beneficios obtenidos para realiar
 * la solicitud de beca de un empleado 
 *
 */
function Benefits() {
  // USE
  const navigate = useNavigate();
  /**
   *Funcion que permite volver a la pagina anterior
   *
   */
  function handleBack() {
    navigate(PORTAL_ROUTES.DOCUMENT_REQUIRED);
  }
  /**
   *Funcion que permite ir a la pagina de termminos y condiciones
   *
   */
  function handleNext(e){
    e.preventDefault();
    navigate(PORTAL_ROUTES.TERMS_CONDITIONS);
  }
  /**
   *Funcion que permite supervisar la navegacion
   *
   */
   useEffect(() => {
    scrollToTop();
  }, [navigate]);

  // RENDER
  return (
    <>
      <Link to='/'>
        <div className='flex flex-row justify-start items-center p-4 ml-4 '>
          <ArrowLeftIcon className='acu-blue w-6 mt-1' />
          <h4 className='exit-text ml-1'>| {STRINGS.BUTTON_EXIT}</h4>
        </div>
      </Link>
      <FormTitle
        mainTitle='Duplicación de Beneficios'
        style='font-bold text-2xl mt-2'
        secondTitle=''
        subTitle='Certifico que he leido, entiendo y acepto la Política de Duplicación de Beneficios dispuesta en la Guía del Programa ACCESA. <br/> <br/> Certifico además que, no he recibido ni solicitado asistencia financiera de otros programas o fuentes de fondos federales, estatales o locales para cubrir los gastos que me dispongo a cubrir con los fondos que pudiera obtener del Programa ACCESA de la ACUDEN. Que en caso de recibir asistencia de cualquier otro programa o fuente de fondos federales, estatales o locales, dicha asistencia no sería utilizada para cubrir los mismo gastos que estaré cubriendo con los fondos que podría recibir del Programa ACCESA de la ACUDEN. Que entiendo y acepto que, de incurrir en una duplicación de beneficios, vendré obligado a devolver o restituir a la ACUDEN la ayuda recibida.'
        children=''
        url='true'
      />
      <div className='flex flex-col  w-full items-center justify-center mt-8 mb-8'>
        <div className='flex flex-col items-center w-full max-w-xs gap-3'>
          <div className='w-full flex flex-col gap-3'>
            <div className='flex md:flex-row flex-col gap-6'>
              <button
                className='form-btn-outline'
                type='button'
                onClick={handleBack}>
                {STRINGS.BUTTON_BACK}
              </button>
              <button className='form-btn' type='button' onClick={handleNext}>
               {STRINGS.BUTTON_CONTINUE_ACCEPT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Benefits;
