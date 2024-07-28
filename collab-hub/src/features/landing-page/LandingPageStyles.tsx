//@ Author: B00981839-Krutik Kulkarni

import styled, { keyframes } from "styled-components";

const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 12px;
`;

export const Header = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  color: rgb(37, 37, 37);
`;

export const LogosContainer = styled.div`
  margin-top: 48px;
  overflow: hidden;
  padding: 60px 0;
  background: white;
  position: relative;
`;

export const LogosSlide = styled.div`
  display: flex;
  width: 100%; /* Adjust width to allow for horizontal scrolling */
  animation: ${slide} 20s linear infinite;
`;

export const LogoImage = styled.img`
  height: 50px;
  margin: 0 20px; /* Adjust spacing between logos */
`;

export const FooterContainer = styled.div`
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #000000;
  padding: 48px;
`;

export const DetailsContsiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

export const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.5;
  color: rgb(255, 255, 255);
  text-align: center;
`;

export const Text = styled.div`
  margin-top: 18px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgb(255, 255, 255);
  text-align: center;
`;

export const FollowUsContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

export const FollowIcons = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  content: "";
  z-index: 2;
`;

export const LeftOverlay = styled(GradientOverlay)`
  left: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
`;

export const RightOverlay = styled(GradientOverlay)`
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
`;
