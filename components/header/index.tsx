import React, { useEffect, useState, useContext } from "react";
import { debounce, getGeoLocation } from "@/utils/helpers";
import {
  ForecastPositionType,
  GetLocationReturnType,
  InitialForcastDetail,
} from "@/utils/types/forcast";
import { useRouter } from "next/router";
import S from "./style";
import SearchBar from "../ui-elements/search";
import { HamBurgerIcon } from "@/assests/icons";
import ForcastDetails from "@/utils/helpers/forcast";
import DropDown from "../ui-elements/drop-down";
import { WeatherContext } from "../provider";
import HeaderRightSection from "./rightSection";

const Header = () => {
  //state values
  const { handleWeather, setIsWeatherLoading } = useContext(WeatherContext);
  const [userLocation, setUserLocation] = useState<InitialForcastDetail | null>(
    null
  );
  const [searchResult, setSearchResult] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //constants
  const searchDropDownStyle = Boolean(searchResult.length)
    ? S.SearchDropDownContainer
    : "hidden";

  const handleDropDownClick = async (id: number | string, name?: string) => {
    setIsWeatherLoading(true);
    let report = {
      name,
      ...(await ForcastDetails.getCurrentWeatherByKey(id)),
    };
    let twelveHourseData = await ForcastDetails.getTwelveHourData(id);
    let fiveDaysWeatherData = await ForcastDetails.getFiveDaysWeatherDataByKey(
      id
    );
    handleWeather({
      currentWeather: report,
      twelveHoursWeather: twelveHourseData,
      fiveDaysWeather: fiveDaysWeatherData,
    });
    setSearchResult([]);
    setIsWeatherLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setIsWeatherLoading(true);
      const data = (await getInitialData()) as GetLocationReturnType;
      setUserLocation(data.currentWeather);
      handleWeather(data);
      setIsWeatherLoading(false);
    };
    if (!userLocation) getData();
    // eslint-disable-next-line
  }, []);

  //functions
  const handleInputChange = debounce(async (value: string) => {
    if (Boolean(value)) {
      const data = await ForcastDetails.getLocationByQuery(value);
      setSearchResult(data);
    }
  });

  const handleIsPopupOpen = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className={S.HeaderContainer}>
      {/* Left Section */}
      <div className={S.MobileMenuContainer}>
        <HamBurgerIcon />
      </div>
      {/* Left Section Ends Here */}
      <div className={S.HeaderSearchBarContainer}>
        <SearchBar placeHolder="Search Location" onChange={handleInputChange} />
        <DropDown
          list={searchResult}
          className={searchDropDownStyle}
          handleChange={handleDropDownClick}
        />
      </div>
      {/* Right Section */}
      <HeaderRightSection
        userLocation={userLocation}
        isVisible={isPopupOpen}
        handleClick={handleIsPopupOpen}
      />
      {/* Right Section Ends Here */}
    </div>
  );
};

export default Header;

const getInitialData: () => Promise<
  GetLocationReturnType | null | undefined
> = async () => {
  try {
    let result: any = await getGeoLocation();
    const { latitude, longitude } =
      result.coords as unknown as ForecastPositionType;
    const data = await ForcastDetails.getLocationByPosition({
      latitude,
      longitude,
    });
    return data || null;
  } catch (error) {
    console.log("Error from getInitialData : ", error);
  }
};
