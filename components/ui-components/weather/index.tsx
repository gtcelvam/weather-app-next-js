import { useContext } from "react";
import Image from "next/image";
import React from "react";
import Sunny from "../../../assests/images/icons/sunny.svg";
import S from "./style";
import { WeatherContext } from "@/components/provider";
import {
  CurrentTempratureType,
  TwelveHourWeatherType,
} from "@/utils/types/forcast";
import { SampleTwelveHoursData } from "@/utils/constants";

const WeatherComponent = () => {
  //state Values
  const { currentWeather, twelveHoursWeather } = useContext(WeatherContext);

  console.log("Current Weather : ", currentWeather);

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
                {currentWeather?.temprature?.value} °C
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
        <div className={S.TodaysWeatherContainer}>
          {twelveHoursWeather.map((weather: TwelveHourWeatherType) => (
            <div
              key={weather.date || Math.random()}
              className={S.TodaysWeatherDetail}
            >
              <p className="text-lg text-gray-200">{weather.date}</p>
              <Image
                src={weather.icon}
                alt="weather-status"
                width={75}
                height={75}
              />
              <p className="text-xs">{weather.temprature?.value}°C</p>
            </div>
          ))}
        </div>
        {/* Today's Weather */}

        {/* AirConditioner Details */}
        <div className={S.AirConditionerContainer}></div>
        {/* AirConditioner Details */}
      </div>
      <div className={S.WeeklyWeatherContainer}></div>
    </div>
  );
};

export default WeatherComponent;
