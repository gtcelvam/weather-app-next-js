import axios from "axios";
import moment from "moment";
import { ONEWEATHER_KEY, ONEWEATHER_URL } from "../constants";

export const getGeoLocation = async () => {
  let data;
  const getData = () =>
    new Promise((res, rej) => {
      const successCallback = (position: object) => res(position);
      const failureCallback = (err: any) => {
        console.log("Error : ", err);
        res({});
      };
      if (global.navigator)
        global.navigator.geolocation.getCurrentPosition(
          successCallback,
          failureCallback
        );
      else res("Geo Location not supported by the browser");
    });
  data = await getData();
  return data;
};

export const fahrenheitToCelcuis = (farh: number) => {
  const value = ((farh - 32) * 5) / 9;
  return value.toFixed(2);
};

export const debounce = (cb: (...args: any) => any, delay: number = 1000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export const blobToBase64 = (blob: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const getFormatedTime = (value: string) => {
  console.log("Value : ", value);
  let time = new Date(value);
  let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return hour + ":" + minutes;
};

export const getFormatedDay = (value: string) =>
  moment(value).format("MMM Do YYYY");

export const timeStampToTime = (value: number) => {
  return moment.unix(value).format("hh:mm A");
};

type LatLongType = {
  lat: number;
  long: number;
};
export const getWindSpeedAndVisiblity = async ({ lat, long }: LatLongType) => {
  const url = `${ONEWEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${ONEWEATHER_KEY}&units=metric`;
  try {
    const { data }: any = await axios.get(url);
    return data || {};
  } catch (error) {
    console.log("Error : ", error);
    let result = {};
    return result;
  }
};
