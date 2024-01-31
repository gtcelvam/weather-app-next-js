import React from "react";
import LoaderIcon from "../../../assests/images/icons/loader.webp";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        className="mix-blend-color-dodge"
        src={LoaderIcon}
        alt="loader-icon"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Loader;
