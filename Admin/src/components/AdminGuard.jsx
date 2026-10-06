import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

function AdminGuard() {
  const location = useLocation();

  const isAdmin =
    localStorage.getItem("maxaraAdmin");

  if (!isAdmin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default AdminGuard;