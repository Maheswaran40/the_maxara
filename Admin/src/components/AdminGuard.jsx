import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import adminApi from "../api/adminApi";

function AdminGuard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      try {
        const response = await adminApi.get("/api/admin/me");

        if (!cancelled) {
          const admin = response.data.admin || response.data.user;

          setIsAdmin(
            response.data.success === true &&
            admin?.role === "admin"
          );
        }
      } catch (error) {
        if (!cancelled) {
          setIsAdmin(false);
          console.log(error);
          
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking admin authentication...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminGuard;