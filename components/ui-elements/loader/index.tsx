import React from "react";
import LoaderIcon from "../../../assests/images/icons/loader.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        className="mix-blend-color-dodge"
        src={LoaderIcon}
        alt="loader-icon"
        width={150}
        height={150}
      />
    </div>
  );
};

export default Loader;
