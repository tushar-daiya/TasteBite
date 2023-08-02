import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
function Carousel({ carouselTitle, isCuisine }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const check = localStorage.getItem(carouselTitle);
    if (check) {
      setData(JSON.parse(check));
    } else {
      try {
        let apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${
          process.env.REACT_APP_API_KEY
        }&number=10${isCuisine ? `&cuisine=${carouselTitle}` : ""}`;
        const apiData = await fetch(apiUrl);
        if (apiData.ok) {
          const response = await apiData.json();
          if (response) {
            localStorage.setItem(
              carouselTitle,
              JSON.stringify(response?.recipes)
            );
            setData(response?.recipes);
          } else {
            throw new Error("No data found");
          }
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <h3 className="text-xl font-bold mb-4">{carouselTitle}</h3>
      {loading
        ? [1, 2, 3, 4].map((index) => {
            return <Skeleton key={index} />;
          })
        : data.length > 0 && (
            <Slider className="" {...settings}>
              {data?.map((element) => {
                return (
                  <Card key={element.id}>
                    <Link to={`/recipe/${element.id}`}>
                      <p>{element.title}</p>
                      <ImageOverlay />
                      <img src={element.image} alt="" />
                    </Link>
                  </Card>
                );
              })}
            </Slider>
          )}
      {errorMessage.length > 0 && (
        <p className="text-lg text-red-800">{errorMessage}</p>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 1080px;
  @media only screen and (max-width: 1024px) {
    margin: 2rem;
  }
  @media only screen and (max-width: 600px) {
    margin: 2rem 1rem;
  }
`;
const Card = styled.div`
  overflow: hidden;
  position: relative;
  padding: 0 10px;
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
export default Carousel;
