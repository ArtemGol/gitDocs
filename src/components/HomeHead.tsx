import React from 'react';
import styled from "styled-components";
import { homeImage } from '../accets/images/home';
import {CustomInput} from "./ui/CustomInput";

export const Home = () => {
  return (
  <HomeHead>
    <Help>
      <Title>Need help?</Title>
      <CustomInput placeholder={'Search topics, products...'}/>
    </Help>
    <HomeImage xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1163.67 358.83">
      {homeImage}
    </HomeImage>
  </HomeHead>
  );
}

const HomeImage = styled.svg`
  width: 100%;
  @media screen and (min-width: 1012px){
    height: 190px;
  }
  @media screen and (max-width: 1012px){
    height: 100%;
    padding: 3% 0 0 0;
  }
`

const HomeHead = styled.div`
  width: 100%;
  
  background-color: #F6F8FA;
  padding: 0 5% 0 5%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (min-width: 1012px){
    height: 250px;
    grid-gap: 5%;
  }
  @media screen and (max-width: 1012px){
    flex-direction: column-reverse;
    grid-gap: 50px;
  }
`

const Title = styled.h1`
  font-size: 34px;
  font-weight: 500;
  color: #24292E;
`

const Help = styled.div`
  display: flex;
  height: 80%;
  align-items: flex-start;
  grid-gap: 20px;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1012px){
    width: 60%;
  };
  @media screen and (max-width: 1012px){
    width: 100%;
    margin-bottom: 50px;
  };
`
