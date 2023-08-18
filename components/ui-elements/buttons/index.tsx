import { ButtonType } from "@/utils/types";
import React, { FC } from "react";

const CustomButton: FC<ButtonType> = (props) => {
  //constants
  const { name, onClick } = props;

  return <button onClick={onClick}>{name || "Custom Button"}</button>;
};

export default CustomButton;
