import React from "react";
import Navigation from "./Navigation";

function Header() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-purple-800 p-4 mb-10">
      <Navigation />
    </nav>
  );
}

export default Header;