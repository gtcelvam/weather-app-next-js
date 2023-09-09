import React, { ReactNode } from "react";
import S from "./style";

const MainComponent = ({ children }: { children: ReactNode }) => {
  return <div className={S.MainContainer}>{children}</div>;
};

export default MainComponent;
