/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import Banner from "../components/Landing/Banner";
import Tools from "../components/Landing/Tools";
import ForWhom from "../components/Landing/ForWhom";
import FAQs from "../components/Landing/FAQs";
/**
 * The Landing component represents the landing page of the application.
 * It displays various sections such as Banner, Tools, ForWhom, and FAQs.
 * @returns {JSX.Element} The JSX element representing the Landing component.
 */
const Landing = () => {
    return(
      <>
          <Banner/>
          <Tools/>
          <ForWhom/>
          <FAQs/>
      </>
    );
}

export default Landing