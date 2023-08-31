import React from "react";

export const CheckBoxCDF = ({ option, formItem }) => {
  return (
    <>
      {option.map((item, key) => (
        <div key={key} className="mt-3 ml-4">
          <div className="flex items-center mb-4">
            <input
              disabled
              type="checkbox"
              name={item.name}
              checked={formItem.includes(item.name)}
              defaultValue={item.name}
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ring-offset-gray-800 focus:ring-2"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-xs">
              {item.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};
