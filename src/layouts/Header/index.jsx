import React from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";

function Header() {
  return (
    <header>
      <TopHeader />
      <div className="lg:min-h-[78px] md:min-h-[72px] min-h-[40px]">
        <MainHeader />
      </div>
    </header>
  );
}

export default Header;
