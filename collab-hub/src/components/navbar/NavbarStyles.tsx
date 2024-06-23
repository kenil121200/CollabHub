import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 6px 6px 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensures the navbar stays on top of other elements */
`;

export const TabsOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 50%;
  //   justify-content: space-between;
  padding-right: 12px;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-left: 16px;
`;
export const Option = styled.div<{ currentSelectd: boolean }>`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 16px;
  //   background: ${(props) =>
    props.currentSelectd ? "#796BCD" : " #6c98da"};
  &:hover {
    background-color: #1d85e4;
  }
  cursor: pointer;
`;

export const ProfileIconBg = styled.div`
  display: flex;
  border-radius: 50%;
  height: 70%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const Header = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ffffff
  margin-right: 5px;
`;
export const Icon = styled.div``;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 8px;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 15px;
  padding: 8px 8px 8px 8px;
`;

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ffffff
  margin-right: 5px;
`;
