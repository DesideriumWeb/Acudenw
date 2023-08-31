import React from "react";

const Error = () => {
  return (
    <main className="max-w-6xl p-3 mx-auto h-screen">
      <section className="flex flex-col md:grid md:grid-cols-2 h-full">
        <div className="flex-1 md:h-full flex flex-col items-start justify-center gap-3">
          <h1 className="text-8xl font-bold text-blue-500">404</h1>
          <div className="font-semibold text-xl">Pagina no encontrada</div>
          <div className="font-semibold">
            La pagina que estas buscando no esta disponible
          </div>
          <button className="bg-blue-900 p-3 rounded-md text-white">
            Volver al inicio
          </button>
        </div>
        <div className="flex-1 md:h-full flex flex-col items-center justify-center gap-3">
          <img src="/images/error.png" alt="shapes" className="p-6" />
        </div>
      </section>
    </main>
  );
};

export default Error;
