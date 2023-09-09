import React, { ReactNode } from "react";

const IconContainerStyle =
  "flex items-center justify-center rounded cursor-pointer w-[40px] h-[40px] hover:bg-[#004B56] transition-all duration-500";

const IconContainer = ({ Icon }: { Icon: ReactNode }) => {
  return <div className={IconContainerStyle}>{Icon}</div>;
};

export default IconContainer;
