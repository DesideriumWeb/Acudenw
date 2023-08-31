/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
/*
 * Component ProviderDirectory
 *
 * This component displays a directory of providers with filtering options by town and category.
 * It allows resetting the filters and paginating the results.
 *
 * Props:
 * - None
 *
 * States:
 * - selectedTown: Stores the selected town in the filter.
 * - selectedCategory: Stores the selected category in the filter.
 * - filteredProviders: Stores the filtered providers based on the selected criteria.
 *
 * Hooks:
 * - useTowns: Custom hook that loads the list of towns.
 * - useProviderCategories: Custom hook that loads the list of provider categories.
 * - useProviderByStatus: Custom hook that loads providers based on their status.
 *
 * Usage:
 * <ProviderDirectory />
 */
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import useTowns from "../../hooks/Towns/useTowns";
import useProviderCategories from "../../hooks/Provider/useProviderCategories";
import { Session } from "../../services/Session";
import Paginator from "../../components/Paginator";
import {PulseLoader} from "react-spinners";
import useProviderByStatus from "../../hooks/Provider/useProviderByStatus";
import BasicAlert from "../../components/General/BasicAlert";
import ProvidersTable from "./ProvidersTable";
import { ALERT_TYPES, CONSTANTS } from "../../config/config";
import { BsFilter } from "react-icons/bs";

const ProviderDirectory = () => {
  // Load towns and categories
  const { loading: townsLoading } = useTowns();
  const { loading: categoriesLoading } = useProviderCategories();

  // State and pagination
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0);
  const displayPerPage = 10;

  // Load providers by status
  const { providers, totalElements, totalPages, isLoading, spinnerLoading, inError, errorMsg } = useProviderByStatus(
      currentPaginationIndex,
      displayPerPage
  );

  // Filter state
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);

  // Update filtered providers when providers change
  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  // Town selection handler
  const townHandler = (selectedOption) => {
    setSelectedTown(selectedOption.value);
    const filtered = providers.filter((provider) => provider.town.id === selectedOption.value);
    setFilteredProviders(filtered);
  };

  // Category selection handler
  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
    const filtered = providers.filter((provider) => {
      return provider.categories.some((c) => c.id === selectedOption.value);
    });
    setFilteredProviders(filtered);
  };

  // Reset filters
  const resetFilter = () => {
    setFilteredProviders(providers);
    setSelectedCategory("");
    setSelectedTown("");
  };

  return (
    <div className="w-full bg-white">
      <main className="w-full">

        {isLoading ? (
            <div className="flex flex-col h-login-screen w-full items-center justify-center">
              <PulseLoader
                  color={CONSTANTS.LOADING_SPINNER_COLOR}
                  size={CONSTANTS.DEFAULT_PULSAR_SIZE}
                  className="m-5 p-5"
              />
            </div>
        ) : (
            <>
              <section className="max-w-6xl p-3 mx-auto">
                <div className="my-3 flex flex-col sm:flex-row w-full items-center justify-between">
                  <h1 className="font-semibold text-2xl my-8 acu-blue">Directorio de Centros</h1>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {!townsLoading && !categoriesLoading && (
                        <>
                          <Dropdown
                              className="text-xs text-cyan-900"
                              placeholder="Pueblo"
                              value={selectedTown}
                              options={Session.getTownDropDTO()}
                              onChange={townHandler}
                          />
                          <Dropdown
                              className="text-xs text-cyan-900"
                              placeholder="Categoría"
                              value={selectedCategory}
                              options={Session.getProviderCategoriesDropDTO()}
                              onChange={categoryHandler}
                          />
                          <button
                              onClick={resetFilter}
                              className="flex items-center bg-[#092C4C] text-white hover:bg-[#A7D02A] hover:text-white hover:shadow-md py-2 px-4 rounded-md transition-colors duration-300"
                          >
                            <BsFilter className="mr-1" size={20} /> Restablecer Filtros
                          </button>
                        </>
                    )}
                  </div>
                </div>
              </section>

              <section className="bg-cyan-800 bg-opacity-10 w-full py-8">
                {inError ? (
                    <div className="flex flex-col w-full items-center justify-center">
                      <BasicAlert errorMsg={errorMsg} color={ALERT_TYPES.DANGER} />
                    </div>
                ) : (
                    <ProvidersTable providers={filteredProviders} isLoading={isLoading} />
                )}
              </section>

              <section className="my-20">
                <Paginator
                    loading={spinnerLoading}
                    currentPaginationIndex={currentPaginationIndex}
                    setCurrentPaginationIndex={setCurrentPaginationIndex}
                    total={totalElements}
                    displayPerPage={displayPerPage}
                />
              </section>
            </>
        )}

      </main>
    </div>
  );
};

export default ProviderDirectory;
