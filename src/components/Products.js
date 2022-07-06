import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Products() {
  const courses = [
    {
      img: "https://smlc.dev/static/media/course-photo.6f1b6e63.png",
      name: "python course",
      description: "Best damn python course",
      rate: 4
    },  
  ];
  const navigate = useNavigate();

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
            </Item>
          );
        })}
      </Shelf>
      <Menu>
        <ion-icon name="home"></ion-icon>
        <ion-icon name="cart-sharp"></ion-icon>
        <ion-icon onClick={() => navigate("/cadastro")} name="person-sharp"></ion-icon>
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
  position:fixed;
  top: 0;
  color: #ff9900;
`;

const Shelf = styled.div`
  background-color: #f5f5f5;
  min-height: 80vh;
  width: 100%;
  max-width: 612px;
  margin: 10vh 0;
`;
const Item = styled.div`
    display:flex;
    flex-direction:column;
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
  position:fixed;
  bottom: 0;
`;
