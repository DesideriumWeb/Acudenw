/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */

import separatorFooter from "../../assets/images/SeparatorFooter.svg"
import {PORTAL_ROUTES} from "../../config/config";
import {Link} from "react-router-dom";
const Footer = () => {
    return(
        <div className="bg-[#1E1E1E] py-10 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-white px-4">
                        <h5 className="mb-2">ACUDEN</h5>
                        <p className="text-sm">Piso 14, Mercantil Plaza, 2 Av. Juan Ponce de León, San Juan, 00917</p>
                    </div>
                    <div className="text-white px-4">
                        <h5 className="mb-2">Contáctenos</h5>
                        <p className="text-sm">acudenteasiste@familia.pr.gov <br/> (787)-724-7474 (Ext. 3649, 3695, 3714, 3719, 3722, 3747, 3846 ó 3856)</p>
                    </div>
                    <div className="text-white px-4">
                        <h5 className="mb-2">Información</h5>
                        <div className="flex flex-col">
                            <Link to={PORTAL_ROUTES.USE_TERMS_ROUTE} className="text-sm mb-2 md:mb-0">Términos y condiciones</Link>
                            <Link to={PORTAL_ROUTES.PRIVACY_POLICY_ROUTE} className="text-sm">Política de Privacidad</Link>
                        </div>
                    </div>
                </div>
                <div className="my-6">
                    <img src={separatorFooter} alt="separator" />
                </div>
                <div className="text-center text-white pt-2">
                    <p className="text-sm">© 2022 Puerto Rico Innovation & Technology Service. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>

    );
}

export default Footer