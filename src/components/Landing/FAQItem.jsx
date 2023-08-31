/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { ReactComponent as PlusIcon } from "../../assets/images/icons/circle-add-icon.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/icons/circle minus solid 1.svg";
import React from "react";
/**
 * The FAQItem component displays a single FAQ item with a question and answer.
 * It allows the user to toggle the answer visibility.
 * @param {string} question - The question for the FAQ item.
 * @param {string} answer - The answer for the FAQ item.
 */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  /**
   * Toggles the visibility of the answer.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
      <div className="grid grid-cols-1 gap-4 pt-4 px-4 rounded-[20px] drop-shadow-md border-solid border-transparent bg-white">
        <div className="flex flex-row gap-2 justify-between items-center row-span-3">
          <h4 className="font-medium">{question}</h4>
          <button onClick={toggleDropdown}>
            {isOpen && <MinusIcon></MinusIcon>}
            {!isOpen && <PlusIcon></PlusIcon>}
          </button>
        </div>

        <div className={`text-sm ${isOpen && "mb-4"}`}>
          {isOpen && <p> {answer} </p>}
        </div>
      </div>
  );
};

export default FAQItem;
