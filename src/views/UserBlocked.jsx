import React from "react";
import { RiLock2Fill } from "react-icons/ri";
import Navbar from "../components/General/Navbar";

const UserBlocked = () => {
  return (
    <div className="w-full bg-white">
      <Navbar />
      <main className="max-w-6xl p-3 mx-auto">
        <section className="flex flex-col mt-4 items-center w-full max-w-xs mx-auto text-center">
          <div className="font-semibold text-2xl">ACUDEN logo</div>
          <div className="font-semibold text-xl my-3">
            Su cuenta ha sido blqueada
          </div>
          <div>
            Para mas information contacte a ACUDEN Academy enviando un mensaje a
            traves del formulario contacto
          </div>
          <div className="rounded-full h-32 w-32 overflow-hidden relative my-10">
            <img src="https://thispersondoesnotexist.com/image" alt="locked" />
            <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50"></div>
            <RiLock2Fill
              size={33}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
          <div className="font-semibold">Nombre del usuario</div>
          <div className="text-sm">correoelectronico@ejemplo.com</div>

          <div className="flex flex-row gap-1 py-6 w-full mt-6">
            <button className="flex-1 border-2 border-sky-900 text-sky-900 py-2 text-sm rounded-md">
              Volver al inicio
            </button>
            <button className="flex-1 border bg-sky-900 text-white py-2 text-sm rounded-md">
              Contactar a ACUDEN
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserBlocked;
