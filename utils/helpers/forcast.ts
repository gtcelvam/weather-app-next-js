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
} from "../types/forcast";
import axios from "axios";
import { blobToBase64, fahrenheitToCelcuis } from ".";

class Forecast {
  private apiKey: string | undefined;
  private geoPositionURL: string;
  private oneDayForecastBykey: string;
  private currentWeatherURL: string;
  private apiQuery: string;
  private locationByQueryURL: string;

  constructor() {
    this.apiKey = ACCUWEATHER_KEY;
    this.geoPositionURL =
      ACCUWEATHER_URL + "/locations/v1/cities/geoposition/search";
    this.oneDayForecastBykey = ACCUWEATHER_URL + "/forecasts/v1/daily/1day";
    this.currentWeatherURL = ACCUWEATHER_URL + "/forecasts/v1/hourly/1hour";
    this.locationByQueryURL =
      ACCUWEATHER_URL + "/locations/v1/cities/autocomplete";
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
      const {
        EnglishName,
        Key,
        LocalizedName,
        ParentCity: { EnglishName: ParentName },
      } = data;
      let weatherData = await this.getCurrentWeatherByKey(Key);
      return {
        ...weatherData,
        name: EnglishName,
        local: LocalizedName,
        parentCityName: ParentName,
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
