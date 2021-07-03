import React from "react";

import { Container, Logo, Menu, MenuItem } from "./styles";

import logoImg from "../../assets/logo.png";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";

const MenuBar: React.FC = () => {
  return (
    <Container>
      <Logo src={logoImg} alt="Logo" />
      <Menu>
        <MenuItem active>
          <HomeIcon />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default MenuBar;
