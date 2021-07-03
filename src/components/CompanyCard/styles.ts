import styled from "styled-components";
import colors from "../../styles/colors";

interface PercentageInfoProps {
  positiveVariation?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 250px;
  flex: 1;
  background: ${colors.white};
  padding: 16px 12px;
  border-radius: 8px;
  box-shadow: 0px 8px 20px -2px rgba(43, 37, 63, 0.1);
`;

export const GeneralInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;

    margin-right: 12px;
  }

  & p {
    font-size: 14px;
  }
`;

export const Symbol = styled.p`
  font-weight: 600;
`;

export const Name = styled.p`
  margin-top: 2px;
  white-space: nowrap;
`;

export const PercentageInfo = styled.div<PercentageInfoProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > p {
    font-weight: 500;
    margin: 0 5px;

    color: ${(props) =>
      props.positiveVariation ? colors.success : colors.danger};
  }
`;
