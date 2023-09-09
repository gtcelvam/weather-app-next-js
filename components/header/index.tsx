"use client";

import React, { FC, useEffect, useState } from "react";
import { debounce, getGeoLocation } from "@/utils/helpers";
import {
  ForecastPositionType,
  InitialForcastDetail,
} from "@/utils/types/forcast";
import { useRouter } from "next/router";
import S from "./style";
import SearchBar from "../ui-elements/search";
import { LocationPin } from "@/assests/icons";
import ForcastDetails from "@/utils/helpers/forcast";
import DropDown from "../ui-elements/drop-down";

const Header = () => {
  //state values
  const [userLocation, setUserLocation] = useState<InitialForcastDetail | null>(
    null
  );
  const [searchResult, setSearchResult] = useState([]);

  //constants
  const router = useRouter();
  const searchDropDownStyle = Boolean(searchResult.length)
    ? S.SearchDropDownContainer
    : "hidden";

  useEffect(() => {
    const getData = async () => {
      const data = await getInitialData();
      setUserLocation(data as InitialForcastDetail);
    };
    if (!userLocation) getData();
  }, []);

  //functions
  const handlePath = (route: string) => {
    router.push(route);
  };

  const handleInputChange = debounce(async (value: string) => {
    if (Boolean(value)) {
      const data = await ForcastDetails.getLocationByQuery(value);
      setSearchResult(data);
    }
  });

  return (
    <div className={S.HeaderContainer}>
      {/* Left Section */}
      <div></div>
      {/* Left Section Ends Here */}

      <div className={S.HeaderSearchBarContainer}>
        <SearchBar placeHolder="Search Location" onChange={handleInputChange} />
        <DropDown list={searchResult} className={searchDropDownStyle} />
      </div>

      {/* Right Section */}
      <div className={S.HeaderLocationContainer}>
        <div className={S.LocationDetailsContainer}>
          <LocationPin />
          <p>
            {userLocation?.name},{userLocation?.parentCityName}
          </p>
        </div>
        <div className={S.ForcastDetailsContainer}>
          <p className="text-xs">{userLocation?.temprature.value} °C</p>
          <p className="text-xs">{userLocation?.status}</p>
        </div>
      </div>
      {/* Right Section Ends Here */}
    </div>
  );
};

export default Header;

const getInitialData: () => Promise<
  InitialForcastDetail | null | undefined
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
