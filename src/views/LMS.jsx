import React from "react";
import Dropdown from "../components/General/Dropdown";
import { AiFillHome } from "react-icons/ai";
import { IoClose, IoDocumentText } from "react-icons/io5";
import { FaAward, FaFolderOpen, FaMap } from "react-icons/fa";
import { VscTasklist } from "react-icons/vsc";
import { GoStar } from "react-icons/go";
import { BsInfoCircleFill, BsQuestionCircleFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Navbar from "../components/General/Navbar";

const sidebarList = [
  { name: "Introduccion", icon: AiFillHome },
  { name: "Cursos", icon: IoDocumentText },
  { name: "Silabo", icon: FaMap },
  { name: "Recursos", icon: FaFolderOpen },
  { name: "Pruebas", icon: VscTasklist },
  { name: "Calificaciones", icon: GoStar },
  { name: "Certificados", icon: FaAward },
  { name: "Informacion", icon: BsInfoCircleFill },
  { name: "Ayuda", icon: BsQuestionCircleFill },
];

const coursesList = [
  {
    title: "Primar Taller",
    desc: "Cupidatat quis amet reprehenderit consequat sunt id nostrud mollit elit. Ad eiusmod Lorem in excepteur esse non officia commodo. Ipsum minim aliquip fugiat cupidatat mollit Lorem irure commodo enim et et. Nisi do Lorem in et aliquip eu enim cillum minim exercitation culpa irure. Et labore culpa in sit pariatur amet fugiat reprehenderit consequat ad aliquip exercitation in qui. Ut nulla sunt quis pariatur officia ut minim ullamco esse nisi laboris aliqua. Ex magna labore duis aute.",
    image:
      "https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Segundo Taller",
    desc: "Cupidatat quis amet reprehenderit consequat sunt id nostrud mollit elit. Ad eiusmod Lorem in excepteur esse non officia commodo. Ipsum minim aliquip fugiat cupidatat mollit Lorem irure commodo enim et et. Nisi do Lorem in et aliquip eu enim cillum minim exercitation culpa irure. Et labore culpa in sit pariatur amet fugiat reprehenderit consequat ad aliquip exercitation in qui. Ut nulla sunt quis pariatur officia ut minim ullamco esse nisi laboris aliqua. Ex magna labore duis aute.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhaW5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Tercer Taller",
    desc: "Cupidatat quis amet reprehenderit consequat sunt id nostrud mollit elit. Ad eiusmod Lorem in excepteur esse non officia commodo. Ipsum minim aliquip fugiat cupidatat mollit Lorem irure commodo enim et et. Nisi do Lorem in et aliquip eu enim cillum minim exercitation culpa irure. Et labore culpa in sit pariatur amet fugiat reprehenderit consequat ad aliquip exercitation in qui. Ut nulla sunt quis pariatur officia ut minim ullamco esse nisi laboris aliqua. Ex magna labore duis aute.",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWluaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const LMS = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="w-full bg-white">
      <main className="w-full h-screen flex flex-col">
        <section className="border-b-2 border-b-gray-200 w-full py-2">
          <div className="max-w-6xl p-3 mx-auto flex flex-row items-center gap-3 justify-between">
            <FiMenu
              className="text-darkblue md:hidden"
              onClick={() => {
                setShowSidebar(true);
              }}
              size={28}
            />
            <Dropdown
              value={"ACUDEN Academy"}
              onChange={(value) => {
                console.log(value);
              }}
              options={[
                { label: "ACUDEN Academy", value: "1" },
                { label: "KHAN Academy", value: "2" },
                { label: "NOON Academy", value: "3" },
                { label: "MEEM Academy", value: "4" },
                { label: "UN Academy", value: "5" },
              ]}
            />
          </div>
        </section>

        <section className="max-w-6xl px-3 mx-auto flex flex-row flex-1">
          <div
            className={`${
              showSidebar ? "translate-x-0" : "translate-x-[-200%]"
            } fixed shadow-sidebar transition-all left-0 top-0 z-10 md:translate-x-0 bg-white md:shadow-none md:relative md:border-r-gray-200 md:border-r-2 w-64 h-full`}
          >
            <div className="flex flex-col gap-2 p-3 pt-10 md:pt-3 relative">
              <div
                onClick={() => setShowSidebar(false)}
                className="absolute top-2 right-2 text-2xl text-gray-900 p-2 md:hidden"
              >
                <IoClose />
              </div>
              {sidebarList.map((item, index) => (
                <div
                  key={index}
                  className={` text-darkblue font-semibold flex flex-row gap-2 items-center justify-start hover cursor-pointer p-2 hover:bg-gray-300`}
                >
                  <item.icon size={24} />
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-6 gap-4 flex flex-col">
            <h1 className="font-semibold text-xl text-darkblue flex flex-row gap-2">
              <IoDocumentText size={28} />
              Cursos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesList.map((course, index) => (
                <div className="flex flex-col p-3 rounded-md border-2 border-darkblue gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="aspect-[1.5] w-full"
                  />
                  <h1 className="font-semibold text-darkblue text-lg">
                    Curso: {course.title}
                  </h1>
                  <p className="line-clamp-5">{course.desc}</p>
                  <button className="bg-darkblue py-2 px-4 rounded-md font-semibold text-white w-fit">
                    Lecciones
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LMS;
