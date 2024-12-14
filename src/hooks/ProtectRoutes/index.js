import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth";

export const ProtectRoutes = () => {
  const { pathname } = useLocation();
  const { cookies } = useAuth();

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    const { userId, role } = userData;

    if (pathname === "/admin" && cookies.token && userId && role === 1)
      return <Outlet />;

    if (
      pathname !== "/admin" &&
      cookies.token &&
      userId &&
      (role === 2 || role === 3)
    )
      return <Outlet />;
  }

  return <Navigate to="/login" exact />;
};
