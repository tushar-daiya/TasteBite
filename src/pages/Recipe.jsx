import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Ingredient from "../components/Ingredient";
import Item from "../components/Item";
import { useEffect } from "react";
import { useState } from "react";
import SkeletonRecipe from "../components/SkeletonRecipe";
import ErrorComponent from "../components/ErrorComponent";
function Recipe() {
  const { id } = useParams();
  useEffect(() => {
    getRecipe(id);
  }, [id]);
  const [recipeInformation, setRecipeInformation] = useState({});
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getRecipe = async (id) => {
    setLoading(true);

    try {
      const apiData1 = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const apiData2 = await fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=5`
      );
      if (!apiData1.ok && !apiData2.ok) {
        throw new Error("Something went wrong");
      }
      const responseRecipe = await apiData1.json();
      const responseSimilar = await apiData2.json();
      setRecipeInformation(responseRecipe[0]);
      setSimilarItems(responseSimilar);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {loading && <SkeletonRecipe />}
      {!loading && (
        <>
          <h1 className="font-bold sm:text-4xl inline-block text-xl mt-8 ml-4 ">
            Recipe for {recipeInformation?.title}
          </h1>

          <span className="sm:text-lg text-sm mx-4 text-gray-600">
            (
            {recipeInformation?.cuisines.map((cuisine, index) => (
              <span key={index}>
                {cuisine}
                {index === recipeInformation?.cuisines.length - 1 ? "" : ","}
              </span>
            ))}
            )
          </span>
          <RecipeContainer>
            <ImageContainer src={recipeInformation?.image} />

            <h3 className="text-xl font-bold text-[#2f5d62]">Ingredients</h3>
            <Ingredient ingredients={recipeInformation?.extendedIngredients} />

            <h3 className="text-xl mt-4 mb-2 font-bold text-[#2f5d62]">
              Instructions {">"}
            </h3>
            <InstructionDiv
              dangerouslySetInnerHTML={{
                __html: recipeInformation?.instructions,
              }}
            ></InstructionDiv>
            <h3 className="text-xl mt-4 mb-2 font-bold text-[#2f5d62]">
              Summary {">"}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: recipeInformation?.summary }}
            ></div>
            <h2 className="text-xl font-bold mt-4 mb-3 text-[#2f5d62]">
              Similar Recipes {">"}
            </h2>

            <div className="flex flex-wrap">
              {similarItems?.map((similarItem) => {
                let imageUrl = `https://spoonacular.com/recipeImages/${similarItem.id}-556x370.jpg`;
                return (
                  <Item
                    key={similarItem.id}
                    element={{
                      id: similarItem.id,
                      title: similarItem.title,
                      image: imageUrl,
                    }}
                  />
                );
              })}
            </div>
          </RecipeContainer>
        </>
      )}
      {error && <ErrorComponent errorMessage={error.message} />}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1080px;
`;
const RecipeContainer = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 2rem;
`;
const ImageContainer = styled.img`
  width: 100%;
  max-width: 700px;

  margin: 2rem auto;
  &:hover {
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.5);
  }
`;
const InstructionDiv = styled.div`
  ol {
    list-style: disc;
    list-style-position: inside;
  }
`;
export default Recipe;
