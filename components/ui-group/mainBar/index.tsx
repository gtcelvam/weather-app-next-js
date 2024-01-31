import React, { useContext } from "react";
import WeatherComponent from "@/components/ui-components/weather";
import CityComponet from "@/components/ui-components/cities";
import LocationComponent from "@/components/ui-components/location";
import SettingsComponent from "@/components/ui-components/settings";
import { WeatherContext } from "@/components/provider";
import S from "./style";
import Loader from "@/components/ui-elements/loader";

const componentsArr = [
  <WeatherComponent key={0} />,
  <CityComponet key={1} />,
  <LocationComponent key={2} />,
  <SettingsComponent key={3} />,
];

const MainComponent = () => {
  const loader = <div>Loading...</div>;

  //state values
  const { active, isWeatherLoading } = useContext(WeatherContext);
  const component = isWeatherLoading ? loader : componentsArr[active];
  return <div className={S.MainContainer}>{component}</div>;
};

export default MainComponent;
