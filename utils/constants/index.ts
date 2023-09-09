export const USER_URL = "https://jsonplaceholder.typicode.com/users";

export const ACCUWEATHER_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
export const ACCUWEATHER_URL = "http://dataservice.accuweather.com";
export const ACCUWEATHER_ICON_URL = (key: number) =>
  `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
    key < 10 ? "0" + key : key
  }-s.png`;
