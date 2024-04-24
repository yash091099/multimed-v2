import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const GoToButton = ({ title, goTo }) => {
  return (
    <StyledLink to={`/${goTo}`}>
      <ButtonText>{title}</ButtonText>
      <ArrowIcon />
    </StyledLink>
  );
};

const arrowAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #031b89;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  font-family: "HelveticaNeueMedium", sans-serif;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #021059;
  }
`;

const ButtonText = styled.h1`
  margin: 0;
  font-size: 1rem;
`;

const ArrowIcon = styled(FaArrowRight)`
  margin-left: 0.5rem;
  animation: ${arrowAnimation} 2s infinite;
`;

export default GoToButton;