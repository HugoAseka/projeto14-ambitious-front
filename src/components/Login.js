import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  function Login(event) {
    event.preventDefault();
    setIsLoading(true);
    const postLogin = {
      email,
      password,
    };

    const promise=axios.post(`https://ambitious-api.herokuapp.com/login`,postLogin);

    // const promise = axios.post("http://localhost:5000/login", postLogin);

    promise.then((resposta) => {
      setEmail("");
      setPassword("");
      setIsLoading(false);
      console.log(resposta.data);
      setUser({
        name: resposta.data.name,
        token: resposta.data.token,
        cart: resposta.data.cart,
        owned: resposta.data.owned,
      });
      //armazenando resposta.data no localStorage
      const userString = JSON.stringify(resposta.data);
      localStorage.removeItem("user");
      localStorage.setItem("user", userString);
      navigate("/");
    });
  }

  return (
    <Container>
      <Logo>Ambitious</Logo>
      {isLoading ? (
        <Form background={"#fafafa"} color={"#afafaf"}>
          <input
            disabled
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            disabled
            type="password"
            id="password"
            value={password}
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled opacity={0.7}>
            {<ThreeDots color={"#ffffff"} width={51} />}
          </button>
        </Form>
      ) : (
        <Form background={"#fafafa"} color={"#000000"} onSubmit={Login}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </Form>
      )}
      <Link to="/cadastro">Primeiro acesso? Cadastre-se!</Link>
    </Container>
  );
}
const Logo = styled.h1`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  margin-bottom: 35px;
  color: #ff9900;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  background-color: #FFEFD5;
  font-family: "Raleway";

  a {
    margin-top: 20px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    text-decoration: none;

    color: black;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 36px;
  margin-left: 36px;

  input {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    height: 45px;
    margin-right: 36px;
    margin-left: 36px;
    min-width: 100px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
  }
  input::placeholder {
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  button {
    font-family: "Raleway";
    font-weight: 700;
    min-width: 100px;
    height: 45px;
    margin-right: 36px;
    margin-left: 36px;
    text-align: center;
    background-color: black;
    color: #ffffff;
    font-size: 21px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
`;
