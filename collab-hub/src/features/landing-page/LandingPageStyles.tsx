import styled, { keyframes } from "styled-components";

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
  padding: 12px 12px 12px 12px;
`;

export const Header = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  font-feature-settings: "tnum", "lnum", "case", "ss04";
  color: rgb(37, 37, 37);
`;
export const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const LogosContainer = styled.div`
  margin-top: 48px;
  overflow: hidden;
  padding: 60px 0;
  background: white;
  white-space: nowrap;
  position: relative;

  &:hover .logos-slide {
    animation-play-state: paused;
  }
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

export const LogosSlide = styled.div`
  display: inline-block;
  // animation: ${slide} 15s infinite linear;
`;

export const LogoImage = styled.img`
  height: 50px;
  margin: 0 40px;
`;

export const FooterContainer = styled.div`
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #212529;
  paddding: 48px 48px 48px 48px;
`;

export const DetailsContsiner = styled.div`
  display: flex;
  height: 90%;
  width: 40%;
  flex-direction: column;
  height: ;
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
  margin-top:18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgb(255, 255, 255);
  text-align: center;
}
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
