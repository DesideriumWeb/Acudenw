/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {PORTAL_ROUTES} from "../../config/config";
import {AuthToken} from "../../services/AuthToken";
/**
 * PrivateRoute Component
 * This component is used to create a private route that requires authentication.
 * It checks if the user is logged in and redirects to the landing page if not.
 *
 * Props:
 * children: React elements to be rendered within the private route.
 *
 * Usage:
 * <PrivateRoute>
 * // Content to be displayed for authenticated users
 * </PrivateRoute>
 */
const PrivateRoute = ({ children }) => {

    const { isLoggedIn } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthToken.get()) {
            navigate(PORTAL_ROUTES.LANDING_ROUTE);
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null;
};

export default PrivateRoute