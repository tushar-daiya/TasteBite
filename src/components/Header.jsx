import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "styled-components";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    if (searchInput.trim().length === 0 || searchInput.length === 0) {
      toast.error("Invalid search term", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      navigate(`/search?query=${searchInput}`);
      setSearchInput("");
    }
  };
  return (
    <div className="relative flex items-center justify-center ">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <img className="h-80 w-full object-cover" src="/headerImage.jpg" alt="" />
      <SearchInput>
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          type="text"
          placeholder="Search recipes"
        />
        <button type="button" onClick={handleClick}>
          Search
        </button>
      </SearchInput>
      <Overlay />
    </div>
  );
}

const SearchInput = styled.div`
  color: white;
  gap: 10px;
  /* overflow: hidden; */
  position: absolute;

  width: 80%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  z-index: 10;

  input {
    width: 100%;
    background: transparent;
    outline: none;
    padding: 10px;
    height: 50px;
    border: 2px solid white;
  }
  button {
    background-color: #41644a;
    padding: 0 1rem;
    height: 35px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #263a29;
    }
  }
  @media only screen and (min-width: 640px) {
    border-radius: 10px;
    border: 2px solid white;
    flex-direction: row;
    input {
      border: none;
    }
    button {
      height: 50px;
      border-radius: 0 10px 10px 0;
    }
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

export default Header;
