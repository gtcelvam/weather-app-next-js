import { InitialForcastDetail } from "@/utils/types/forcast";
import { FC, ReactNode, createContext, useState } from "react";

export const WeatherContext = createContext<any>(null);

interface WeatherProviderPropsType {
  children: ReactNode;
}

const WeatherProvider: FC<WeatherProviderPropsType> = (props) => {
  //props
  const { children } = props;

  //state values
  const [active, setActive] = useState(0);
  const [currentWeather, setCurrentWeather] =
    useState<InitialForcastDetail | null>(null);

  //functions
  const handleToggle = (value: number) => setActive(value);

  const handleCurrentWeather = (data: InitialForcastDetail) =>
    setCurrentWeather(data);

  const providerValue = {
    active,
    currentWeather,
    handleCurrentWeather,
    handleToggle,
  };

  return (
    <WeatherContext.Provider value={providerValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
