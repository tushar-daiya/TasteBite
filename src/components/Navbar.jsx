import React, { useState } from "react";
import "../fonts/font.css";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { ChevronUpCircle } from "lucide-react";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="h-16 bg-[#263A29] border-b-2 border-solid border-white">
      <Wrapper>
        <NavLink to={"/"}>
          <h1
            style={{ fontFamily: "fuerte, sans-serif" }}
            className="text-3xl tracking-wider text-[#F2E3DB]"
          >
            TASTEBITE
          </h1>
        </NavLink>
        <ChevronUpCircle
          color="#dfeeea"
          onClick={menuHandler}
          className={`${menuOpen && "rotate-180"} sm:hidden transition-all`}
        />
        <MobileMenu className={`${menuOpen ? "h-40" : "h-0"}`}>
          <NavLink to={"search?query=italian"}>
            <li>Italian</li>
          </NavLink>
          <NavLink to={"search?query=mexican"}>
            <li>Mexican</li>
          </NavLink>
          <NavLink to={"search?query=american"}>
            <li>American</li>
          </NavLink>
          <NavLink to={"search?query=chinese"}>
            <li>Chinese</li>
          </NavLink>
        </MobileMenu>
        <Navlists>
          <NavLink to={"search?query=italian"}>
            <li>Italian</li>
          </NavLink>
          <NavLink to={"search?query=mexican"}>
            <li>Mexican</li>
          </NavLink>
          <NavLink to={"search?query=american"}>
            <li>American</li>
          </NavLink>
          <NavLink to={"search?query=chinese"}>
            <li>Chinese</li>
          </NavLink>
        </Navlists>
      </Wrapper>
    </nav>
  );
}
const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
`;
const MobileMenu = styled.ol`
  position: absolute;
  background-color: #41644a;
  top: 64px;
  z-index: 100;
  left: 0;
  transition: height 0.3s ease;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: #f2e3db;
  overflow: hidden;
  li {
    margin: 10px 0;
  }

  @media only screen and (min-width: 640px) {
    display: none;
  }
`;
const Navlists = styled.ul`
  display: none;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: white;
  @media only screen and (min-width: 640px) {
    display: flex;
  }
  :hover {
    color: #f2e3db;
    cursor: pointer;
  }
`;
export default Navbar;
