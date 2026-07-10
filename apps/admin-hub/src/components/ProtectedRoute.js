import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { useAuth } from '@lumina/data-access';
export default function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();
    React.useEffect(() => {
        if (!isLoading && !user) {
            const env = import.meta.env || {};
            const landing = env.VITE_LANDING_URL || window.location.origin;
            const redirectTo = `${landing.replace(/\/$/, '')}/login?redirect=${encodeURIComponent(window.location.href)}`;
            window.location.href = redirectTo;
        }
    }, [isLoading, user]);
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (!user)
        return null;
    return _jsx(_Fragment, { children: children });
}
