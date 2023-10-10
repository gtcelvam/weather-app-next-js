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
  const { currentWeather, twelveHoursWeather, fiveDaysWeather } =
    useContext(WeatherContext);

  console.log("fiveDaysWeather : ", fiveDaysWeather);

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
            src={currentWeather?.icon ?? ""}
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
              <p className="text-[0.5rem] md:text-lg text-gray-200">
                {weather.date}
              </p>
              <Image
                src={weather.icon ?? ""}
                alt="weather-status"
                width={75}
                height={75}
              />
              <p className="text-[8px] md:text-xs">
                {weather.temprature?.value}°C
              </p>
            </div>
          ))}
        </div>
        {/* Today's Weather */}

        {/* AirConditioner Details */}
        <div className={S.AirConditionerContainer}></div>
        {/* AirConditioner Details */}
      </div>
      <div className={S.WeeklyWeatherContainer}>
        <h1 className={S.FiveDaysWeatherTitle}>5 days weather</h1>
        <div className={S.FiveDaysWeatherContainer}>
          {fiveDaysWeather.map((item: TwelveHourWeatherType) => {
            const date = item.date.split(" ");
            const weather = item.status.split(" ");
            const updatedDate = date[0] + " " + date[1];
            const updatedWeather = weather[0] + " " + weather[1];
            return (
              <>
                <div className={S.FiveDaysWeatherCard} key={Math.random()}>
                  <p className="text-[0.5rem] md:text-xs whitespace-nowrap">
                    {updatedDate}
                  </p>
                  <Image width={40} height={40} src={item.icon} alt="icon" />
                  <p className="text-[0.5rem] md:text-xs whitespace-nowrap text-gray-400">
                    {updatedWeather}
                  </p>
                  <p className="text-[0.5rem] md:text-xs text-blue-400">
                    {item.temprature.value}°C
                  </p>
                </div>
                <hr className={S.HorizontalDivider} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
