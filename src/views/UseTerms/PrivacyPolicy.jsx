/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import TermsPolicy from "./TermsPolicy";
import {PRIVACY_POLICY_CONFIG} from "../../config/config";

const PrivacyPolicy = () => {
    return(
        <TermsPolicy
            topics={PRIVACY_POLICY_CONFIG.TOPICS}
            title={PRIVACY_POLICY_CONFIG.TITLE}
            header={PRIVACY_POLICY_CONFIG.HEADER}
            subheader={PRIVACY_POLICY_CONFIG.SUBHEADER}
            useRomans={true}
        />
    );
}

export default PrivacyPolicy