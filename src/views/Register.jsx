/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-3">
      <div className="flex flex-col items-center w-full max-w-xs gap-3">
        <img src="/images/logo.png" alt="logo" />
        <p className="text-xs bg-yellow-100 px-2 py-px rounded">
          Panel Administrativo
        </p>
        <h3 className="font-semibold my-2 text-xl text-darkblue">Registero</h3>
        <form className="w-full flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <label className="text-sm">Nombre</label>
            <input className="form-input" placeholder="Nombre" />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm">Apellidos</label>
            <input className="form-input" placeholder="Apellidos" />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm">Correo electrónico</label>
            <input className="form-input" placeholder="Correo electronico" />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="form-input"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="form-input"
            />
          </div>

          <div>
            <input className="form-btn" type="submit" value="Registrarme" />
          </div>

          <div>
            <p className="text-center text-sm">
              Ya tienes una cuanta?{" "}
              <Link
                to="/register"
                className="text-darkblue text-sm font-semibold items-center justify-center"
              >
                Inicia sesion
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
