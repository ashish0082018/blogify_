// components/globals/auth/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { authUser } = useSelector((state: any) => state.user);

  return authUser ? <Outlet /> : <Navigate to="/signin" replace />;
};