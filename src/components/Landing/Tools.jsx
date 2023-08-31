/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import ToolsOne from "../../assets/images/ToolsOne.png"
import ToolsTwo from "../../assets/images/ToolsTwo.png"
import ToolsThree from "../../assets/images/ToolsThree.png"
import ToolsFour from "../../assets/images/ToolsFour.png"
import ToolsFive from "../../assets/images/ToolsFive.png"
import ToolItem from "./ToolItem";
import {PORTAL_ROUTES, STRINGS} from "../../config/config";
/**
 * Landing tool blocks / items.
 * @return {JSX.Element}
 * @constructor
 */
const Tools = () => {
    return(
        <div className="w-full min-h-[630px] flex bg-top bg-auto border-white bg-[#092C4C]">
            <div className='container mx-auto px-4'>
                <div className="flex">
                    <div className="w-full h-auto my-8">
                        <h1 className="text-white font-montserrat pt-5 text-center text-5xl font-bold"> {STRINGS.LANDING_TOOLS_TITLE} </h1>
                    </div>
                </div>
                <section className="grid max-h-full h-[500px] overflow-y-scroll scrollbar-hide ac-scroll-y-hide mt-12">

                    <ToolItem
                        title="Únete al Directorio de Centros del Futuro"
                        description={STRINGS.TOOL_ONE_DESCRIPTION}
                        path={PORTAL_ROUTES.PROVIDER_DIRECTORY_ROUTE}
                        alt="Imagen de Manos Extendidas"
                        index="1"
                        imgSrc={ToolsOne}
                    />

                    <ToolItem
                        title="Acredíta tu Centro con ACUDEN"
                        description={STRINGS.TOOL_TWO_DESCRIPTION}
                        path={PORTAL_ROUTES.LANDING_CENTER_FUTURE}
                        alt="Cursos de Cuidado Niñez Temprana"
                        index="2"
                        imgSrc={ToolsTwo}
                    />

                    <ToolItem
                        title="Desarrolla profesionalmente a tu equipo"
                        description={STRINGS.TOOL_THREE_DESCRIPTION}
                        path={PORTAL_ROUTES.LANDING_ACCESA}
                        alt="Calendario de Eventos"
                        index="3"
                        imgSrc={ToolsThree}
                    />

                    <ToolItem
                        title="Edúcate con nuestra biblioteca virtual"
                        description={STRINGS.TOOL_FOUR_DESCRIPTION}
                        path={PORTAL_ROUTES.LIBRARY_ROUTE}
                        alt="Biblioteca Virtual"
                        index="4"
                        imgSrc={ToolsFour}
                    />

                    <ToolItem
                        title="Noticias"
                        description={STRINGS.TOOL_FIVE_DESCRIPTION}
                        path={PORTAL_ROUTES.NEWS_ROUTE}
                        alt="Noticias"
                        index="5"
                        imgSrc={ToolsFive}
                    />

                </section>
            </div>
        </div>

    );
}

export default Tools