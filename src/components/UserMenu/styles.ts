import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(0, 71, 187, 0.2);
  border-radius: 999px;
  padding: 2px;
  padding-right: 10px;

  cursor: pointer;

  &:hover {
    border-color: ${colors.secondary};
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Name = styled.p`
  color: ${colors.primary};
  font-weight: 500;
  margin-right: 10px;
  margin-left: 10px;
`;
