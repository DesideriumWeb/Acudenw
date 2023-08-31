import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { BsClockFill, BsFillBriefcaseFill, BsTrophyFill } from "react-icons/bs";
import { FaAward, FaGraduationCap } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
import { CiCompass1 } from "react-icons/ci";
import { TabPanel, TabView } from "primereact/tabview";
import Navbar from "../components/General/Navbar";

const coverPhoto =
  "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=90";
const profilePhoto =
  "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

const ServiceProfile = () => {
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
        <section className="py-5 pt-12">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            <div className="col-span-1 flex flex-col gap-2 p-3">
              <h1 className="text-3xl font-semibold text-cyan-900">
                Bright Beginnings
              </h1>
              <div className="flex flex-row gap-3 items-start mt-2">
                <p className="text-lg font-semibold text-cyan-900 mb-2">
                  Centro de cuido
                </p>
                <div className="flex flex-row gap-1 items-end">
                  <BsTrophyFill className="text-yellow-500" size={20} />
                  <p className="font-semibold">9.5</p>
                </div>
              </div>
              <div className="pt-4">
                <h1 className="font-semibold text-cyan-900 mb-3">Contacto</h1>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <AiFillPhone className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                    <p className="text-cyan-900 text-sm">
                      787-000-0000 | 787-000-0000
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <GrMail className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                    <p className="text-cyan-900 text-sm">
                      correoelectronico@acuden.com
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <TbWorld className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                    <p className="text-cyan-900 text-sm">paginaweb.com</p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <CiCompass1 className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                    <p className="text-cyan-900 text-sm">
                      Calle direccion, Pueblo PR 00000
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <BsClockFill className="text-white p-1 bg-cyan-900 rounded-full text-2xl" />
                    <p className="text-cyan-900 text-sm">
                      Lunes-Viernes 7:00am-5:00pm <br /> Sabados 8:00am-12:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-small p-6 rounded-lg">
              <TabView
                activeIndex={tabIndex}
                onTabChange={(e) => setTabIndex(e.index)}
              >
                <TabPanel header="Servicios">
                  <div className="py-3 flex flex-col gap-2 text-sm">
                    <p>
                      Eu adipisicing cillum id nisi eiusmod id reprehenderit.
                      Sit nostrud ex fugiat duis quis sit ipsum velit id id
                      minim proident magna sunt. Cillum do ad laborum elit
                      nostrud dolore. Dolore et duis dolor commodo est dolor
                      sint.
                    </p>
                    <p>
                      Ex elit minim dolor laborum. Sunt et aliqua quis do ea
                      sit. Deserunt duis laborum sunt exercitation incididunt
                      anim ex qui cupidatat aliqua
                    </p>
                  </div>
                </TabPanel>
                <TabPanel header="Sobre Nostros">
                  <div className="py-3 flex flex-col gap-2 text-sm">
                    <p>
                      Eu adipisicing cillum id nisi eiusmod id reprehenderit.
                      Sit nostrud ex fugiat duis quis sit ipsum velit id id
                      minim proident magna sunt. Cillum do ad laborum elit
                      nostrud dolore. Dolore et duis dolor commodo est dolor
                      sint.
                    </p>
                    <p>
                      Ex elit minim dolor laborum. Sunt et aliqua quis do ea
                      sit. Deserunt duis laborum sunt exercitation incididunt
                      anim ex qui cupidatat aliqua
                    </p>
                  </div>
                </TabPanel>
              </TabView>
            </div>

            <div className="col-span-1 flex flex-col gap-3 bg-cyan-900 bg-opacity-10 p-3 rounded-lg h-[450px] overflow-hidden">
              <div className="flex flex-row items-center justify-between">
                <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                  Empleados
                </h1>
                <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900">
                  Manejar
                </button>
              </div>

              <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md flex flex-row items-center p-3 gap-2"
                  >
                    <img
                      src="https://thispersondoesnotexist.com/image"
                      className="w-20 h-20 bg-emerald-600 rounded-full"
                      alt="person"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold">Nombre de empleado(a)</h1>
                      <div className="flex flex-row gap-1 item-center text-sm text-gray-500">
                        Puesto en Bright Beginnings
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col p-3 bg-white shadow-small gap-3 rounded-lg mb-10 mt-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-cyan-900 font-semibold">Galleria</h1>
            <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900">
              Manejar
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="aspect-square bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)] rounded-md"></div>
            <div className="aspect-square bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1673970825861-3469f8fe01d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)] rounded-md"></div>
            <div className="aspect-square bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)] rounded-md"></div>
            <div className="aspect-square overflow-hidden bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFuZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)] rounded-md">
              <div className="h-full w-full bg-cyan-800 bg-opacity-60 flex justify-center items-center">
                <button className="p-2 px-4 rounded-md border-2 border-white text-white font-semibold">
                  Ver todas
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServiceProfile;
