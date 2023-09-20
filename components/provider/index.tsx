import {
  CurrentTempratureType,
  InitialForcastDetail,
} from "@/utils/types/forcast";
import { FC, ReactNode, createContext, useState } from "react";

export const WeatherContext = createContext<any>(null);

interface WeatherProviderPropsType {
  children: ReactNode;
}

interface WeatherDataProps {
  currentWeather: InitialForcastDetail | null;
  twelveHoursWeather: CurrentTempratureType[];
}

const WeatherProvider: FC<WeatherProviderPropsType> = (props) => {
  //props
  const { children } = props;

  //state values
  const [active, setActive] = useState(0);
  const [weather, setWeather] = useState<WeatherDataProps | null>({
    currentWeather: null,
    twelveHoursWeather: [],
  });

  //functions
  const handleToggle = (value: number) => setActive(value);

  const handleCurrentWeather = (data: InitialForcastDetail) =>
    setWeather({ currentWeather: data, ...weather } as WeatherDataProps);

  const handleTwelveHoursWeather = (data: CurrentTempratureType[]) =>
    setWeather({ twelveHoursWeather: data, ...weather } as WeatherDataProps);

  const providerValue = {
    active,
    currentWeather: weather?.currentWeather,
    twelveHoursWeather: weather?.twelveHoursWeather,
    handleCurrentWeather,
    handleTwelveHoursWeather,
    handleToggle,
  };
  return (
    <WeatherContext.Provider value={providerValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
