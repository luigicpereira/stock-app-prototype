import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import Loader from "react-loader-spinner";
import { format, subHours, subMinutes } from "date-fns";

import colors from "../../styles/colors";

import iexAPI, { HistoricalPrices } from "../../services/iexcloudAPI";

import {
  ChangeInfo,
  CompanyInfoContainer,
  CompanyNameContainer,
  Container,
  QuoteInfo,
  QuoteValue,
} from "./styles";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSelectedStock,
  toggleFavoriteStock,
  ChartData,
} from "../../store/Stock.store";

import { ReactComponent as GraphUpIcon } from "../../assets/graph-up.svg";
import { ReactComponent as GraphDownIcon } from "../../assets/graph-down.svg";
import { ReactComponent as FilledStarIcon } from "../../assets/star.svg";
import { ReactComponent as EmptyStarIcon } from "../../assets/star2.svg";

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  payload,
}) => {
  if (!payload.length) {
    return null;
  }

  return (
    <div
      style={{
        background: colors.primary,
        color: colors.white,
        padding: "5px 20px",
        borderRadius: 4,
      }}
    >
      <p>{`$${payload[0].value}`}</p>
    </div>
  );
};

const CompanyChart: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const selectedStock = useAppSelector(selectSelectedStock);

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartIsLoading, setChartIsLoading] = useState(false);

  useEffect(() => {
    setChartIsLoading(true);

    let data: ChartData[];
    async function getDataFromAPI() {
      // Se o horário estiver antes de 09:31, considera o gráfico do dia anterior
      const refDate = subMinutes(subHours(new Date(), 9), 31);
      const refDateFormatted = format(refDate, "yyyyMMdd");

      const response = await iexAPI.get(
        `/stable/stock/${selectedStock.symbol.toLowerCase()}/chart/date/${refDateFormatted}`,
        {
          params: {
            token: process.env.REACT_APP_IEX_PUBLIC_KEY,
          },
        }
      );

      let previousValue: number;
      data = response.data.map((data: HistoricalPrices) => {
        let value = data.close;
        if (!value) {
          value = previousValue;
        } else {
          previousValue = value;
        }

        return {
          label: data.minute,
          value,
        };
      }) as ChartData[];

      setChartData(data);
      setChartIsLoading(false);
    }

    getDataFromAPI();

    // Só executar quando for uma stock diferente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock.symbol]);

  return (
    <Container {...rest}>
      <CompanyInfoContainer>
        <button
          onClick={() => {
            dispatch(toggleFavoriteStock(selectedStock.symbol));
          }}
        >
          {selectedStock.favorited ? <FilledStarIcon /> : <EmptyStarIcon />}
        </button>
        <CompanyNameContainer>
          <strong>{selectedStock.symbol}</strong>
          <p>{selectedStock.name}</p>
        </CompanyNameContainer>
        <QuoteInfo>
          <div>
            {selectedStock.change < 0 ? <GraphDownIcon /> : <GraphUpIcon />}
            <QuoteValue>{`$${selectedStock.price}`}</QuoteValue>
          </div>
          <div>
            <ChangeInfo
              positiveVariation={selectedStock.change >= 0}
            >{`$${selectedStock.change.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} (${selectedStock.changePercent.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}%)`}</ChangeInfo>
          </div>
        </QuoteInfo>
      </CompanyInfoContainer>

      {chartIsLoading ? (
        <div
          style={{
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader
            type="Audio"
            color={colors.primary}
            secondaryColor={colors.secondary}
          />
        </div>
      ) : (
        <ResponsiveContainer height={250}>
          <LineChart data={chartData}>
            <CartesianGrid stroke={colors.gray001} />
            <XAxis
              dataKey="label"
              style={{ fontSize: 11, color: colors.gray002 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["dataMin", "auto"]}
              style={{ fontSize: 11, color: colors.gray002 }}
            />
            <Tooltip
              allowEscapeViewBox={{
                x: true,
                y: true,
              }}
              wrapperStyle={{}}
              content={<CustomTooltip />}
            />
            <Line
              dot={{
                fill: colors.primary,
                r: 0,
              }}
              activeDot={{ r: 5 }}
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default CompanyChart;
