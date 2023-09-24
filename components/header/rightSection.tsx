"use-client";

import React, { FC } from "react";
import CustomPopover from "../ui-elements/popover";
import { LocationPin } from "@/assests/icons";
import S from "./style";
import { InitialForcastDetail } from "@/utils/types/forcast";

interface HeaderRightProps {
  userLocation: InitialForcastDetail | null;
  handleClick: () => void;
  isVisible: boolean;
}

const HeaderRightSection: FC<HeaderRightProps> = (props) => {
  //props
  const { userLocation, handleClick, isVisible } = props;

  return (
    <div className={S.HeaderLocationContainer}>
      <div className={S.LocationDetailsContainer}>
        <div className={S.LocationIcon} onClick={handleClick}>
          <LocationPin />
        </div>
        <p className="hidden sm:block">
          {userLocation?.name},{userLocation?.parentCityName}
        </p>
      </div>
      <CustomPopover
        isVisible={isVisible}
        title={`${userLocation?.name},${userLocation?.parentCityName}`}
      >
        <ForecastDetails userLocation={userLocation} />
      </CustomPopover>
      <div className={S.ForcastDetailsContainer + " hidden sm:flex"}>
        <p className="text-xs">{userLocation?.temprature.value} °C</p>
        <p className="text-xs">{userLocation?.status}</p>
      </div>
    </div>
  );
};

export default HeaderRightSection;

type ForcastDetailsType = {
  userLocation: InitialForcastDetail | null;
};
const ForecastDetails = (props: ForcastDetailsType) => {
  //props
  const { userLocation } = props;

  return (
    <div className={S.ForcastDetailsContainer}>
      <p className="text-xs text-white text-center">
        {userLocation?.temprature.value} °C
      </p>
      <p className="text-xs text-white text-center">{userLocation?.status}</p>
    </div>
  );
};
