import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

function Item({ element }) {
  return (
    <OuterCard>
      <InnerCard>
        <NavLink to={`/recipe/${element.id}`}>
          <p>{element.title}</p>
          <ImageOverlay />
          <img src={element.image} alt="" />
        </NavLink>
      </InnerCard>
    </OuterCard>
  );
}
const OuterCard = styled.div`
  width: 20%;
  padding: 10px;
  @media only screen and (max-width: 1024px) {
    width: 25%;
  }
  @media only screen and (max-width: 768px) {
    width: 33.33%;
  }
  @media only screen and (max-width: 640px) {
    width: 50%;
  }
  
`;
const InnerCard = styled.div`
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 90%;
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
    @media only screen and (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  }
`;
export default Item;
