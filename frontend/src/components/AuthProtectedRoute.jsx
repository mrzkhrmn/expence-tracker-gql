import { Navigate, Outlet } from "react-router-dom";

export const AuthProtectedRoute = () => {
  const authUser = true;
  return authUser ? <Outlet /> : <Navigate to={"/login"} />;
};
