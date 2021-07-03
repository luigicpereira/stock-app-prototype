import styled from "styled-components";
import colors from "../../styles/colors";

interface MenuItemProps {
  active?: boolean;
}

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${colors.white};
  width: 120px;
  min-width: 120px;
  padding: 20px 24px 20px 0;
`;

export const Logo = styled.img`
  width: 46px;
  height: 46px;
`;

export const Menu = styled.ul`
  margin-top: 50px;
  width: 100%;
`;

export const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  list-style: none;
  position: relative;
  height: 48px;

  cursor: pointer;

  &:hover {
    box-shadow: inset 0px 25px 5px 20px #ffffff,
      inset 0px -10px 5px -5px #f06400;
    transition: box-shadow 0.2s;
  }

  &::before {
    ${(props) => (props.active ? 'content: "";' : "")}
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 48px;

    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;

    background: ${colors.secondary};
  }
`;
