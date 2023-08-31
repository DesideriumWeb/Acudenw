import {useEffect, useState} from "react";
import ProviderService from "../../services/userServices/ProviderService";

export default function useGetProviderInvitations(retrySearch) {
    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        const fetchPendingInvitations = async () => {
            const result = await new ProviderService().getProviderInvitations()
            setInvitations(result.filter((item) => item.invitationStatus === "SENT"))
        }

        fetchPendingInvitations()
    }, [retrySearch])

    return invitations
}