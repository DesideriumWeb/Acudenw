/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import TermsPolicy from "./TermsPolicy";
import {USE_TERMS_CONFIG} from "../../config/config";

const UseTerms = () => {
    return(
        <TermsPolicy
            topics={USE_TERMS_CONFIG.TOPICS}
            title={USE_TERMS_CONFIG.TITLE}
            header={USE_TERMS_CONFIG.HEADER}
            subheader={USE_TERMS_CONFIG.SUBHEADER}
            useRomans={true}
        />
    );
}

export default UseTerms