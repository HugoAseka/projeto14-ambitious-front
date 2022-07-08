import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import axios from "axios";

export default function ShoppingCart() {
  const navigate = useNavigate();

  const items = [
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "Python course",
      description: "Best damn python course there is",
      rate: "",
      price: "50",
    },
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "React course",
      description: "Best damn react course there is",
      rate: "",
      price: "60",
    },
    {
      img: "https://eucontador.com.br/wp-content/uploads/2019/10/Como-abrir-empresa-de-Cursos-Online.png",
      name: "Javascript course",
      description: "Best damn js course there is",
      rate: "",
      price: "70",
    },
  ];

  let total = 0;
  calcTotal();
  function calcTotal() {
    for (let i = 0; i < items.length; i++) {
      total += Number(items[i].price.replace(",", "."));
    }
  }

  return (
    <Container>
      <Header>Meu Carrinho</Header>
      <Register>
        {items.length > 0 ? (
          <>
            <Column>
              {items.map((item, index) => (
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
        <Button onClick={() => navigate("/")}>
          <Column>
            <Text>Finalizar compra</Text>
          </Column>
        </Button>
      </Row>
      <Menu>
        <ion-icon onClick={() => navigate("/")} name="home"></ion-icon>
        <ion-icon name="cart-sharp"></ion-icon>
        <ion-icon
          onClick={() => navigate("/cadastro")}
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
  background-color: #dcdcdc;
  width: 100%;
  height: 10vh;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  position: fixed;
  top: 0;
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  margin-bottom: 35px;
  color: #ff9900;
`;

const Menu = styled.footer`
  background-color: #dcdcdc;
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
