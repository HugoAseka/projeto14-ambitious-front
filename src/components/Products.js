import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 60,
      price: 90,
    },
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 100,
      price: 70,
    },
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course there is",
      rate: 40,
      price: 30,
    },
  ]);

  useEffect(() => {
    const promise = axios.get("https://ambitious-api.herokuapp.com/cursos");

    promise
      .then((res) => {
        setCourses([]);
        setCourses([...res.data]);
      })
      .catch((error) => console.log("deu ruim", error));
  }, []);
  const productCart="";

  function addToCart(id){

    const {token} = user;

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };

    if(user){

      const promise = axios.post("https://ambitious-api.herokuapp.com/carrinho",id,config);

      promise.then((res) => {
        console.log(res)
        navigate("/carrinho");
      }).catch((error) => console.log("deu ruim", error));
      
    }else{
      navigate("/login");
    }
    
  }

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
              <span>R${el.price}.00</span>
              <div>
                <Rating readonly size={20} ratingValue={el.rate} />
                <button onClick={() =>addToCart(el._id)}>Comprar</button>
              </div>
            </Item>
          );
        })}
      </Shelf>
      <SideBar display={display}>
        {user ? (
          <h3>{user.name}</h3>
        ) : (
          <div>
            <p onClick={() => navigate("/cadastro")}>Cadastrar</p>
            <p onClick={() => navigate("/login")}>Login</p>
          </div>
        )}
      </SideBar>
      <Menu>
        <ion-icon name="home"></ion-icon>
        <ion-icon 
        name="cart-sharp"
        onClick={() => navigate("/carrinho")}
        ></ion-icon>
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
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
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
  div {
    display: flex;
    justify-content: space-around;
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
  background-color: #808080;
  position: fixed;
  left: 50%;
  top: 0vh;
  width: 300px;
  height: 90vh;
  z-index: 2;
  border-radius: 10px 0 0 10px;
  display: ${({ display }) => (display ? "flex" : "none")};
  padding: 6%;

  h3 {
    color: white;
    font-size: 40px;
    font-family: "Ubuntu Mono", monospace;
  }
`;
