/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, {useMemo, useState} from "react";
import {IoInformationCircle} from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";
import { TabView } from "primereact/tabview";
import { TabPanel } from "primereact/tabview";
import {
  getMonthOptions
} from "../../components/utils";
import useCalendar from "../../hooks/Calendar/useCalendar";
import Paginator from "../../components/Paginator";
import CalendarItems from "./CalendarItems";
import {PulseLoader} from "react-spinners";
import {CALENDAR_TUTORIAL_STEPS, CONSTANTS} from "../../config/config";
import useCalendarUser from "../../hooks/Calendar/useCalendarUser";
import Joyride, {STATUS} from "react-joyride";
import {AuthToken} from "../../services/AuthToken";

/**
 * The Calendar component displays a calendar view and events based on the selected date.
 * It includes tabs to switch between all events and user-specific events.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const Calendar = () => {

  const typeOfUser = AuthToken.getUserRole()
  const email = AuthToken.getUserEmail()
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0)
  const displayPerPage = 10
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dateChosen, setDateChosen] = useState(new Date().toISOString().split("T")[0])
  const [runTutorial, setRunTutorial] = useState(false);
  const [calendarRefresh, setCalendarRefresh] = useState(0)

  const { events, totalPages, totalElements, isLoading, spinnerLoading, inError, errorMsg } = useCalendar(dateChosen, currentPaginationIndex, displayPerPage, calendarRefresh)

  const {
    events: eventsUser,
    totalPages: totalPagesUser,
    totalElements: totalElementsUser,
    isLoading: isLoadingUser,
    spinnerLoading: spinnerLoadingUser,
    inError: inErrorUser,
    errorMsg: errorMsgUser
  } = useCalendarUser(dateChosen, currentPaginationIndex, displayPerPage, calendarRefresh);

  const options = useMemo(() => getMonthOptions(), []);

  /**
   * Event handler for date selection.
   *
   * @param {Object} dateSelected - The selected date.
   */
  const dateSelectHandler = (dateSelected) => {
    setDateChosen(dateSelected.value)
  }
  /**
   * Handles the completion of the tutorial.
   * This method is called when the tutorial is finished or skipped.
   *
   * @param {object} data - The tutorial completion data.
   * @param {string} data.status - The status of the tutorial (e.g., "FINISHED", "SKIPPED").
   * @param {string} data.type - The type of the tutorial.
   */
  const handleTutorialFinish = (data) => {

    const { status, type } = data;

    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
    }
  };
  /**
   * Tutorial start controller.
   */
  const handleStartTutorial = () => {
    setRunTutorial(true);
  };

  return (
    <div className="w-full bg-white">
      {
        isLoading || isLoadingUser ?
            (
                <div className="flex flex-col h-login-screen w-full items-center justify-center">
                  <PulseLoader
                      color={CONSTANTS.LOADING_SPINNER_COLOR}
                      size={CONSTANTS.DEFAULT_PULSAR_SIZE}
                      className="m-5 p-5"
                  />
                </div>
            )
            :
            (
                <>
                  <Joyride
                      steps={CALENDAR_TUTORIAL_STEPS}
                      run={runTutorial}
                      continuous={true}
                      disableScrolling={true}
                      showProgress={true}
                      showSkipButton={true}
                      callback={handleTutorialFinish}
                      styles={{
                        options: {
                          primaryColor: '#0369a1',
                        },
                      }}
                  />
                  <main className="max-w-6xl p-3 mx-auto">
                    <div className="py-6 flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-3">
                        <h1 className="font-semibold text-2xl">Calendario</h1>
                        <Dropdown
                            className="text-xs text-cyan-900 acu-cal-step-2"
                            placeholder="Select Month"
                            value={dateChosen}
                            options={options}
                            onChange={dateSelectHandler}
                        />
                      </div>
                      <div className="font-bold text-cyan-900 flex flex-row gap-1 items-center acu-cal-step-1" onClick={handleStartTutorial}>
                        <IoInformationCircle size={24} className="acu-cal-step-5"/>
                        Tutorial
                      </div>
                    </div>

                    <section className="my-6">
                      <TabView
                          activeIndex={activeIndex}
                          onTabChange={(e) => setActiveIndex(e.index)}
                      >

                        <TabPanel header={`Resultados (${events.length ?? 0})`}>
                          <CalendarItems
                              typeOfUser={typeOfUser}
                              email={email}
                              events={events}
                              inError={inError}
                              errorMsg={errorMsg}
                              setRefresh={setCalendarRefresh}
                          />
                        </TabPanel>

                        {
                          typeof typeOfUser === 'string' && typeOfUser.includes('EMPLOYEE')
                              ?
                              (
                                  <TabPanel header={`Mis eventos (${eventsUser.length ?? 0})`} className="acu-cal-step-4">
                                    <CalendarItems
                                        typeOfUser={typeOfUser}
                                        email={email}
                                        events={eventsUser}
                                        inError={inErrorUser}
                                        errorMsg={errorMsgUser}
                                        enableRegistration={false}
                                        setRefresh={setCalendarRefresh}
                                    />
                                  </TabPanel>
                              )
                              : null
                        }
                      </TabView>
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
                  </main>
                </>
            )
      }
    </div>
  );
};

export default Calendar;
