import React, { ReactNode } from "react";

const CustomPopover = ({
  isVisible,
  children,
  title,
}: {
  isVisible: boolean;
  children: ReactNode;
  title: string;
}) => {
  return (
    <div
      data-popover
      id="popover-default"
      role="tooltip"
      className={`absolute top-[50px] right-0 z-10 w-64 ${
        isVisible ? "opacity-100 inline-block" : "opacity-0 hidden"
      } text-sm text-gray-500 transition-opacity duration-300 bg-elementBg border border-blue-500 rounded-lg shadow-sm dark:text-gray-400 dark:border-blue-600 dark:bg-elementBg sm:hidden`}
    >
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="px-3 py-2">{children}</div>
      <div data-popper-arrow></div>
    </div>
  );
};

export default CustomPopover;
