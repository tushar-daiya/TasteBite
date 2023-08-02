import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Item from "../components/Item";
import Skeleton from "../components/Skeleton";
import ErrorComponent from "../components/ErrorComponent";
function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("query");
  const [result, setResult] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSearchResults(queryValue);
  }, [queryValue]);
  const getSearchResults = async () => {
    setLoading(true);
    try {
      const apiData = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${queryValue}&apiKey=${process.env.REACT_APP_API_KEY}&number=20`
      );
      if (!apiData.ok) {
        throw new Error("Something went wrong");
      }

      const data = await apiData.json();
      if (data.results.length > 0) {
        setResult(data.results);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <>
          <h2 className="text-xl font-bold my-4 px-2">
            Showing Results for{" "}
            <span className="capitalize italic ">{queryValue}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </>
      ) : result.length > 0 ? (
        <>
          <div className="flex flex-wrap mb-8 ">
            {result?.map((element) => {
              return <Item element={element} key={element.id} />;
            })}
          </div>
        </>
      ) : (
        <ErrorComponent errorMessage={error} />
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0rem auto;
`;

export default SearchResults;
