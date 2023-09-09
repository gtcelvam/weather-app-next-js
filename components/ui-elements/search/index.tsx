import React, { ChangeEvent, FC, useState } from "react";
import { SearchBarType } from "@/utils/types";

const SearchBar: FC<SearchBarType> = (props) => {
  const [isSearchIconVisible, setIsSearchIconVisible] = useState<Boolean>(true);

  //constants
  const {
    className = "",
    onChange,
    placeHolder = "Search",
    buttonClick,
  } = props;
  const classes = {
    inputClasses: `block w-full p-4 pl-2 text-sm text-white-900 rounded-lg bg-[#202b3b] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`,
  };
  const searchIconStyle = isSearchIconVisible ? "" : "hidden";

  //functions
  const handleOnFocus = () => {
    setIsSearchIconVisible(false);
    console.log("Search Icon need to be hidden");
  };

  const handleOnBlur = () => {
    setIsSearchIconVisible(true);
    console.log("Search Icon need to be visible");
  };

  return (
    <form>
      <div className={`relative ${className}`} onFocus={handleOnFocus}>
        <input
          type="search"
          id="default-search"
          className={classes.inputClasses}
          placeholder={placeHolder}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onBlur={handleOnBlur}
        />
        {/* Search Image */}
        <div
          className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none"
          onClick={buttonClick}
        >
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 ${searchIconStyle}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        {/* Search Image Ends Here */}
      </div>
    </form>
  );
};

export default SearchBar;
