/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useEffect, useState} from "react";
import { TabPanel, TabView } from "primereact/tabview";
import {compareAsc, compareDesc, parse} from 'date-fns';
import LibraryFilters from "../../components/General/LibraryFilters";
import Paginator from "../../components/Paginator";
import useLibrary from "../../hooks/Library/useLibrary";
import LibraryItem from "./LibraryItem";
import {PulseLoader} from "react-spinners";
import {CONSTANTS} from "../../config/config";
import useStoredLibrary from "../../hooks/Library/useStoredLibrary";
import {deleteLibraryItemByResourceId} from "../../config/acudenLocaDB";
import {VscSettings} from "react-icons/vsc";

/**
 * Renders the Library component.
 * Displays library items with filters and pagination.
 *
 * @returns {JSX.Element} The JSX element representing the Library component.
 */
const Library = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [doResetFilter, setDoResetFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [storedPagination, setStoredPagination] = useState(false)

  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedFormatFilters, setSelectedFormatFilters] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0)
  const [currentStoredPaginationIndex, setCurrentStoredPaginationIndex] = useState(0)

  const [libraryCopyItem, setLibraryCopyItem] = useState([])
  const [storedLibraryCopyItem, setStoredLibraryCopyItem] = useState([])

  const displayPerPage = 10

  const {libraryItems, isLoading, totalElements, inError, errorMsg, totalPages, spinnerLoading, setLibraryItems} = useLibrary(currentPaginationIndex, displayPerPage);
  const {storedLibraryItems, storedIsLoading, storedInError, storedErrorMsg, storedSpinnerLoading, storedTotalElements, storedTotalPages, setStoredLibraryItems} = useStoredLibrary(currentStoredPaginationIndex, displayPerPage)

  /**
   * Removes an item from the library.
   * @param {Object} item - The item to be removed.
   * @returns {void}
   */
  const removeItem = (item) => {
    const updatedItems = libraryItems.filter((i) => i !== item);
    setLibraryItems(updatedItems);
  };
  /**
   * Removes an item from the stored library.
   * @param {Object} item - The item to be removed.
   * @returns {void}
   */
  const removeFromStored = (item) => {
    const updatedItems = storedLibraryItems.filter((i) => i !== item);
    setStoredLibraryItems(updatedItems);
    deleteLibraryItemByResourceId(item.id);
  };
  /**
   * Pushes an item to the stored library.
   * @param {Object} item - The item to be added.
   * @returns {void}
   */
  const pushOnAdd = (item) => {
    let updatedItems = [...storedLibraryItems];
    updatedItems.push(item);
    setStoredLibraryItems(updatedItems);
  };
  /**
   * Applies the selected filters to the library items.
   * @returns {void}
   */
  const applyFilters = () => {

    let filteredLibraryItems = [...libraryItems];
    let filteredStoredLibraryItems = [...storedLibraryItems];

    // Apply category filters
    if (selectedCategoryFilters.length > 0) {
      filteredLibraryItems = filteredLibraryItems.filter((item) =>
          selectedCategoryFilters.includes(item.libraryContentCategory.toLowerCase())
      );
      filteredStoredLibraryItems = filteredStoredLibraryItems.filter((item) =>
          selectedCategoryFilters.includes(item.libraryContentCategory.toLowerCase())
      );
    }

    // Apply format filters
    if (selectedFormatFilters.length > 0) {
      filteredLibraryItems = filteredLibraryItems.filter((item) =>
          selectedFormatFilters.includes(item.libraryContentFormat.toLowerCase())
      );
      filteredStoredLibraryItems = filteredStoredLibraryItems.filter((item) =>
          selectedFormatFilters.includes(item.libraryContentFormat.toLowerCase())
      );
    }

    // Apply order filter
    if (selectedOrder === "alphabetical") {
      filteredLibraryItems.sort((a, b) =>
          a.title.localeCompare(b.title, "en", { sensitivity: "base" })
      );
      filteredStoredLibraryItems.sort((a, b) =>
          a.title.localeCompare(b.title, "en", { sensitivity: "base" })
      );
    }else if (selectedOrder === "recent") {
      filteredLibraryItems.sort((a, b) =>
          compareDesc(
              parse(a.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date()),
              parse(b.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date())
          )
      );
      filteredStoredLibraryItems.sort((a, b) =>
          compareDesc(parse(a.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date()),
              parse(b.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date())
          )
      );
    } else if (selectedOrder === "oldest") {
      filteredLibraryItems.sort((a, b) =>
          compareAsc(parse(a.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date()),
              parse(b.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date())
          )
      );
      filteredStoredLibraryItems.sort((a, b) =>
          compareAsc(parse(a.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date()),
              parse(b.createdOn, 'dd-MM-yyyy HH:mm:ss', new Date())
          )
      );
    }

    // Update the filtered lists accordingly
    setLibraryCopyItem(filteredLibraryItems);
    setStoredLibraryCopyItem(filteredStoredLibraryItems);
  };

  /**
   * Apply filters when selected filters change
   */
  useEffect(() => {
    applyFilters();
  }, [selectedCategoryFilters, selectedFormatFilters, selectedOrder]);
  /**
   * Reset filtered lists when original items change
   */
  useEffect(() => {

    setLibraryCopyItem(libraryItems)
    setStoredLibraryCopyItem(storedLibraryItems)

  }, [libraryItems, storedLibraryItems]);

  useEffect(() => {
    setDoResetFilter(prevState => prevState+1)
  }, [currentStoredPaginationIndex]);

  useEffect(() => {
    setDoResetFilter(prevState => prevState+1)
  }, [currentPaginationIndex]);

  return (
    <div className="w-full bg-white">
      <main className="max-w-6xl p-3 mx-auto">

        {
          isLoading ?
              (
                  <div className="flex flex-col h-login-screen w-full items-center justify-center">
                    <PulseLoader color={CONSTANTS.LOADING_SPINNER_COLOR} size={CONSTANTS.DEFAULT_PULSAR_SIZE} className={"m-5 p-5"} />
                  </div>
              )
              :
              (
                  <>
                    <div className="my-3 flex flex-row w-full items-center justify-between">
                      <h1 className="font-semibold text-2xl acu-blue">Biblioteca</h1>
                      <VscSettings
                          size={20}
                          className="md:hidden"
                          onClick={() => setShowFilters(true)}
                      />
                    </div>

                    <section className="flex flex-row gap-6 pt-6">

                      <LibraryFilters
                          selectedCategoryFilters={selectedCategoryFilters}
                          setSelectedCategoryFilters={setSelectedCategoryFilters}
                          selectedFormatFilters={selectedFormatFilters}
                          setSelectedFormatFilters={setSelectedFormatFilters}
                          selectedOrder={selectedOrder}
                          setSelectedOrder={setSelectedOrder}
                          setShowFilters={setShowFilters}
                          showFilters={showFilters}
                          doResetFilters={doResetFilter}
                      />

                      <div className="flex-1">
                        <TabView
                            activeIndex={activeIndex}
                            onTabChange={(e) => {
                              setActiveIndex(e.index)
                              if(e.index === 1)
                                setStoredPagination(true)
                              else
                                setStoredPagination(false)
                            }}
                        >
                          {/*//TODO -> Ambos TabPabels deben tener el alto de la pagina....*/}

                          <TabPanel header={`Resultados (${libraryCopyItem.length})`}>
                            <LibraryItem items={libraryCopyItem} removeItem={removeItem} pushHandler={pushOnAdd}/>
                          </TabPanel>

                          <TabPanel header={`Guardados (${storedLibraryCopyItem.length})`}>
                            <LibraryItem items={storedLibraryCopyItem} removeItem={removeFromStored} isStored={true}/>
                          </TabPanel>

                        </TabView>
                      </div>
                    </section>

                    <section className="my-20">

                      {
                        storedPagination
                          ?
                            (
                                <Paginator
                                    currentPaginationIndex={currentStoredPaginationIndex}
                                    setCurrentPaginationIndex={setCurrentStoredPaginationIndex}
                                    total={storedTotalElements}
                                    displayPerPage={displayPerPage}
                                    loading={storedSpinnerLoading}
                                />
                            )
                            :
                            (
                                <Paginator
                                    currentPaginationIndex={currentPaginationIndex}
                                    setCurrentPaginationIndex={setCurrentPaginationIndex}
                                    total={totalElements}
                                    displayPerPage={displayPerPage}
                                    loading={spinnerLoading}
                                />
                            )
                      }

                    </section>
                  </>
              )
        }
      </main>
    </div>
  );
};

export default Library;
