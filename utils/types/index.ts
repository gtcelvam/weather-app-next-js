import { ChangeEvent } from "react";

export interface ButtonType {
  name: string;
  onClick?: () => void;
}

export interface SearchBarType {
  className?: string;
  placeHolder?: string;
  onChange: (value: string) => void;
  buttonClick?: () => void;
}
