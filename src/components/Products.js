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
//    const promise = axios.get(`http://localhost:5000/cursos`);
     const promise=axios.get(`https://ambitious-api.herokuapp.com/cursos`);
    promise
      .then((res) => {
        setCourses([]);
        setCourses([...res.data]);
        console.log(res.data);
      })
      .catch((error) => console.log("deu ruim", error));
  }, []);

  function addToCart(course) {
    const { token } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (user) {

        // const promise = axios.post(`http://localhost:5000/carrinho`,course,config);

      const promise = axios.post(
        `https://ambitious-api.herokuapp.com/carrinho`,
        course,
        config
      );

      promise
        .then((res) => {
          console.log(res);
          navigate("/carrinho");
        })
        .catch((error) => console.log("deu ruim", error));
    } else {
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

              <div>
                <Rating readonly size={30} ratingValue={el.rate} />
                <span>R${el.price}.00</span>
                <button onClick={() => addToCart(el)}>Comprar</button>
              </div>
            </Item>
          );
        })}
      </Shelf>
      <SideBar display={display}>
        {user ? (
          <Container>
          <Item>
            <h3>{user.name}</h3>
          </Item>
          <Item>
            <button onClick={() => navigate("/login")}>Sair/Novo Login</button>
          </Item>
          <Item>
            <button>Meus Cursos:</button>
          </Item>
          <MeusCursos>
          {user.owned.map((el, index) => {
            return(
            <div key={index}>
              {el.name}
            </div>
            )
          })}
          </MeusCursos>
          <Item>
            <button onClick={() => setDisplay(!display)}>Voltar</button>
          </Item>
         </Container>
        ) : (
          <Item>
            <button onClick={() => navigate("/cadastro")}>Cadastrar</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </Item>
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
const MeusCursos = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding:10px;
  max-height:35%;
  overflow-y: scroll;
  scrollbar-color: black;
  z-index: 2;
  margin-bottom: 10px;
  margin-top: 10px;
  div {
    font-family: "Ubuntu Mono";
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  scrollbar-color: #fafafa;
`;

const Header = styled.header`
  background-color: #000000;
  /* max-width: 612px; */
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
  font-family: "Libre Barcode 128 Text", cursive;
  font-weight: 700;
  font-size: 60px;
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
  gap: 10px;
`;
const Item = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px;
  border-style: solid;
  border-color: #000000;
  padding: 20px 0;
  gap: 18px;
  img {
    margin-right: 20px; 
    max-width: 412px;
    max-height: 220px;
    border-radius: 4px;
    margin: 5px;
  }
  h3 {
    font-weight: 700;
  }
  div {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }
  button {
    background-color: #ff9900;
    border: none;
    border-radius: 4px;
    width: 100px;
    height: 40px;
    font-weight:600;
    font-size: 20px;
  }
  span{
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
  }
`;

const Menu = styled.footer`
  background-color: #000000;
  /* max-width: 612px; */
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
  color: #ff9900;
`;

const SideBar = styled.div`
  background-color: #708090;
  position: fixed;
  right: 0;
  top: 0vh;
  width: 300px;
  height: 90vh;
  z-index: 2;
  border-radius: 10px 0 0 10px;
  display: ${({ display }) => (display ? "flex" : "none")};
  padding: 15px;

  h3 {
    color: white;
    font-size: 40px;
    font-family: "Ubuntu Mono", monospace;
  }
`;
