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

  const handleWeather = (data: InitialForcastDetail) => {
    let updatedData = { ...weather, ...data };
    console.log("Updated Data : ", updatedData);
    setWeather(updatedData as WeatherDataProps);
  };

  const providerValue = {
    active,
    currentWeather: weather?.currentWeather,
    twelveHoursWeather: weather?.twelveHoursWeather,
    handleWeather,
    handleToggle,
  };
  return (
    <WeatherContext.Provider value={providerValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
