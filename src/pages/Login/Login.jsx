import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import {SiGmail} from "react-icons/si"
import { Link } from "react-router-dom";

const Login = () => {
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
    const GmailBackground =
    "linear-gradient(to right, #4285F4 , #BB001B , #EA4335 , #FBBC05 , #34A853 )";
  return (
    <MainContainer>
      <MainBox>
        <WelcomeText>Welcome</WelcomeText>
        <InputContainer>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Mật Khẩu" />
        </InputContainer>
        <ButtonContainer>
          <Button content="Đăng Nhập" />
        </ButtonContainer>
        <LoginWith>Hoặc Đăng Nhập Với</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FacebookOutlined />
          </Icon>
          <Icon color={InstagramBackground}>
            <InstagramOutlined />
          </Icon>
          <Icon color={GmailBackground}>
          <SiGmail/>
          </Icon>
        </IconsContainer>
        <ForgotPassword>Bạn Chưa Có Tài Khoản? <Link to="/signup">Đăng Ký</Link></ForgotPassword>
      </MainBox>
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.span`
  color: black;
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.span`
  color: black;
  cursor: pointer;
`;
