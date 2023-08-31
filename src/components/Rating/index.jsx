import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
export const Rating = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className='flex flex-row gap-2 items-center font-semibold'>
        <BsFillInfoCircleFill
          className='text-cyan-900 acu-emp-step-6'
          size={22}
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal ? (
        <>
          <div className='justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div
              className='my-6'
              style={{
                width: '50%',
                minWidth: '350px',
                maxHeight: '500px',
              }}>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-center justify-between mx-6 mt-6'>
                  <span className='text-xs md:text-lg font-medium mt-1'>
                    Puntuación de Calidad: Centros del Futuro
                  </span>
                  <button
                    className='border-0 text-[#092C4C] text-3xl'
                    onClick={() => setShowModal(false)}>
                    x
                  </button>
                </div>
                {/*body*/}
                <div className='px-6 border-b border-solid border-slate-200'>
                  <div className='p-3 border-b-[1px] border-[#002F56]'>
                    <div className='flex items-center gap-0 md:gap-8'>
                      <div className='flex flex-row items-center justify-items-center content-center gap-1 md:gap-8'>
                        <div>
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 512 512'
                            className='text-[#5C6F80] md:w-14 md:h-14'
                            height='20'
                            width='20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                          </svg>
                        </div>
                        <div className='text-[15px] lg:text-[29px] font-semibold'>
                          &ensp;0% - 25%&ensp;
                        </div>
                      </div>
                      <div className='flex-1'>
                        <p className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white'>
                          Centro en Plan de Mejoramiento
                        </p>
                        <br />
                        <p className='text-[10px] md:text-sm text-gray-500  dark:text-gray-400'>
                          Centro en Plan de Mejoramiento Representa que
                          este es un Centro en Plan de Mejoramiento. Este
                          Centro cumple con algunas de las prácticas
                          recomendadas y estándares básicos. Puede que el
                          Centro cumpla con algunas leyes, prácticas y
                          reglamentaciones que se esperan para operar en
                          Puerto Rico, pero es necesario atender otras
                          áreas para establecer un estándar de calidad más
                          elevado.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='p-3 border-b-[1px] border-[#002F56]'>
                    <div className='flex items-center gap-0 md:gap-8'>
                      <div className='flex flex-row items-center justify-items-center content-center gap-1 md:gap-8'>
                        <div>
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 512 512'
                            className='text-[#FF6673] md:w-14 md:h-14'
                            height='20'
                            width='20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                          </svg>
                        </div>
                        <div className='text-[15px] lg:text-[29px] font-semibold'>
                          26% - 50%&ensp;
                        </div>
                      </div>
                      <div className='flex-1'>
                        <p className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white'>
                          Centro de Calidad Básica
                        </p>
                        <br />
                        <p className='text-[10px] md:text-sm text-gray-500  dark:text-gray-400'>
                          Centro de Calidad Básica Representa que este es
                          un Centro de Calidad Básica. Este Centro cumple
                          con los estándares básicos de calidad y cumple
                          con la mayoría de las leyes, prácticas apropiadas
                          y reglamentaciones que se esperan para operar en
                          Puerto Rico.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='p-3 border-b-[1px] border-[#002F56]'>
                    <div className='flex items-center gap-0 md:gap-8'>
                      <div className='flex flex-row items-center justify-items-center content-center gap-1 md:gap-8'>
                        <div>
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 512 512'
                            className='text-[#12A7A3] md:w-14 md:h-14'
                            height='20'
                            width='20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                          </svg>
                        </div>
                        <div className='text-[15px] lg:text-[29px] font-semibold'>
                          51% - 75%&ensp;
                        </div>
                      </div>
                      <div className='flex-1'>
                        <p className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white'>
                          Centro de Calidad Intermedia
                        </p>
                        <br />
                        <p className='text-[10px] md:text-sm text-gray-500  dark:text-gray-400'>
                          Representa que es un Centro de Calidad
                          Intermedia. Este Centro sobrepasa los estándares
                          básicos de calidad y cumple con las leyes,
                          prácticas apropiadas y reglamentaciones. Esta
                          puntuación representa además que el Centro,
                          realiza actividades, tareas y prácticas más allá
                          de las requeridas. Por lo que está en vías de
                          convertirse en un Centro del Futuro.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='p-3'>
                    <div className='flex items-center gap-0 md:gap-8'>
                      <div className='flex flex-row items-center justify-items-center content-center gap-1 md:gap-8'>
                        <div>
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 512 512'
                            className='text-[#A7D02A] md:w-14 md:h-14'
                            height='20'
                            width='20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                          </svg>
                        </div>
                        <div className='text-[15px] lg:text-[29px] font-semibold'>
                          76% - 100%
                        </div>
                      </div>
                      <div className='flex-1'>
                        <p className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white'>
                          Centro del Futuro
                        </p>
                        <br />
                        <p className='text-[10px] md:text-sm text-gray-500  dark:text-gray-400'>
                          Representa que este es un Centro del Futuro. Este
                          Centro sobrepasa estándares de calidad, más allá
                          de lo básico o requerido. Este Centro satisface
                          cabalmente los requerimientos de calidad y cumple
                          con las leyes, prácticas apropiadas y
                          reglamentaciones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className='opacity-25 fixed inset-0 z-40 bg-black'
            onClick={() => setShowModal(false)}></div>
        </>
      ) : null}
    </>
  );
};
