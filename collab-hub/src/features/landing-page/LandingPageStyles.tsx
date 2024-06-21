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
  animation: ${slide} 15s infinite linear;
`;

export const LogoImage = styled.img`
  height: 50px;
  margin: 0 40px;
`;

// const scroll = keyframes`
// from {
//   transform: translateX(0);
// }
// to {
//   transform: translateX(-100%);
// }
// `;

// export const Slider = styled.div`
//   margin-top: 64px;
//   width: 100%;
//   height: 120px;
//   overflow: hidden;
// `;

// export const SliderTrack = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
// `;

// export const LogoContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   animation: ${scroll} 7s linear infinite;
// `;

// export const Logo = styled.div`
//   width: 100%;
//   height: 100%;
//   margin-left: 4px;
//   border: 1px solid red;
// `;

// // @keyframes slide {
// //   from {
// //     transform: translateX(0);
// //   }
// //   to {
// //     transform: translateX(-100%);
// //   }
// // }

// export const logos = styled.div`
//   overflow: hidden;
//   padding: 60px 0;
//   background: white;
//   white-space: nowrap;
//   position: relative;
// `

// .logos:before,
// .logos:after {
//   position: absolute;
//   top: 0;
//   width: 250px;
//   height: 100%;
//   content: "";
//   z-index: 2;
// }

// .logos:before {
//   left: 0;
//   background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
// }

// .logos:after {
//   right: 0;
//   background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
// }

// .logos:hover .logos-slide {
//   animation-play-state: paused;
// }

// .logos-slide {
//   display: inline-block;
//   animation: 35s slide infinite linear;
// }

// .logos-slide img {
//   height: 50px;
//   margin: 0 40px;
// }
