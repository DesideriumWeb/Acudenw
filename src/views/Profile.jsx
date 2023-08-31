import React from "react";
import { AiFillPhone } from "react-icons/ai";
import {
  BsChevronRight,
  BsClockFill,
  BsFillInfoCircleFill,
  BsFillTrophyFill,
  BsPlayFill,
  BsThreeDots,
  BsTrophyFill,
} from "react-icons/bs";

import { GrMail } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
import { CiCompass1 } from "react-icons/ci";
import { TabPanel, TabView } from "primereact/tabview";
import { HiDocumentText } from "react-icons/hi";
import { ImMap } from "react-icons/im";
import Navbar from "../components/General/Navbar";

const list = [
  {
    Icon: HiDocumentText,
    title: "Nostrud Lorem aliquip quis proident reprehenderit",
    color: "rgb(3 105 161)",
    date: " Publicado el 13 de abril de 2022",
  },
  {
    Icon: BsPlayFill,
    title: "Nostrud Lorem aliquip quis proident reprehenderit",
    color: "rgb(233 105 161)",
    date: " Publicado el 13 de abril de 2022",
  },
  {
    Icon: ImMap,
    title: "Nostrud Lorem aliquip quis proident reprehenderit",
    color: "rgb(251 146 60)",
    date: " Publicado el 13 de abril de 2022",
  },
];

const Profile = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div className="w-full bg-white">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto p-3">
        <section className="py-5 flex flex-row justify-between">
          <h2 className="font-semibold text-lg md:text-2xl">
            Hola, Bright Beginnings!
          </h2>
          <div className="flex flex-row gap-2 items-center font-semibold">
            <BsFillInfoCircleFill className="text-[#092C4C]" size={22} />{" "}
            Tutorial
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-small p-6 rounded-lg flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <h1 className="flex flex-row gap-2 items-center text-[#092C4C] font-semibold text-lg">
                Mi Perfil
              </h1>
            </div>

            <div className="flex flex-col gap-2 items-center mt-4 flex-1 justify-between">
              <img
                src="https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="profile"
                className="h-28 w-28 rounded-full"
              />
              <div className="text-center">
                <div className="text-lg font-semibold">Bright Beginnings</div>
                <div>Centro de cuido</div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <BsFillTrophyFill className="text-yellow-500" size={32} />
                <div className="font-semibold">
                  <span className="text-xl">9.5</span> pts
                </div>
                <button className="text-[#092C4C] w-fit px-4 py-2 rounded-md border-2 border-[#092C4C] font-semibold">
                  Visitar Perfil
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-small p-6 rounded-lg">
            <div className="flex flex-row items-center justify-between">
              <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                Noticias recientes
              </h1>
              <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold">
                Ver noticias
              </button>
            </div>
            <div className="flex flex-col gap-3 pt-3">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src="https://www.thispersondoesnotexist.com/image"
                    alt="person"
                    className="h-16 w-216 rounded-md"
                  />
                  <div className="flex flex-col">
                    <h4 className="text font-semibold">
                      Nisi tempor fugiat commodo
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Pariatur exercitation ullamco
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <BsChevronRight size={24} />
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full"></div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src="https://www.thispersondoesnotexist.com/image"
                    alt="person"
                    className="h-16 w-216 rounded-md"
                  />
                  <div className="flex flex-col">
                    <h4 className="text font-semibold">
                      Nisi tempor fugiat commodo
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Pariatur exercitation ullamco
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <BsChevronRight size={24} />
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full"></div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src="https://www.thispersondoesnotexist.com/image"
                    alt="person"
                    className="h-16 w-216 rounded-md"
                  />
                  <div className="flex flex-col">
                    <h4 className="text font-semibold">
                      Nisi tempor fugiat commodo
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Pariatur exercitation ullamco
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <BsChevronRight size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="md:row-span-2 flex flex-col gap-3 bg-cyan-900 bg-opacity-10 p-3 rounded-lg h-[500px] md:h-[700px] overflow-hidden">
            <div className="flex flex-row items-center justify-between">
              <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                Mis Empleados (16)
              </h1>
              <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 font-semibold border-cyan-900">
                Manejar
              </button>
            </div>

            <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scroll">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                (index) => (
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
                )
              )}
            </div>
          </div>
          <div className="bg-white col-span-1 md:col-span-2 shadow-small p-6 rounded-lg">
            <div className="flex flex-row items-center justify-between">
              <h1 className="flex flex-row gap-2 items-center text-cyan-900 font-semibold text-lg">
                Publicaciones recomendadas
              </h1>
              <button className="text-cyan-900 w-fit px-4 py-2 rounded-md border-2 border-cyan-900 font-semibold">
                Ver Biblioteca
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {list.map(({ title, date, Icon, color }, index) => (
                <div
                  key={index}
                  className="flex flex-row rounded-xl overflow-hidden shadow-sm w-full"
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="w-12 h-16 flex justify-center items-center"
                  >
                    <Icon color="white" size={32} />
                  </div>
                  <div className="px-4 flex flex-row items-center justify-between flex-1">
                    <div className="flex flex-col">
                      <p className="font-semibold">{title}</p>
                      <p className="text-sm">{date}</p>
                    </div>
                    <BsThreeDots size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
