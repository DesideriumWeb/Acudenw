/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import React, { useEffect, useState } from "react";
import { FREQUENTSQUESTIONS, STRINGS } from "../../../config/config";
import FAQItem from "../../Landing/FAQItem";
import useFrequentQuestions from "../../../hooks/HelpCenterAQS/useFrequentQuestions";
/**
 * componente que representa las cards de preguntas frecuentes
 * @returns
 */
export const FrequentQuestionHelpCenterAQS = () => {
  const [datFrequentQuestions, setFrequentQuestions] = useState([]);
  const { dataFrequentQuestions } = useFrequentQuestions();
  /**
   * useEffect que supervisa la data que viene del endpoint de videos o de el hard code
   */
  useEffect(() => {
    if (dataFrequentQuestions) {
      setFrequentQuestions(dataFrequentQuestions);
    }
  }, [dataFrequentQuestions]);
  return (
    <section id={STRINGS.MENU_BUTTON_FREQUENT_QUESTIONS} className="p-3 py-10">
      <div className="flex flex-col w-full max-w-6xl mx-auto">
        <h1 className="my-3 text-2xl font-semibold">
          {STRINGS.HELP_CENTER_FREQUENT_QUESTIONS}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-y-4">
          {datFrequentQuestions && datFrequentQuestions?.map((item, index) => {
            return (
              <div key={index}>
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
