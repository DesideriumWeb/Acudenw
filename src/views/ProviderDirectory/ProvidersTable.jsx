/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
/*
 * Component ProvidersTable
 *
 * This component displays a table of providers with their information and options to view their profiles.
 *
 * Props:
 * - providers: An array of provider objects to be displayed in the table.
 *
 * Usage:
 * <ProvidersTable providers={providers} />
 */
import { BsFillAwardFill, BsFillTrophyFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import React from "react";
import { capitalizeFirstLetter, parseTown } from "../../components/utils";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PORTAL_ROUTES } from "../../config/config";

const ProvidersTable = ({ providers = [] }) => {
    // Navigation
    const navigate = useNavigate();

    return(
        <div className="max-w-6xl p-3 mx-auto">
            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                    <tr className="text-lg">
                        <th className="text-left font-bold acu-blue">Proveedor</th>
                        <th className="text-left font-bold acu-blue">Pueblo</th>
                        <th className="text-left font-bold acu-blue">Teléfono</th>
                        <th className="text-left font-bold acu-blue">Puntuación</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers &&
                        providers.map((provider, index) => (
                            <tr
                                key={index}
                                style={{ boxShadow: "0px 0px 4px #9996" }}
                                className="bg-white  rounded-xl"
                            >
                                <td className="p-2 rounded-l-xl">
                                    <div className="flex flex-row gap-4 items-center">
                                        <div className="bg-yellow-600 bg-opacity-50 h-12 w-12 rounded-full items-center justify-center flex text-cyan-900 font-bold text-2xl">
                                            {provider.name ? (
                                                capitalizeFirstLetter(provider.name)
                                            ) : (
                                                <IoPersonCircle size={50} color="#092C4C" />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold">{provider.name ?? "Nombre Proveedor"}</p>
                                            <p>{provider.ownerFullName ?? 'Nombre Empleado'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2">{provider.town.name}</td>
                                <td className="py-2">{provider.phoneNumber1 ?? '787-XXX-XXXX'}</td>
                                <td className="py-2">
                                    <div className="flex flex-row gap-2 items-center">
                                        {provider.overallRanking >= 7 ? (
                                            <BsFillTrophyFill
                                                className="text-yellow-400"
                                                size={28}
                                            />
                                        ) : provider.overallRanking >= 3.5 ? (
                                            <FaAward className="text-sky-600" size={28} />
                                        ) : (
                                            <BsFillAwardFill
                                                className="text-rose-600"
                                                size={24}
                                            />
                                        )}
                                        <p className="text-cyan-900 font-semibold text-2xl">
                                            {provider.overallRanking.toFixed(1)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-2 rounded-r-xl text-right w-fit">
                                    <button
                                        onClick={() => navigate(PORTAL_ROUTES.PROVIDER_GUEST_ROUTE, { state: { provider } })}
                                        className="py-2 px-4 border-2 border-cyan-900 text-cyan-900 font-semibold rounded-md"
                                    >
                                        Ver perfil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProvidersTable