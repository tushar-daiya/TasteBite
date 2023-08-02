import React, { useState } from "react";
import styled from "styled-components";

function Ingredient({ ingredients }) {
  const [hoveredIngredientId, setHoveredIngredientId] = useState(null);

  const handleMouseEnter = (ingredientId) => {
    setHoveredIngredientId(ingredientId);
  };

  const handleMouseLeave = () => {
    setHoveredIngredientId(null);
  };

  return (
    <IngredientImage>
      {ingredients?.map((ingredient) => {
        const { id, image, original } = ingredient;
        return (
          <div
            key={id}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
            className={`relative ${
              hoveredIngredientId === id ? "hovered" : ""
            }`}
          >
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
              alt=""
            />
            <p
              className={`tooltip ${hoveredIngredientId === id ? "show" : ""}`}
            >
              {original}
            </p>
          </div>
        );
      })}
    </IngredientImage>
  );
}

const IngredientImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  /* overflow: hidden; */

  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 2px solid black;
    object-fit: contain;
    mix-blend-mode: darken;

    @media only screen and (max-width: 700px) {
      width: 80px;
      height: 80px;
    }

    @media only screen and (max-width: 500px) {
      width: 60px;
      height: 60px;
    }
  }

  .tooltip {
    position: absolute;
    border-radius: 10px;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(47, 93, 98);
    color: #fff;
    padding: 4px 8px;
    font-size: 12px;
    opacity: 0;
    width: max-content;
    max-width: 100px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .tooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    rotate: 180deg;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(47, 93, 98) transparent transparent transparent;
  }

  /* Show the tooltip when the corresponding image is hovered */
  .hovered .tooltip.show {
    opacity: 1;
  }
`;

export default Ingredient;
