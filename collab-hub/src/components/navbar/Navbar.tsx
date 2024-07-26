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
  let navigate = useNavigate();

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
    {
      key: "Chat",
      value: "Chat",
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
        <Logo>CollabHub</Logo>
        <NavLinks>
          <NavLink onClick={() => navigate("/home")}>Home</NavLink>
          <NavLink onClick={() => navigate("/chat")}>Chat</NavLink>
          <NavLink onClick={() => navigate("/faqs")}>FAQs</NavLink>
          <NavLink onClick={() => navigate("/contact-us")}>Contact Us</NavLink>
        </NavLinks>
      </NavContainer>
    </>
  );
};

export default Navbar;
