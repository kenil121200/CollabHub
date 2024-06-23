import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  NavContainer,
  TabsOptionsContainer,
  Option,
  Tabs,
  Profile,
  ProfileIconBg,
  Logo,
  NavLink,
  NavLinks,
  Header,
} from "./NavbarStyles";

const Navbar: React.FC<any> = () => {
  const NavOptions = [
    {
      key: "Dashboard",
      value: "Dashboard",
      isSelected: true,
    },
    {
      key: "Send Review",
      value: "Send Review",
      isSelected: false,
    },
    {
      key: "Change settings",
      value: "Change settings",
      isSelected: false,
    },
    {
      key: "Contact us",
      value: "Contact us",
      isSelected: false,
    },
  ];

  const [currentSelected, setCurrentSelected] = useState("Dashboard");
  const [isProfileBgHovered, setIsProfileBgHovered] = useState(false);
  useEffect(() => {
    const handleDocumentClick = () => {
      setIsProfileBgHovered(false);
    };

    if (isProfileBgHovered) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isProfileBgHovered]);

  const onClickOption = (key: string) => {
    setCurrentSelected(key);
  };

  return (
    <>
      <NavContainer>
        {/* <ReviewBoosterIcon height={"125"} width={"74"} /> */}
        {/* {NavOptions.map((option) => {
              return (
                <Option
                  style={{ color: "#ffffff" }}
                  currentSelectd={currentSelected === option.key}
                  onClick={() => onClickOption(option.key)}
                >
                  <Header>{option.value}</Header>
                </Option>
              );
            })} */}
        <Logo>CollabHub</Logo>
        <NavLinks>
          <NavLink>Home</NavLink>
          <NavLink>FAQs</NavLink>
          <NavLink>Contact Us</NavLink>
        </NavLinks>
      </NavContainer>
    </>
  );
};

export default Navbar;
