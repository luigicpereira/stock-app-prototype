import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.aside`
  background: ${colors.white};
  padding: 32px 20px;
`;

export const FavoriteCompaniesContainer = styled.ul`
  margin-top: 32px;

  & li + li {
    margin-top: 32px;
  }
`;

export const FavoriteCompanyItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  list-style: none;

  button {
    margin-left: 8px;
  }
`;
