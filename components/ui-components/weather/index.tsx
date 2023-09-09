import { useContext } from "react";
import Image from "next/image";
import React from "react";
import Sunny from "../../../assests/images/icons/sunny.svg";
import S from "./style";
import { WeatherContext } from "@/components/provider";

const WeatherComponent = () => {
  //state Values
  const { currentWeather } = useContext(WeatherContext);

  return (
    <div className={S.WeatherContainer}>
      <div className={S.DailyWeatherContainer}>
        {/* Current Weather */}
        <div className={S.CurrentWeatherContainer}>
          <div className={S.WeatherReportContainer}>
            <div>
              <h1 className={S.LocationText}>
                {currentWeather?.name},{currentWeather?.parentCityName}
              </h1>
              <p className={S.WeatherStatus}>{currentWeather?.status}</p>
            </div>
            <div>
              <h1 className={S.WeatherDegree}>
                {currentWeather?.temprature.value} °C
              </h1>
            </div>
          </div>
          <Image
            src={currentWeather?.icon}
            alt="weather-status"
            width={150}
            height={150}
          />
        </div>
        {/* Current Weather */}

        {/* Today's Weather */}
        <div className={S.TodaysWeatherContainer}></div>
        {/* Today's Weather */}
      </div>
      <div className={S.WeeklyWeatherContainer}></div>
    </div>
  );
};

export default WeatherComponent;
