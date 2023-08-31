import { TabPanel, TabView } from "primereact/tabview";
import React from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaAward, FaGraduationCap } from "react-icons/fa";
import Navbar from "../components/General/Navbar";

const coverPhoto =
  "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80";
const profilePhoto =
  "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

const PersonalProfile = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div className="w-full bg-white">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto p-3">
        <section>
          <div
            style={{ backgroundImage: `url(${coverPhoto})` }}
            className={`h-60 w-full rounded-lg relative bg-cover bg-center`}
          >
            <div className="h-32 w-32 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 translate-y-10 border-white border-[4px] overflow-hidden">
              <img
                src={profilePhoto}
                alt={"profilePhoto"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-5 pt-10">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-6">
            <div className="col-span-2 flex flex-col gap-8">
              <div className="p-3">
                <h1 className="text-3xl font-semibold text-cyan-900">
                  Milagros Soto Rivera
                </h1>
                <p className="text-lg font-semibold text-cyan-900 mb-2">
                  Cuidadora en Bright Beginnings
                </p>
                <p>
                  Bright Beginnings Day Care and Learning Acedemy. oferce cuido
                  para ninos desde 2 meses hasta los 4 anos y 11 meses.
                </p>
              </div>
              <div className="p-3 py-6 shadow-small rounded-lg flex flex-col gap-3 mb-2">
                <div className="flex flex-row items-center justify-between">
                  <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                    <FaGraduationCap size={28} /> Education
                  </h1>
                  <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold">
                    Manejar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 p-2 rounded-md shadow-small">
                    <p>2014</p>
                    <div className="px-2 bg-yellow-500 bg-opacity-40 w-fit text-sm rounded-sm py-1">
                      Bachillerato
                    </div>
                    <h2 className="font-semibold">Pedagogia</h2>
                    <p>Universidad de Perto Rico Recinto de Rio Piedras </p>
                    <div className="flex flex-row gap-2 item-center">
                      <FaAward className="text-green-500" size={24} />
                      <p>Ver Diploma</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-2 rounded-md shadow-small">
                    <p>2014</p>
                    <div className="px-2 bg-yellow-500 bg-opacity-40 w-fit text-sm rounded-sm py-1">
                      Bachillerato
                    </div>
                    <h2 className="font-semibold">Pedagogia</h2>
                    <p>Universidad de Perto Rico Recinto de Rio Piedras </p>
                    <div className="flex flex-row gap-2 item-center">
                      <FaAward className="text-green-500" size={24} />
                      <p>Ver Diploma</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 py-6 shadow-small rounded-lg flex flex-col gap-3 mb-2">
                <div className="flex flex-row items-center justify-between">
                  <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                    <BsFillBriefcaseFill size={28} /> Experiencia Laboral
                  </h1>
                  <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold">
                    Manejar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 p-2 rounded-md shadow-small">
                    <p>2018 - Present</p>
                    <div className="px-2 bg-emerald-500 bg-opacity-40 w-fit text-sm rounded-sm py-1">
                      Bright Beginnings
                    </div>
                    <h2 className="font-semibold">Mastera Edad temprana</h2>
                    <p className="mb-1">
                      Sunt ut in in officia aute reprehenderit commodo cupidatat
                      labore duis exercitation.
                    </p>
                    <p className="mb-1">
                      Sunt ut in in officia aute reprehenderit commodo cupidatat
                      labore duis exercitation.
                    </p>
                    <p className="mb-1">
                      Sunt ut in in officia aute reprehenderit commodo cupidatat
                      labore duis exercitation.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-2 rounded-md shadow-small">
                    <p>2018 - Present</p>
                    <div className="px-2 bg-emerald-500 bg-opacity-40 w-fit text-sm rounded-sm py-1">
                      Bright Beginnings
                    </div>
                    <h2 className="font-semibold">Mastera Edad temprana</h2>
                    <p className="mb-1">
                      Sunt ut in in officia aute reprehenderit commodo cupidatat
                      labore duis exercitation.
                    </p>
                    <p className="mb-1">
                      Sunt ut in in officia aute reprehenderit commodo cupidatat
                      labore duis exercitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col gap-8 pt-4">
              <div className="flex flex-col gap-3 bg-cyan-900 bg-opacity-10 p-3 rounded-lg h-[450px] overflow-hidden">
                <div className="flex flex-row items-center justify-between">
                  <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                    Cursos
                  </h1>
                  <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900">
                    Ir a Cursos
                  </button>
                </div>

                <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
                  {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md flex flex-row items-stretch p-3 gap-2"
                    >
                      <div className="w-20 h-full bg-emerald-600 rounded-sm"></div>
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold">asodasldknaskdlkasd</h1>
                        <div className="flex flex-row gap-1 item-center ">
                          <FaAward className="text-green-500" size={16} />
                          <p className="text-sm">Ver Diploma</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 bg-cyan-900 bg-opacity-10 p-3 rounded-lg h-[450px] overflow-hidden">
                <div className="flex flex-row items-center justify-between">
                  <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                    Certificaciones
                  </h1>
                  <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900">
                    Manejar
                  </button>
                </div>

                <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
                  {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md flex flex-row items-stretch p-3 gap-2"
                    >
                      <div className="w-20 h-full bg-emerald-600 rounded-sm overflow-hidden">
                        <img
                          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/certificate-of-achievement-diploma-template-design-fc77c666f2fb3293c5af6b0b4c179986_screen.jpg?ts=1611078470"
                          alt="certificate"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold">
                          Titulo del certificado
                        </h1>
                        <p className="text-sm">Entidad</p>
                        <p className="text-sm">Anim officia velit venia</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PersonalProfile;
