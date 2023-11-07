namespace S {
  export const WeatherContainer =
    "w-full h-full flex flex-col items-center justify-between gap-2 md:flex-row";

  export const DailyWeatherContainer =
    "w-full flex flex-col items-start justify-between h-full py-2 gap-2 md:w-[80%] md:px-6";

  export const CurrentWeatherContainer =
    "w-full  flex items-center justify-between flex-[2] md:px-6 md:py-2 md:h-[50%]";

  export const TodaysWeatherContainer =
    "w-full  flex items-center justify-start gap-2 overflow-x-auto bg-elementBg rounded-lg px-2 py-2 md:h-[25%] md:py-auto md:justify-center";

  export const TodaysWeatherDetail =
    "w-[80px] flex flex-col items-center justify-center gap-2";

  export const AirConditionerContainer =
    "w-full  bg-elementBg rounded-lg p-4 text-gray-400 md:h-[25%]";

  export const WeeklyWeatherContainer =
    "w-full h-full bg-elementBg rounded-lg p-4 flex flex-col items-start gap-5  md:w-[20%]";

  export const WeatherReportContainer =
    "flex flex-col h-full justify-evenly items-start";

  export const LocationText = "md:text-[30px] font-bold";

  export const WeatherStatus = "text-sm text-gray-400";

  export const WeatherDegree = "md:text-[60px] font-bold";

  export const FiveDaysWeatherTitle = "text-gray-500";

  export const FiveDaysWeatherContainer =
    "w-full h-full flex flex-col items-start justify-around gap-5";

  export const FiveDaysWeatherCard =
    "w-full flex items-center justify-between gap-2";

  export const HorizontalDivider =
    "w-full h-[0.1rem] border border-solid border-gray-200 opacity-10";

  export const AirConditionDetailsContainer =
    "w-full h-full md:grid md:grid-cols-2";

  export const AirConditionDetail =
    "flex items-center justify-start md:justify-center gap-1";
}

export default S;
