import React from "react";
import UserMenu from "../UserMenu";

import CompanyCard from "../CompanyCard";

import {
  Container,
  FavoriteCompaniesContainer,
  FavoriteCompanyItem,
} from "./styles";

import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import Subtitle from "../Subtitle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFavoritedStocks,
  toggleFavoriteStock,
} from "../../store/Stock.store";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const favoritedStocks = useAppSelector(selectFavoritedStocks);

  return (
    <Container>
      <UserMenu />
      <Subtitle
        icon={StarIcon}
        text="Empresas favoritas"
        style={{ marginTop: 20 }}
      />
      <FavoriteCompaniesContainer>
        {favoritedStocks.map((company) => (
          <FavoriteCompanyItem key={company.symbol}>
            <CompanyCard
              logoURL={company.logoURL}
              symbol={company.symbol}
              name={company.name}
              changePercent={company.changePercent}
            />
            <button
              onClick={() => dispatch(toggleFavoriteStock(company.symbol))}
            >
              <TrashIcon />
            </button>
          </FavoriteCompanyItem>
        ))}
      </FavoriteCompaniesContainer>
    </Container>
  );
};

export default SideBar;
