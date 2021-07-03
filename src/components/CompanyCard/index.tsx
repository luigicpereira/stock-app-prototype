import React, { useMemo, useRef } from "react";

import { Container, Symbol, Name, PercentageInfo, GeneralInfo } from "./styles";

import { useAppDispatch } from "../../app/hooks";
import { selectStock, toggleFavoriteStock } from "../../store/Stock.store";

import { ReactComponent as GraphUpIcon } from "../../assets/graph-up.svg";
import { ReactComponent as GraphDownIcon } from "../../assets/graph-down.svg";
import filledStarIcon from "../../assets/star.svg";
import emptyStarIcon from "../../assets/star2.svg";

interface CompanyCardProps {
  logoURL: string;
  symbol: string;
  name: string;
  changePercent: number;
  favorited?: boolean;
  showFavoriteOption?: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  logoURL,
  symbol,
  name,
  changePercent,
  favorited,
  showFavoriteOption,
}) => {
  const positiveVariation = useMemo(() => changePercent >= 0, [changePercent]);

  const dispatch = useAppDispatch();
  const favoriteButtonRef = useRef(null);

  return (
    <Container
      onClick={(e) => {
        if (e.target !== favoriteButtonRef.current) {
          dispatch(selectStock(symbol));
        }
      }}
    >
      <GeneralInfo>
        {showFavoriteOption && (
          <button
            style={{ marginRight: 10 }}
            onClick={() => {
              dispatch(toggleFavoriteStock(symbol));
            }}
          >
            {favorited ? (
              <img
                src={filledStarIcon}
                alt="Favoritada"
                ref={favoriteButtonRef}
              />
            ) : (
              <img
                src={emptyStarIcon}
                alt="Não Favoritada"
                ref={favoriteButtonRef}
              />
            )}
          </button>
        )}
        <img src={logoURL} alt={`${name} logo`} />
        <div>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </div>
      </GeneralInfo>
      <PercentageInfo positiveVariation={positiveVariation}>
        <p>{`${positiveVariation ? "+" : ""}${changePercent.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }
        )}%`}</p>
        {positiveVariation ? <GraphUpIcon /> : <GraphDownIcon />}
      </PercentageInfo>
    </Container>
  );
};

export default CompanyCard;
