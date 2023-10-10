import {
  ACCUWEATHER_ICON_URL,
  ACCUWEATHER_KEY,
  ACCUWEATHER_URL,
} from "../constants";
import {
  CurrentTempratureType,
  ForecastPositionType,
  InitialForcastDetail,
  OneDayTempratureValueType,
  TwelveHourWeatherType,
} from "../types/forcast";
import axios from "axios";
import {
  blobToBase64,
  fahrenheitToCelcuis,
  getFormatedDay,
  getFormatedTime,
} from ".";

class Forecast {
  private apiKey: string | undefined;
  private geoPositionURL: string;
  private oneDayForecastBykey: string;
  private currentWeatherURL: string;
  private apiQuery: string;
  private locationByQueryURL: string;
  private twelveHourQueryURL: string;
  private fiveDaysQueryURL: string;

  constructor() {
    this.apiKey = ACCUWEATHER_KEY;
    this.geoPositionURL =
      ACCUWEATHER_URL + "/locations/v1/cities/geoposition/search";
    this.oneDayForecastBykey = ACCUWEATHER_URL + "/forecasts/v1/daily/1day";
    this.currentWeatherURL = ACCUWEATHER_URL + "/forecasts/v1/hourly/1hour";
    this.locationByQueryURL =
      ACCUWEATHER_URL + "/locations/v1/cities/autocomplete";
    this.twelveHourQueryURL = ACCUWEATHER_URL + "/forecasts/v1/hourly/12hour";
    this.fiveDaysQueryURL = ACCUWEATHER_URL + "/forecasts/v1/daily/5day/";
    this.apiQuery = `?apikey=${this.apiKey}`;
  }

  async getLocationByPosition(
    position: ForecastPositionType
  ): Promise<InitialForcastDetail | undefined> {
    try {
      const { latitude, longitude } = position;
      const query = `${this.apiQuery}&q=${latitude + "," + longitude}`;
      const url = this.geoPositionURL + query;
      let data = (await axios(url)).data;
      const { EnglishName, Key, LocalizedName, ParentCity } = data;
      let weatherData = await this.getCurrentWeatherByKey(Key);
      return {
        ...weatherData,
        name: EnglishName,
        local: LocalizedName,
        parentCityName: ParentCity?.EnglishName || "",
      } as InitialForcastDetail;
    } catch (error) {
      console.log("Get Location By Position Error : ", error);
    }
  }

  async getOneDayWeatherByKey(
    key: number
  ): Promise<{ temprature: OneDayTempratureValueType } | undefined> {
    try {
      const query = `/${key}${this.apiQuery}`;
      const url = this.oneDayForecastBykey + query;
      let data = (await axios(url)).data;
      const { Temperature } = data.DailyForecasts[0];
      let updated = {
        temprature: {
          min: {
            value: fahrenheitToCelcuis(Temperature.Minimum.Value),
            unit: "C",
          },
          max: {
            value: fahrenheitToCelcuis(Temperature.Maximum.Value),
            unit: "C",
          },
        },
      };
      return updated;
    } catch (error) {
      console.log("Get Weather For One Day : ", error);
    }
  }

  async getCurrentWeatherByKey(
    key: number | string
  ): Promise<CurrentTempratureType | undefined> {
    try {
      const query = `/${key}/${this.apiQuery}`;
      const url = this.currentWeatherURL + query;
      let data = (await axios(url)).data[0];
      console.log("Current Value : ", data);
      const { IconPhrase, Temperature } = data;
      return {
        status: IconPhrase,
        temprature: {
          value: fahrenheitToCelcuis(Temperature.Value),
          unit: "C",
        },
        icon: ACCUWEATHER_ICON_URL(data.WeatherIcon),
      };
    } catch (error) {}
  }

  async getTwelveHourData(key: number | string): Promise<any> {
    const query = `/${key}/${this.apiQuery}`;
    const url = this.twelveHourQueryURL + query;
    let data = (await axios(url)).data;
    console.log("twelveHoursWeather : ", data);
    let updatedData: TwelveHourWeatherType[] = data.map((item: any) => {
      const { IconPhrase, Temperature, WeatherIcon, DateTime } = item;
      return {
        status: IconPhrase,
        temprature: {
          value: fahrenheitToCelcuis(Temperature.Value),
          unit: "C",
        },
        icon: ACCUWEATHER_ICON_URL(WeatherIcon),
        date: getFormatedTime(DateTime),
      };
    });
    return updatedData;
  }

  async getFiveDaysWeatherDataByKey(key: number | string): Promise<any> {
    const query = `${key}/${this.apiQuery}`;
    const url = this.fiveDaysQueryURL + query;
    let data = (await axios.get(url)).data.DailyForecasts;
    console.log("Date Time : ", data);
    let updatedData = data.map((item: any) => {
      const { Date, Day, Temperature } = item;
      return {
        date: getFormatedDay(Date),
        icon: ACCUWEATHER_ICON_URL(Day.Icon),
        temprature: {
          value: fahrenheitToCelcuis(
            (Temperature.Maximum.Value + Temperature.Minimum.Value) / 2
          ),
          unit: "C",
        },
        status: Day.IconPhrase,
      };
    });
    return updatedData;
  }

  async getLocationByQuery(keyword: string) {
    const query = `${this.apiQuery}&q=${keyword}`;
    const url = this.locationByQueryURL + query;
    let data = (await axios(url)).data;
    return data.map((item: any) => {
      return {
        key: item.Key,
        name: item.LocalizedName,
      };
    });
  }
}

const ForcastDetails = new Forecast();

export default ForcastDetails;
