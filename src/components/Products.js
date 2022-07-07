import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Products() {
  const navigate = useNavigate();

  const [rating, setRating] = useState([0, 0, 0]);
  const handleRating = (rate, index) => {
    rating[index] = rate;
    setRating([...rating]);
  };
  const courses = [
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: rating[0],
    },
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: rating[1],
    },
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: rating[2],
    },
  ];

  useEffect(() => {console.log(rating)}, [rating]);

  return (
    <Container>
      <Header>Ambitious</Header>
      <Shelf>
        {courses.map((el, index) => {
          return (
            <Item key={index}>
              <img src={el.img} />
              <h3>{el.name}</h3>
              <p>{el.description}</p>
              {rating.length !== 0 ? (
                <Rating
                  onClick={() => handleRating(rating[index], index)}
                  ratingValue={rating[index]}
                />
              ) : (
                " "
              )}
            </Item>
          );
        })}
      </Shelf>
      <Menu>
        <ion-icon name="home"></ion-icon>
        <ion-icon name="cart-sharp"></ion-icon>
        <ion-icon
          onClick={() => navigate("/cadastro")}
          name="person-sharp"
        ></ion-icon>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #dcdcdc;
  max-width: 612px;
  width: 100%;
  height: 10vh;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  position: fixed;
  top: 0;
  color: #ff9900;
  z-index:1;
`;

const Shelf = styled.div`
  background-color: #f5f5f5;
  min-height: 80vh;
  width: 100%;
  max-width: 612px;
  margin: 10vh 0;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  img {
    border-radius: 4px;
  }
`;

const Menu = styled.footer`
  background-color: #dcdcdc;
  max-width: 612px;
  width: 100%;
  height: 10vh;
  border-radius: 8px 8px 0px 0px;
  font-weight: 700;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  position: fixed;
  bottom: 0;
`;
