import React, { useContext } from "react";
import WeatherComponent from "@/components/ui-components/weather";
import CityComponet from "@/components/ui-components/cities";
import LocationComponent from "@/components/ui-components/location";
import SettingsComponent from "@/components/ui-components/settings";
import { WeatherContext } from "@/components/provider";
import S from "./style";

const componentsArr = [
  <WeatherComponent key={0} />,
  <CityComponet key={1} />,
  <LocationComponent key={2} />,
  <SettingsComponent key={3} />,
];

const MainComponent = () => {
  //state values
  const { active } = useContext(WeatherContext);

  return <div className={S.MainContainer}>{componentsArr[active]}</div>;
};

export default MainComponent;
