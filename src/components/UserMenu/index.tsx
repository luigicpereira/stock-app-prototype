import React from "react";

import { Container, Avatar, Name } from "./styles";

import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down.svg";

const UserMenu: React.FC = () => {
  return (
    <Container>
      <Avatar
        src="https://i.pinimg.com/170x/d4/38/f7/d438f7151a62b0d73c10bc8a1e1b47e1.jpg"
        alt="User Avatar"
      />
      <Name>Luigi Ciccone </Name>
      <ChevronDownIcon />
    </Container>
  );
};

export default UserMenu;
