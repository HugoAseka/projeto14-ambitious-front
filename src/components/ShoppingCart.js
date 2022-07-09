import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

export default function ShoppingCart() {
  dotenv.config();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [checkoutScreen, setCheckoutScreen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [courses, setCourses] = useState([
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "Your cart is empty",
      description: "",
      rate: 0,
      price: 0,
    },
  ]);

  useEffect(() => {
    const { token } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(`https://ambitious-api.herokuapp.com/carrinho`,config);
    // const promise = axios.get(`http://localhost:5000/carrinho`, config);
    promise
      .then((res) => {
        console.log(res.data);
        setCourses([]);
        setCourses([...res.data]);
      })
      .catch((error) => console.log("deu ruim", error));
  }, []);

  function checkout() {
    const { token } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`https://ambitious-api.herokuapp.com/checkout`,null,config);

    // const promise = axios.post(`http://localhost:5000/checkout`,null, config);

    promise
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => console.log("checkout erro", error));
  }

  let total = 0;
  calcTotal();
  function calcTotal() {
    for (let i = 0; i < courses.length; i++) {
      total += Number(courses[i].price);
    }
  }

  return (
    <Container>
      <Header>Ambitious</Header>
      <Register>
        {courses.length > 0 ? (
          <>
            <Column>
              {courses.map((item, index) => (
                <ContainerProduct key={index}>
                  <Row>
                    <img src={item.img}></img> <strong> {item.name} </strong>
                    <h2></h2>
                    {item.description}
                  </Row>
                  <h3>R$ {item.price}</h3>
                </ContainerProduct>
              ))}
            </Column>
            <ContainerProduct>
              <strong>TOTAL</strong>
              <strong>R$ {total}</strong>
            </ContainerProduct>
          </>
        ) : (
          <>
            <ContainerProduct>
              <strong>Esperando pedidos . . .</strong>
            </ContainerProduct>
          </>
        )}
      </Register>
      <Row>
        <Button onClick={() => navigate("/")}>
          <Column>
            <Text>Continuar comprando</Text>
          </Column>
        </Button>
        <Button onClick={() => setCheckoutScreen(!checkoutScreen)}>
          <Column>
            <Text>Finalizar compra</Text>
          </Column>
        </Button>
      </Row>
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
      <Checkout checkoutScreen={checkoutScreen}>
        {courses.map((item, index) => (
          <ContainerCheckout>
            <CheckoutItem key={index}>
              <strong> {item.name} </strong>

              {item.description}
            </CheckoutItem>
            <h3>R$ {item.price}</h3>
          </ContainerCheckout>
        ))}
        <Confirm>
          <strong>TOTAL</strong>
          <strong>R$ {total}</strong>
        </Confirm>
        <Cont>
          <Button onClick={checkout}>Finalizar</Button>
          <Button onClick={() => setCheckoutScreen(!checkoutScreen)}>
            Cancelar
          </Button>
        </Cont>
      </Checkout>
      <Menu>
        <ion-icon onClick={() => navigate("/")} name="home">
          {" "}
        </ion-icon>
        <ion-icon name="cart-sharp"></ion-icon>
        <ion-icon
          onClick={() => setDisplay(!display)}
          name="person-sharp"
        ></ion-icon>
      </Menu>
    </Container>
  );
}
const Text = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;

  color: #ffffff;
`;
const Button = styled.button`
  font-family: "Raleway";
  font-weight: 700;
  width: 155px;
  height: 80px;
  text-align: center;
  background-color: #ff9900;
  color: #ffffff;
  font-size: 21px;
  border: none;
  border-radius: 5px;
  display: flex;
  margin: 7px;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 20px;
    max-width: 140px;
    max-height: 70px;
    border-radius: 4px;
    margin: 5px;
  }
  h2 {
    margin-left: 8px;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ContainerProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 10px;
  min-width: 70vw;
  width: 95%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  border-bottom: 1px solid black;
  strong {
    font-weight: bold;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: 10vh;
`;
const Register = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10vh;
  width: 90%;
  height: 80%;
  background-color: white;
  border-radius: 5px;
  padding-bottom: 10px;
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
  background-color: lightblue;
  position: fixed;
  right: 0;
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

const Checkout = styled.div`
  display: ${({ checkoutScreen }) => (checkoutScreen ? "flex" : "none")};
  height: 800px;
  width: 600px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-300px, -400px);
  background-color: #708090;
  z-index: 2;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  gap: 10px;
  img {
    margin-right: 20px;
    max-width: 140px;
    max-height: 70px;
    border-radius: 4px;
    margin: 5px;
  }
  h2 {
    margin-left: 8px;
  }
`;

const ContainerCheckout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 10px;
  width: 500px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  border-bottom: 1px solid black;
  height: 150px;
  strong {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Confirm = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-around;
  height: 40px;
  margin: 20px 0;
  align-items: center;
  font-weight: 700;
  border: 1px solid black;
  border-radius: 4px;
  background-color: black;
  color: #ff9900;
  font-size: 20px;
`;
const Cont = styled.div`
  display: flex;
`;
