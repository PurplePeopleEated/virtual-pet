import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../utils/mutations";

function Navigation() {
  const location = useLocation();
  const activeLink = "text-white font-bold";
  const inactiveLink = "text-slate-900 hover:font-bold";

  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      await logoutUser();

      window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  return (
  <>
    <Link to="/" className="text-lg font-semibold">
      Virtual Pet
    </Link>
      <nav className="flex space-x-4">
        <Link to="/" className={location.pathname === "/" ? activeLink : inactiveLink}>
          Login
        </Link>

        <Link to="/" className={location.pathname === "/" ? activeLink : inactiveLink}>
          Logout
        </Link>

        <Link to="/petdashboard" className={location.pathname === "/projects" ? activeLink : inactiveLink}>
          Pet Dashboard
        </Link>
      </nav>
  </>
  );
}

export default Navigation;

// {location.pathname === "/" ? (
//   AuthService.loggedIn() ? (
//     <Link to="/" onClick={AuthService.logout} className={activeLink}>
//       Logout
//     </Link>
//   ) : (
//     <Link to="/login" className={inactiveLink}>
//       Login
//     </Link>
//   )
// ) : null}
