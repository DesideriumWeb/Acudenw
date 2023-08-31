/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import {BiReset} from "react-icons/bi";
import {MdClose} from "react-icons/md";
import {BsChevronDown} from "react-icons/bs";
import {Checkbox} from "primereact/checkbox";
import {RadioButton} from "primereact/radiobutton";
import React, {useEffect} from "react";
import {LIBRARY_CONTENT_CATEGORIES, LIBRARY_CONTENT_FORMATS} from "../../config/config";
import {VscSettings} from "react-icons/vsc";

/**
 * Renders the Library Filters component.
 * Filter library list.
 *
 * @returns {JSX.Element} The JSX element representing the News component.
 */
const LibraryFilters = ({
                            selectedCategoryFilters,
                            setSelectedCategoryFilters,
                            selectedFormatFilters,
                            setSelectedFormatFilters,
                            selectedOrder,
                            setSelectedOrder,
                            setShowFilters,
                            showFilters,
                            doResetFilters = 0
                        }) => {
    /**
     * Toggles the checkbox selection for a filter.
     * @param {number} index - The index of the filter.
     * @param {string} filterType - The type of filter ("category" or "format").
     * @returns {void}
     */
    const toggleCheckBox = (index, filterType) => {

        if (filterType === "category") {

            setSelectedCategoryFilters((prevFilters) => {

                const updatedFilters = [...prevFilters];
                const category = Object.values(LIBRARY_CONTENT_CATEGORIES)[index].type;

                const isSelected = updatedFilters.includes(category);

                if (isSelected) {

                    const updatedCategoryFilters = updatedFilters.filter(
                        (filter) => filter !== category
                    );

                    if (updatedCategoryFilters.length === 0 && selectedFormatFilters.length === 0) {
                        return [];
                    }

                    return updatedCategoryFilters;
                } else {

                    updatedFilters.push(category);

                    return updatedFilters;
                }
            });
        } else if (filterType === "format") {
            setSelectedFormatFilters((prevFilters) => {
                const updatedFilters = [...prevFilters];
                const format = Object.values(LIBRARY_CONTENT_FORMATS)[index].type;

                const isSelected = updatedFilters.includes(format);

                if (isSelected) {

                    const updatedFormatFilters = updatedFilters.filter(
                        (filter) => filter !== format
                    );

                    if (selectedCategoryFilters.length === 0 && updatedFormatFilters.length === 0) {
                        return [];
                    }

                    return updatedFormatFilters;
                } else {

                    updatedFilters.push(format);

                    return updatedFilters;
                }
            });
        }
    };
    /**
     * Resets all filters.
     * @returns {void}
     */
    const resetFilters = () => {
        setSelectedCategoryFilters([]);
        setSelectedFormatFilters([]);
        setSelectedOrder(null);
    };
    /**
     * Do reset filters form external event.
     */
    useEffect(() => {
        resetFilters()
    }, [doResetFilters]);


    return (
        <div
            className={`fixed top-0 left-0 h-full overflow-visible w-full ${
                showFilters ? "flex" : "hidden"
            } bg-black bg-opacity-40 md:relative md:h-fit md:w-fit md:bg-transparent md:flex py-6 md:py-0 flex-col  items-center justify-center z-10`}
        >
            <div className="flex flex-col rounded-lg overflow-hidden w-80 md:w-60 shadow-md bg-white z-10">
                <div className="flex flex-col rounded-lg overflow-hidden w-80 md:w-60 shadow-md bg-white">
                    <div className="bg-cyan-900 p-3 flex flex-row items-center justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <div className="hidden md:flex">
                                <VscSettings color="white" size={20} />
                            </div>
                            <h1 className="text-white font-medium">Filtros</h1>
                        </div>
                        <div
                            id="acu-lib-filters"
                            onClick={resetFilters}
                            className="flex flex-row gap-2 items-center rounded-2xl cursor-pointer shadow-sm shadow-cyan-50"
                        >
                            <div className="hidden md:flex">
                                <BiReset color="white" size={22} />
                            </div>
                            <MdClose
                                color="white"
                                size={22}
                                className="md:hidden"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFilters(false);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col overflow-y-auto">
                    <div className="p-3">
                        <div className="flex flex-row justify-between w-full items-center">
                            <h1 className="font-semibold">Categoría</h1>
                            <BsChevronDown />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            {Object.values(LIBRARY_CONTENT_CATEGORIES).map(
                                (category, index) => (
                                    <div
                                        className="flex flex-row gap-2 items-center"
                                        key={index}
                                    >
                                        <Checkbox
                                            onChange={() => toggleCheckBox(index, "category")}
                                            checked={selectedCategoryFilters.includes(
                                                category.type
                                            )}
                                        />
                                        <p>{category.name}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-row justify-between w-full items-center">
                            <h1 className="font-semibold">Formato</h1>
                            <BsChevronDown />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            {Object.values(LIBRARY_CONTENT_FORMATS).map((format, index) => (
                                <div className="flex flex-row gap-2 items-center" key={index}>
                                    <Checkbox
                                        onChange={() => toggleCheckBox(index, "format")}
                                        checked={selectedFormatFilters.includes(format.type)}
                                    />
                                    <p>{format.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-row justify-between w-full items-center">
                            <h1 className="font-semibold">Orden</h1>
                            <BsChevronDown />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <div className="flex flex-row gap-2 items-center">
                                <RadioButton
                                    value="alphabetical"
                                    name="orden"
                                    onChange={(e) => setSelectedOrder(e.value)}
                                    checked={selectedOrder === "alphabetical"}
                                />
                                <p>Orden alfabético</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <RadioButton
                                    value="recent"
                                    name="orden"
                                    onChange={(e) => setSelectedOrder(e.value)}
                                    checked={selectedOrder === "recent"}
                                />
                                <p>Reciente-Antiguo</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <RadioButton
                                    value="oldest"
                                    name="orden"
                                    onChange={(e) => setSelectedOrder(e.value)}
                                    checked={selectedOrder === "oldest"}
                                />
                                <p>Antiguo-Reciente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryFilters;

