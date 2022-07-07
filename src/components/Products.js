import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Products() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);  
  const user  = JSON.parse(localStorage.getItem("user"));

  const courses = [
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 60,
    },
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 100,
    },
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 40,
    },
  ];

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
              <div>
                <Rating readonly size={20} ratingValue={el.rate} />
                <button>Comprar</button>
              </div>
            </Item>
          );
        })}
      </Shelf>
      <SideBar display={display}>

        <h3>{ user ? user.name : ""}</h3>

      </SideBar>
      <Menu>
        <ion-icon name="home"></ion-icon>
        <ion-icon name="cart-sharp"></ion-icon>
        <ion-icon
          onClick={() => setDisplay(!display)}
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
  scrollbar-color: #fafafa;
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
  z-index: 1;
`;

const Shelf = styled.div`
  background-color: #f5f5f5;
  min-height: 80vh;
  width: 100%;
  max-width: 612px;
  margin: 10vh 0 8vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const Item = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px;
  border-style: solid;
  border-color: #a9a9a9;
  padding: 20px 0;
  gap: 6px;
  img {
    border-radius: 4px;
    height: 200px;
    object-fit: cover;
    width: 90%;
  }
  h3 {
    font-weight: 700;
  }
  div{
    display:flex;
    justify-content:space-around;
    width: 80%;
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

const SideBar = styled.div`
    background-color:  	 	#808080;
    position:fixed;
    right: 0;
    top: 0vh;
    width: 300px;
    height: 90vh;
    z-index:2;
    border-radius: 10px 0 0 10px;
    display: ${({display}) => display ? "flex" : "none"};
    padding: 6%;
    
    h3 {
        color: white;
        font-size: 40px;
        font-family: 'Ubuntu Mono', monospace;
    }

`;