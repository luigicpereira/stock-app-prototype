import React, { useEffect, useRef, useState } from "react";

import {
  Container,
  RecentCompaniesList,
  RecentCompaniesNavigationContainer,
  RecentCompaniesTitleContainer,
  SearchContainer,
  SearchResultContainer,
  SearchResultItem,
  SearchResultList,
  TitleContainer,
} from "./styles";

import Subtitle from "../../components/Subtitle";
import CompanyCard from "../../components/CompanyCard";
import CompanyChart from "../../components/CompanyChart";

import { ReactComponent as DashboardIcon } from "../../assets/dashboard.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as StatsIcon } from "../../assets/stats.svg";
import { ReactComponent as ChevronLeft } from "../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";

import nyseListed from "../../assets/nyse-listed.json";
import nasdaqListed from "../../assets/nasdaq-listed.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectRecentStocks,
  selectSelectedStock,
  selectStock,
} from "../../store/Stock.store";

interface CompanyForSearch {
  symbol: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const recentStocks = useAppSelector(selectRecentStocks);

  const recentCompaniesRef = useRef(null);

  const [searchInputHasFocus, setSearchInputHasFocus] = useState(false);
  const [textToSearch, setTextToSearch] = useState("");
  const [allCompaniesForSearch, setAllCompaniesForSearch] = useState<
    CompanyForSearch[]
  >([]);
  const [searchResults, setSearchResults] = useState<CompanyForSearch[]>([]);

  const [recentComapaniesNavigation, setRecentComapaniesNavigation] = useState({
    isAtStart: true,
    isAtEnd: false,
  });

  const selectedStock = useAppSelector(selectSelectedStock);

  useEffect(() => {
    const nyseListedNormalized: CompanyForSearch[] = nyseListed.map(
      (company) => {
        return {
          symbol: company["ACT Symbol"],
          name: company["Company Name"],
        };
      }
    );

    const nasdaqListedNormalized: CompanyForSearch[] = nasdaqListed.map(
      (company) => {
        return {
          symbol: company["Symbol"],
          name: company["Company Name"],
        };
      }
    );

    const allListed = nyseListedNormalized.concat(nasdaqListedNormalized);

    setAllCompaniesForSearch(
      allListed.sort(
        (companyA: CompanyForSearch, companyB: CompanyForSearch) => {
          return companyA.symbol < companyB.symbol ? -1 : 1;
        }
      )
    );
  }, []);

  useEffect(() => {
    if (textToSearch.length) {
      const allCompaniesForSearchFiltered = allCompaniesForSearch.filter(
        (company) =>
          company.symbol.toUpperCase().includes(textToSearch.toUpperCase()) ||
          company.name.toUpperCase().includes(textToSearch.toUpperCase())
      );

      const allCompaniesForSearchFilteredAndSorted =
        allCompaniesForSearchFiltered.sort((companyA, companyB) => {
          let rankA: number;
          if (companyA.symbol.toUpperCase() === textToSearch.toUpperCase()) {
            rankA = 1;
          } else if (
            companyA.symbol.toUpperCase().startsWith(textToSearch.toUpperCase())
          ) {
            rankA = 2;
          } else if (
            companyA.name.toUpperCase().startsWith(textToSearch.toUpperCase())
          ) {
            rankA = 3;
          } else if (
            companyA.symbol.toUpperCase().includes(textToSearch.toUpperCase())
          ) {
            rankA = 4;
          } else if (
            companyA.name.toUpperCase().includes(textToSearch.toUpperCase())
          ) {
            rankA = 5;
          } else {
            rankA = 999;
          }

          let rankB: number;
          if (companyB.symbol.toUpperCase() === textToSearch.toUpperCase()) {
            rankB = 1;
          } else if (
            companyB.symbol.toUpperCase().startsWith(textToSearch.toUpperCase())
          ) {
            rankB = 2;
          } else if (
            companyB.name.toUpperCase().startsWith(textToSearch.toUpperCase())
          ) {
            rankB = 3;
          } else if (
            companyB.symbol.toUpperCase().includes(textToSearch.toUpperCase())
          ) {
            rankB = 4;
          } else if (
            companyB.name.toUpperCase().includes(textToSearch.toUpperCase())
          ) {
            rankB = 5;
          } else {
            rankB = 999;
          }

          return rankA < rankB ? -1 : 1;
        });

      setSearchResults(allCompaniesForSearchFilteredAndSorted.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [allCompaniesForSearch, textToSearch]);

  useEffect(() => {
    setTextToSearch("");
  }, [selectedStock]);

  return (
    <Container>
      <TitleContainer>
        <DashboardIcon />
        <h1>Dashboard</h1>
      </TitleContainer>

      <SearchContainer style={{ marginTop: 20 }}>
        <input
          type="text"
          name="search"
          placeholder="Buscar empresa"
          value={textToSearch}
          onFocus={() => {
            setSearchInputHasFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchInputHasFocus(false);
            }, 200);
          }}
          onChange={(event) => {
            setTextToSearch(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              dispatch(selectStock(textToSearch));
            }
          }}
        />
        <button
          onClick={() => {
            dispatch(selectStock(textToSearch));
          }}
        >
          <SearchIcon />
        </button>
        <SearchResultContainer
          hidden={!(searchInputHasFocus && searchResults.length)}
        >
          <SearchResultList>
            {searchResults.map((company) => (
              <SearchResultItem
                key={company.symbol}
                onClick={() => {
                  dispatch(selectStock(company.symbol));
                }}
              >
                <button>
                  <strong>{company.symbol}</strong> - {company.name}
                </button>
              </SearchResultItem>
            ))}
          </SearchResultList>
        </SearchResultContainer>
      </SearchContainer>

      {selectedStock ? (
        <CompanyChart style={{ marginTop: 20 }} />
      ) : (
        <div style={{ flex: 1 }}></div>
      )}

      <RecentCompaniesTitleContainer>
        <Subtitle icon={StatsIcon} text="Empresas recentes" />
        <RecentCompaniesNavigationContainer>
          <button
            style={{
              opacity: recentComapaniesNavigation.isAtStart ? 0.2 : 1,
              cursor: recentComapaniesNavigation.isAtStart
                ? "default"
                : "pointer",
            }}
            onClick={() => {
              if (recentComapaniesNavigation.isAtStart) {
                return;
              }
              recentCompaniesRef.current.scrollTo(
                recentCompaniesRef.current.scrollLeft - 100,
                0
              );
            }}
          >
            <ChevronLeft />
          </button>
          <button
            style={{
              opacity: recentComapaniesNavigation.isAtEnd ? 0.2 : 1,
              cursor: recentComapaniesNavigation.isAtEnd
                ? "default"
                : "pointer",
            }}
            onClick={() => {
              if (recentComapaniesNavigation.isAtEnd) {
                return;
              }

              const currentScrollLeft = recentCompaniesRef.current.scrollLeft;
              recentCompaniesRef.current.scrollTo(
                recentCompaniesRef.current.scrollLeft + 100,
                0
              );

              if (currentScrollLeft === recentCompaniesRef.current.scrollLeft) {
                setRecentComapaniesNavigation({
                  ...recentComapaniesNavigation,
                  isAtEnd: true,
                });
              }
            }}
          >
            <ChevronRight />
          </button>
        </RecentCompaniesNavigationContainer>
      </RecentCompaniesTitleContainer>
      <RecentCompaniesList
        ref={recentCompaniesRef}
        onScroll={(event) => {
          const DOMElement = event.target as HTMLElement;

          setRecentComapaniesNavigation({
            isAtStart: DOMElement.scrollLeft === 0,
            isAtEnd:
              DOMElement.scrollWidth - DOMElement.scrollLeft ===
              DOMElement.clientWidth,
          });
        }}
      >
        {recentStocks.map((company) => (
          <li key={company.symbol}>
            <CompanyCard
              logoURL={company.logoURL}
              symbol={company.symbol}
              name={company.name}
              changePercent={company.changePercent}
              favorited={company.favorited}
              showFavoriteOption
            />
          </li>
        ))}
      </RecentCompaniesList>
      {selectedStock && <div style={{ flex: 1 }}></div>}
    </Container>
  );
};

export default Dashboard;
