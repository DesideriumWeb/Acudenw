import React from "react";
import { HiCheckCircle } from "react-icons/hi";
const RegisterSuccess = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-3">
      <div className="flex flex-col items-center w-full max-w-xs gap-3">
        <img src="/images/logo.png" alt="logo" />
        <p className="text-xs bg-yellow-100 px-2 py-px rounded">
          Panel Administrativo
        </p>
        <div className="text-center">
          <HiCheckCircle className="text-green-500 text-4xl my-2" />
        </div>
        <h2 className="text-center text-2xl font-semibold">
          Gracious por completar su registro!
        </h2>
        <p className="my-2 text-center">
          Velit velit dolore proident cupidatat ullamco fugiat exercitation id.
          Velit velit dolore proident cupidatat ullamco fugiat exercitation id.
        </p>
        <button className="form-btn">Visitar acudenacademy.com</button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
