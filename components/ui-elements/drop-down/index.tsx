import React from "react";

type DropDownListType = {
  key: string;
  name: string;
};

interface DropDownPropsType {
  className?: string;
  list: DropDownListType[];
}

const DropDown = ({ list, className }: DropDownPropsType) => {
  return (
    // Dropdown menu
    <div
      id="dropdownDelay"
      className={`${className} w-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
    >
      <ul
        className="w-full py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDelayButton"
      >
        <DropDownList list={list} />
      </ul>
    </div>
  );
};

export default DropDown;

const DropDownList = ({ list }: { list: DropDownListType[] }) => {
  const sampleData = [
    {
      key: "1",
      name: "Thanjavur",
    },
  ];

  if (!Boolean(list.length)) return null;
  return (
    <>
      {list.map((item) => (
        <li
          key={item.key}
          className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white"
        >
          {item.name}
        </li>
      ))}
    </>
  );
};
