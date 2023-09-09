import React, { ReactNode, useContext } from "react";
import S from "./style";
import { CloudIcon, MapIcon, MenuIcon, SettingsIcon } from "@/assests/icons";
import IconContainer from "@/components/ui-elements/icons";
import { WeatherContext } from "@/components/provider";

const IconArr = [
  { icon: <CloudIcon />, title: "Weather" },
  { icon: <MenuIcon />, title: "Menu" },
  { icon: <MapIcon />, title: "Location" },
  { icon: <SettingsIcon />, title: "Settings" },
];

const SideBar = () => {
  const { handleToggle } = useContext(WeatherContext);

  return (
    <div className={S.SideBarContainer}>
      {IconArr.map((item, index) => (
        <div
          key={item.title}
          className="flex flex-col items-center justify-center"
          onClick={() => handleToggle(index)}
        >
          <SideBarMenu key={item.title} Icon={item.icon} title={item.title} />
        </div>
      ))}
    </div>
  );
};

export default SideBar;

const SideBarMenu = ({ Icon, title }: { Icon: ReactNode; title: string }) => {
  return (
    <div className="w-[50px] h-[50px] flex flex-col items-center justify-center rounded cursor-pointer hover:bg-[#004B56] transition-all duration-500">
      <IconContainer Icon={Icon} />
      <p className="text-[10px]">{title}</p>
    </div>
  );
};
