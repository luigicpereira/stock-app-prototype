import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  flex: 1;

  min-width: 500px;
  margin-left: -24px;
  background: ${colors.gray001};
  border-top-left-radius: 24px;
  padding: 32px 20px 60px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & h1 {
    margin-left: 8px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;

  position: relative;
  height: 40px;

  & > input {
    flex: 1;
    min-width: 300px;
    width: 30%;
    border: 1px solid #e1e0e7;
    border-radius: 8px;
    padding: 8px 16px;
    padding-right: 56px;

    &:hover,
    &:focus {
      border-color: ${colors.primary};
    }

    &::placeholder {
      color: #acacac;
      font-weight: 500;
      line-height: 20px;
    }
  }

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;

    background: ${colors.primary};
    border-radius: 8px;
  }
`;

export const SearchResultContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  max-width: 400px;
  width: 50vw;

  background: ${colors.gray001};
  border: 1px solid #e1e0e7;
  border-radius: 8px;
  box-shadow: 0px 8px 20px -2px rgba(43, 37, 63, 0.1);

  z-index: 999;
`;

export const SearchResultList = styled.ul`
  list-style: none;

  & li + li {
    border-top: 1px solid #e1e0e7;
  }
`;

export const SearchResultItem = styled.li`
  padding: 10px;

  &:hover {
    background: #e1e0e7;
  }

  & > button {
    text-align: start;
  }
`;

export const RecentCompaniesTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: 20px;
`;

export const RecentCompaniesNavigationContainer = styled.div`
  & button {
    color: blue;
  }

  & button + button {
    margin-left: 10px;
  }
`;

export const RecentCompaniesList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: -20px;
  padding: 20px;
  width: calc(100% + 20px);
  list-style: none;
  scroll-behavior: smooth;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  & > li + li {
    margin-left: 20px;
  }
`;

export const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const News = styled.div`
  padding: 10px;
  padding: 16px;
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0px 8px 20px -2px rgba(43, 37, 63, 0.1);
`;
