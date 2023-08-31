/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
const Law = () => {
    //TODO ADD href...
    return(
        <div className="bg-[#EEF2F6] h-18 py-6 px-4">
            <div className="container mx-auto text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                    <div>
                        <a href="#" className="text-sm">Accesibilidad Núm-XXX-2019 - Conforme a la Ley 229 de 2003</a>
                    </div>
                    <div>
                        <a href="https://inprende.com" target="_blank" className="text-sm">www.pr.gov 2021, All rights reserved Created by: INprende</a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Law