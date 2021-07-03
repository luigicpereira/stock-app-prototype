import React from "react";

import { Container } from "./styles";

interface SubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.FC;
  text: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ icon: Icon, text, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon />
      <p>{text}</p>
    </Container>
  );
};

export default Subtitle;
