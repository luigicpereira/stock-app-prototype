import styled from "styled-components";
import colors from "../../styles/colors";

interface ChangeInfoProps {
  positiveVariation: boolean;
}

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  padding: 25px 20px;
  width: 100%;

  .recharts-wrapper {
    width: 400px;
  }
`;

export const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 10px;
`;

export const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 1;
  margin-left: 5px;
`;

export const QuoteInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > div {
    display: flex;
    flex-direction: row;
  }

  & p {
    font-size: 14px;
  }
`;

export const QuoteValue = styled.p`
  font-weight: 600;
`;

export const ChangeInfo = styled.p<ChangeInfoProps>`
  font-weight: 500;

  color: ${(props) =>
    props.positiveVariation ? colors.success : colors.danger};
`;
